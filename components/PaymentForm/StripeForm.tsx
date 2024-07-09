"use client";
import { FormEvent, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

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

const PaymentComponent = () => {
  const [selected, setSelection] = useState(20);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const [token, setToken] = useState("");
  useEffect(() => {
    
  }, []);

  useEffect(() => {
    if (selected === 0) return;
    if (paymentStatus !== 'succeeded') return;
  }, [selected, paymentStatus]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (selected === 0) return;
    if (!stripe || !elements) return;

    const cardEl = elements.getElement(CardNumberElement);
    console.log(cardEl);

    setIsProcessing(true);

    try {
      const res = await fetch('/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: "nadeem.h9696@gmail.com",
          price: selected,
        })
      });

      console.log(res);
      

      const { client_secret } = await res.json();

      const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardEl as any,
        },
      });

      console.log(paymentIntent);
      
      if (!paymentIntent) {
        setPaymentStatus('Payment failed!');
      } else {          
        setPaymentStatus(paymentIntent.status);
        subscriber();
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus('Payment failed mis!');
    }

    setIsProcessing(false);
  };

  const subscriber = async () => {

    // const startedon = new Date();
    // const endson = new Date(startedon);
    // endson.setDate(endson.getDate() + 30);
    // console.log(token);
    
    // const emailResponse = await fetch("/user/email", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + token,
    //   },
    //   body: JSON.stringify({}),
    // });
  
    // if (!emailResponse.ok) {
    //   throw new Error("Failed to fetch email");
    // }
  
    // const emailData = await emailResponse.json();
  
    // // Then, if emailData exists, proceed to make the second POST request to "/user/subscription"
    // if (emailData) {
    //   const subscriptionResponse = await fetch("/user/subscription", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: emailData,
    //       startedon: startedon,
    //       endson: endson,
    //       active: true,
    //     }),
    //   });
  
    //   if (!subscriptionResponse.ok) {
    //     throw new Error("Failed to create subscription");
    //   }
  
    //   const subscriptionData = await subscriptionResponse.json();
  
    //   console.log(subscriptionData);
    // }

  };

  return (
    <form className="mx-auto my-auto w-1/2 py-20 ">
      <h1 className="text-center text-3xl font-bold tracking-wider">
        Payment Form
      </h1>
      <p className="mb-3 mt-3 text-center text-sm text-gray-400">
        Enter your Card Details
      </p>
      <div className="mb-4">
        <label
          className="mb-3 block text-lg font-bold tracking-wide text-black"
          htmlFor="cardNumber"
        >
          Card Number
        </label>
        <CardNumberElement
          id="cardNumber"
          options={CARD_ELEMENT_OPTIONS}
          className="focus:shadow-outline mb-10 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label
          className="mb-3 block text-lg font-bold tracking-wide text-black"
          htmlFor="cardExpiry"
        >
          Expiration Date
        </label>
        <CardExpiryElement
          id="cardExpiry"
          options={CARD_ELEMENT_OPTIONS}
          className="focus:shadow-outline mb-10 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <label
          className="mb-3 block text-lg font-bold tracking-wide text-black"
          htmlFor="cardCvc"
        >
          CVC
        </label>
        <CardCvcElement
          id="cardCvc"
          options={CARD_ELEMENT_OPTIONS}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
      </div>

      {/* <div className="flex items-center justify-between"> */}
      {!isProcessing && (<button
        className="focus:shadow-outline mx-auto flex justify-center rounded-3xl bg-rgb-yellow px-14 py-3 font-bold text-rgb-green hover:bg-green-700 hover:text-white focus:outline-none"
        type="submit"
        disabled={isProcessing}  
        onClick={()=>handleSubmit}
      >
        {isProcessing ? "Processing..." : "Pay"}
      </button>)}
      {/* </div> */}
      {isProcessing && <div>Processing...</div>}
      {!isProcessing && paymentStatus && <div>Status: {paymentStatus}</div>}
    </form>
  );
};

const PaymentGateway = () => {
  const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY!);

  return (
    <Elements stripe={stripePromise}>
      <PaymentComponent />
    </Elements>
  );
};

export default PaymentGateway;
