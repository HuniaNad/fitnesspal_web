'use client'

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Title from '@/components/Title/title';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import './manage-cards.css';
import { Modal, Pagination } from 'antd';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import Input from '@/components/Input/input';
import { match } from 'assert';
import Stripe from 'stripe';
import StripeForm from '@/components/PaymentForm/StripeForm';
import Link from 'next/link';
import { colors } from '@/public/colors/colors';
import Heading from '@/components/Auth/Heading/authHeading';
import ErrorPrompt from '@/components/ErrorAlert/error';
import { validateCardCvc, validateCardExpiry, validateCardName, validateCardNumber } from '@/utils/Validations/creditCardHandler';
import { getCardDate, convertDateToString } from '@/utils/todayDate';
import { loadStripe, StripeCardElementOptions, StripeCardNumberElement } from '@stripe/stripe-js';
import {
    Elements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
    CardElement,
} from "@stripe/react-stripe-js";


// const fakeCreditCards = [
//     { number: '4901222233334444', expiry: '12/34', cvc: '123', name: 'Alice', focused: '' },
//     { number: '4901222233334445', expiry: '01/25', cvc: '234', name: 'Bob', focused: '' },
//     { number: '4901222233334446', expiry: '02/26', cvc: '345', name: 'Charlie', focused: '' },
//     { number: '4901222233334447', expiry: '03/27', cvc: '456', name: 'David', focused: '' },
//     { number: '4901222233334448', expiry: '04/28', cvc: '567', name: 'Eva', focused: '' },
//     { number: '5401222233334444', expiry: '05/29', cvc: '678', name: 'Frank', focused: '' },
//     { number: '5401222233334445', expiry: '06/30', cvc: '789', name: 'Grace', focused: '' },
//     { number: '5401222233334446', expiry: '07/31', cvc: '890', name: 'Henry', focused: '' },
//     { number: '5401222233334447', expiry: '08/32', cvc: '901', name: 'Ivy', focused: '' },
//     { number: '5401222233334448', expiry: '09/33', cvc: '012', name: 'Jack', focused: '' }
// ];

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

const ManageCards = () => {
    const pathname = usePathname().split('/');
    const [creditCards, setCreditCards] = useState<CreditCardProps[]>([]);
    const [currentCard, setCurrentCard] = useState<CreditCardProps>({ name: '', number: '', expiry: '' });
    const [cardNameError, setCardNameError] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [cardExpiryError, setCardExpiryError] = useState('');
    const [cardCvcError, setCardCvcError] = useState('');
    const [toggleAddCard, setToggleAddCard] = useState(false);
    const [cardAddedSuccess, setCardAddedSuccess] = useState(false);
    const [error, setError] = useState('');
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : null;
    const customClasses = "field-border block w-full border-0 py-1.5 px-4 sm:text-sm sm:leading-6";

    const cvcElementOptions = {
        ...CARD_ELEMENT_OPTIONS,
        placeholder: "CVC",
    };
    const expiryElementOptions = {
        ...CARD_ELEMENT_OPTIONS,
        placeholder: "MM/YY",
    };
    const numberElementOptions = {
        ...CARD_ELEMENT_OPTIONS,
        placeholder: "Card Number",
    };

    useEffect(() => {
        // Fetch credit cards from the database
        const fetchCreditCards = async () => {
            try {
                const response = await fetch(`http://localhost:8080/subscription/get-details/${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response);
                if (!response.ok) {
                    const errorMessage = await response.json();
                    setError(errorMessage.message);
                    return;
                }

                const cards = (await response.json()).card;
                console.log(cards)
                if (Array.isArray(cards) && cards.length > 0) {
                    const formattedCards = cards.map((card) => ({
                        number: card.cardNumber || '',
                        expiry: convertDateToString(card.expirationDate) || '',
                        name: card.name || '',
                        cvc: card.cvv || '',
                        focused: ''
                    }));

                    setCreditCards([...formattedCards]);
                } else {
                    console.error('No cards found or invalid data received.')
                    setError("No cards found or invalid data received.");
                }
            } catch (error) {
                console.error('Error fetching credit cards:', error);
                setError('An error occurred while fetching credit cards. Please try again later.');
            }
        };

        fetchCreditCards();
    }, [user.id, cardAddedSuccess])

    // State variables
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2; // Change this as needed

    // Calculate start and end index of items for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = creditCards.slice(startIndex, endIndex);

    // Handle page change
    const onPageChange = (page: any) => {
        setCurrentPage(page);
    };

    const handleInputChange = (evt: any) => {
        const { name, value } = evt.target;

        setCurrentCard((prev: any) => ({ ...prev, [name]: value }));
        console.log(name, value)

        if (name === 'name') {
            setCardNameError(validateCardName(value));
        }

        if (name === 'number') {
            setCardNumberError(validateCardNumber(value));
        }

        if (name === 'expiry') {
            setCardExpiryError(validateCardExpiry(value));
        }

        if (name === 'cvc') {
            setCardCvcError(validateCardCvc(value));
        }
    }

    const handleInputFocus = (evt: any) => {
        setCurrentCard((prev: any) => ({ ...prev, focus: evt.target.name }));
    }

    const handleCurrentCardState = (card: any) => {
        setCurrentCard(card);
    }

    const handleAddCardModalState = (state: boolean) => {
        setToggleAddCard(state);
    }

    const handleCardAddedSuccess = (state: boolean) => {
        setCardAddedSuccess(state);
    }

    const [token, setToken] = useState("");
    useEffect(() => {
        const data = localStorage.getItem('userData');
        const storedToken = data ? JSON.parse(data).userId : '';
        setToken(storedToken);
    }, []);

    const [selected, setSelection] = useState(20);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (selected === 0) return;
        if (paymentStatus !== 'succeeded') return;
    }, [selected, paymentStatus]);

    const handleSubscription = async () => {
        try {
            console.log("here", selected)
            if (selected === 0) return;
            if (!stripe || !elements) return;

            // const cardEl = elements.getElement(CardNumberElement);
            
            setIsProcessing(true);

            
            const res = await fetch(`http://localhost:8080/checkout/stripe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    price: selected
                }),
            });


            // const client_secret  = await res.json();
            // console.log(cardEl);
            // console.log(client_secret)
            // alert(client_secret);

            // alert();

            // const { paymentIntent } = await stripe.confirmCardPayment(client_secret.client_secret, {
            //     payment_method: {
            //         card: cardEl as any,
            //     },
            // });

            // console.log(paymentIntent);

            // if (!paymentIntent) {
            //     alert("stop")
            //     setPaymentStatus('Payment failed!');
            // } else {
            //     setPaymentStatus(paymentIntent.status);
            // }


            setIsProcessing(false);

            //REST OF THE PROCESSING
            const updateSubStatusResponse = await fetch(`http://localhost:8080/subscription/update-subscription-status/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 'true'
                }),
            });
            if (!updateSubStatusResponse.ok) {
                const errorMessage = await updateSubStatusResponse.json();
                setError(errorMessage.message);
                return;
            }

            localStorage.setItem('userData', JSON.stringify({ ...user, isPremium: true }));

            // const updateCardStatusResponse = await fetch(`http://localhost:8080/subscription/update-card-status/${user.id}/${currentCard._id}`, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         isActive: true
            //     }),
            // });
            // if (!updateCardStatusResponse.ok) {
            //     const errorMessage = await updateCardStatusResponse.json();
            //     setError(errorMessage.message);
            //     return;
            // }

        } catch (error) {
            console.error('Error adding card:', error);
            setError('An error occurred while adding card. Please try again later.');
        }
    }

    return (
        <>
            <Title name={pathname[pathname.length - 2]} />
            <div className="main-container flex">
                <div className="cards flex flex-col">
                    <div className="title">Manage Your Cards</div>

                    {currentItems.map((card, index) => (
                        <DataCard key={index} number={card.number} expiry={card.expiry} name={card.name} handleCurrentCardState={handleCurrentCardState} />
                    ))
                    }

                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={creditCards.length}
                        onChange={onPageChange}
                        simple
                    />
                </div>

                <div className="card-manipulate-container flex flex-col items-center align-center p-5">
                    <div className="add-button">
                        <button className="custom-btn gradient-button-green" onClick={() => setToggleAddCard(!toggleAddCard)}>Add New Card</button>
                    </div>

                    <div className="card-form-container">
                        <form className="card-form">
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <label htmlFor="name" className="block capitalize text-sm font-medium">
                                    Card Holder Name
                                </label>
                                <input
                                    id="name"
                                    type="string"
                                    name="name"
                                    placeholder="Card Holder Name"
                                    value={currentCard?.name ?? ''}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    className="focus:shadow-outline mb-1 w-96 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                />
                                {cardNameError && <span className="text-red-500 text-xs mt-1 error-msg">{cardNameError}</span>}
                            </div>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <label htmlFor="number" className="block capitalize text-sm font-medium">
                                    Card Number
                                </label>
                                <CardNumberElement
                                    id="cardNumber"
                                    options={numberElementOptions}
                                    className="focus:shadow-outline mb-1 w-96 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                />
                            </div>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <label htmlFor="expiry" className="block capitalize text-sm font-medium">
                                    Card Expiry Date
                                </label>
                                <CardExpiryElement
                                    id="cardExpiry"
                                    options={expiryElementOptions}
                                    className="focus:shadow-outline mb-1 w-96 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                />
                            </div>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <label htmlFor="cvc" className="block capitalize text-sm font-medium">
                                    Card CVC
                                </label>
                                <CardCvcElement
                                    id="cardCvc"
                                    options={cvcElementOptions}
                                    className="focus:shadow-outline mb-1 w-96 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                />

                            </div>

                            <div className="buy-subscription-btn mt-5">

                                <button className="custom-btn gradient-button-purple" onClick={() => handleSubscription()}>Buy Subscription</button>
                            </div>
                        </form>

                    </div>
                </div>

                {error && <ErrorPrompt message={error} />}
                {toggleAddCard &&
                    <AddCardModal
                        modalState={toggleAddCard}
                        setModalState={handleAddCardModalState}
                        setError={(errorMsg) => setError(errorMsg)}
                        userId={user.id}
                        cardAddedSuccess={handleCardAddedSuccess}
                    />}
            </div>

        </>
    )
}

type CreditCardProps = {
    number: string | number;
    expiry: string | number;
    cvc?: string | number;
    name: string;
    focused?: string;
    handleCurrentCardState?: (card: any) => void;
}

const DataCard = ({ number, expiry, name, handleCurrentCardState }: CreditCardProps) => {
    return (
        <div className='credit-card'>
            <Cards
                number={number}
                expiry={expiry}
                name={name}
                cvc=""
                focused=""
            />
            <div className="arrow">
                <ArrowCircleRightOutlinedIcon
                    onClick={() => (handleCurrentCardState !== undefined) ? handleCurrentCardState({ number, expiry, name }) : null}
                    style={{ fontSize: '35px', cursor: 'pointer' }}
                />
            </div>

        </div>

    )
}

const AddCardModal = ({ modalState, setModalState, setError, userId, cardAddedSuccess }:
    { modalState: boolean, setModalState: (state: boolean) => void, setError: (errorMsg: string) => void, userId: string, cardAddedSuccess: (state: boolean) => void }) => {
    const [state, setState] = useState({
        number: '1111222233334444',
        expiry: '12/34',
        cvc: '123',
        name: 'hunia',
        focus: '',
    });
    const [cardNameError, setCardNameError] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [cardExpiryError, setCardExpiryError] = useState('');
    const [cardCvcError, setCardCvcError] = useState('');
    const customClasses = "field-border block w-full border-0 py-1.5 px-4 sm:text-sm sm:leading-6";

    const handleInputChange = (evt: any) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }))
        console.log(name, value)

        if (name === 'name') {
            setCardNameError(validateCardName(value));
        }

        if (name === 'number') {
            setCardNumberError(validateCardNumber(value));
        }

        if (name === 'expiry') {
            setCardExpiryError(validateCardExpiry(value));
        }

        if (name === 'cvc') {
            setCardCvcError(validateCardCvc(value));
        }
    }

    const handleInputFocus = (evt: any) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    const handleAddCard = async () => {
        try {
            if (cardNameError || cardNumberError || cardExpiryError || cardCvcError) {
                setError('Please fill in all fields');
                return;
            }

            const responseUser = await fetch(`http://localhost:8080/subscription/add-card`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    name: state.name,
                    cardNumber: state.number,
                    cvv: state.cvc,
                    expirationDate: getCardDate(state.expiry),
                    isActive: false,
                }),
            });
            if (!responseUser.ok) {
                const errorMessage = await responseUser.json();
                setError(errorMessage.message);
                return;
            }

            cardAddedSuccess(true);
            setModalState(!modalState);
        } catch (error) {
            console.error('Error adding card:', error);
            setError('An error occurred while adding card. Please try again later.');
        }
    }

    return (
        <Modal
            centered
            open={modalState}
            onCancel={() => setModalState(!modalState)}
            onOk={() => setModalState(!modalState)}
            footer={null}
            width={'600px'}
            className='bmi-modal'
            title="Add Credit Card"
        >
            <div className="input-fields flex flex-col justify-center items-center">
                <div className="relative mt-1 rounded-md shadow-sm">
                    <label htmlFor="name" className="block capitalize text-sm font-medium">
                        Card Holder Name
                    </label>
                    <input
                        id="name"
                        type="string"
                        name="name"
                        placeholder="Card Holder Name"
                        value={state.name}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        className={customClasses}
                        style={{ width: "400px" }}
                    />
                    {cardNameError && <span className="text-red-500 text-xs mt-1 error-msg">{cardNameError}</span>}
                </div>
                <div className="relative mt-1 rounded-md shadow-sm">
                    <label htmlFor="number" className="block capitalize text-sm font-medium">
                        Card Number
                    </label>
                    <input
                        id="number"
                        type="number"
                        name="number"
                        placeholder="Card Number"
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        className={customClasses}
                        style={{ width: "400px" }}
                    />
                    {cardNumberError && <span className="text-red-500 text-xs mt-1 error-msg">{cardNumberError}</span>}
                </div>
                <div className="relative mt-1 rounded-md shadow-sm">
                    <label htmlFor="expiry" className="block capitalize text-sm font-medium">
                        Card Expiry Date
                    </label>
                    <input
                        id="expiry"
                        type="string"
                        name="expiry"
                        placeholder="Card Expiry Date"
                        value={state.expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        className={customClasses}
                        style={{ width: "400px" }}
                    />
                    {cardExpiryError && <span className="text-red-500 text-xs mt-1 error-msg">{cardExpiryError}</span>}
                </div>
                <div className="relative mt-1 rounded-md shadow-sm">
                    <label htmlFor="cvc" className="block capitalize text-sm font-medium">
                        Card CVC
                    </label>
                    <input
                        id="cvc"
                        type="number"
                        name="cvc"
                        placeholder="Card CVC"
                        value={state.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        className={customClasses}
                        style={{ width: "400px" }}
                    />
                    {cardCvcError && <span className="text-red-500 text-xs mt-1 error-msg">{cardCvcError}</span>}
                </div>
            </div>

            <div className='flex justify-center items-center w-100 mt-10'>
                <button onClick={() => handleAddCard()} className="custom-btn gradient-button-purple">Add Card</button>
            </div>


        </Modal>
    )
}


const PaymentGateway = () => {
    const stripePromise = loadStripe(
        "pk_test_51OyrgABAvfPSndrV3Ld46fvxdQuy2oaQm6Vxru1oZl0Dga7v8DFZAel0eQw90IH3LaKmipqAKVxKuPAJD74mcK9x00k52rj03q",
    );

    return (
        <Elements stripe={stripePromise}>
            <ManageCards />
        </Elements>
    );
};

export default PaymentGateway;

// export default ManageCards