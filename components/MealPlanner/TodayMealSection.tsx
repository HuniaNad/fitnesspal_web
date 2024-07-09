import {FaChevronDown} from "react-icons/fa";
import {GiMeatCleaver} from "react-icons/gi";
import {IoIosArrowDropright} from "react-icons/io";
import {useState} from "react";
import {Divider, Modal} from "antd";


const TodayMealSection = () => {
    const [modalTrue, setModalTrue] = useState(false)
    return (

        <div className={"flex flex-col items-center justify-center gap-6 w-full h-full"}>
            <Modal destroyOnClose={true} closable={true} onCancel={() => {
                setModalTrue(false)
            }} footer={
                null
            } rootClassName={"flex flex-col gap-4 "} open={modalTrue}>
                <div className={"flex flex-col items-center justify-center gap-3 w-full h-full p-5"}>
                <div className={"flex flex-col items-center justify-center gap-3 w-full h-full"}>
                    <div className={"backgroundColor flex justify-center items-center p-4 w-44 h-44 rounded-lg  "}>

                        <GiMeatCleaver className={"text-white text-2xl "}/>
                    </div>
                    <h1 className={"text-lg font-bold text-center"}>
                        Honey Pancakes
                    </h1>
                    <p className={"text-md font-semibold "}>
                        Breakfast
                    </p>
                    <Divider className={"m-0"}/>
                </div>
                <div className={"flex flex-col mt-4 w-full gap-4"}>
                    <div className={"flex flex-row items-center justify-between w-full"}>
                        <h1 className={"text-sm "}> Calories</h1>
                        <h1 className={"text-sm "}> 230 kCal</h1>
                    </div>
                    <div className={"flex flex-row items-center justify-between w-full"}>
                        <h1 className={"text-sm "}> Calories</h1>
                        <h1 className={"text-sm "}> 230 kCal</h1>
                    </div>
                    <div className={"flex flex-row items-center justify-between w-full"}>
                        <h1 className={"text-sm "}> Calories</h1>
                        <h1 className={"text-sm "}> 230 kCal</h1>
                    </div>
                    <div className={"flex flex-row items-center justify-between w-full"}>
                        <h1 className={"text-sm "}> Calories</h1>
                        <h1 className={"text-sm "}> 230 kCal</h1>
                    </div>
                </div>
                </div>
            </Modal>
            <div className={"flex flex-row items-center justify-between w-full"}>

                <h1 className={"font-semibold text-md"}>
                    Today&apos;s Meal
                </h1>
                <FaChevronDown className={"text-primary"}/>
            </div>
            <div className={"flex flex-row items-center justify-between w-full"}>
                <h1 className={"font-medium text-sm"}>
                    Breakfast
                </h1>
                <h4 className={"font-normal text-xs"}>2 meals | 230 calories</h4>

            </div>
            <div className={"flex flex-row items-center justify-between w-full h-full"}>
                <div className={"flex flex-row gap-6 justify-around items-center"}>
                    {/*<Image src={"/images/lunch.svg"} alt={""} width={100} height={100}/>*/}
                    <div className={"backgroundColor p-4 rounded-lg  "}>

                        <GiMeatCleaver className={"text-white text-2xl "}/>
                    </div>
                    <div className={"flex flex-col  w-full h-full"}>
                        <h1 className={"text-2xl text-start font-bold"}>Lunch</h1>
                        <p className={"text-black/40 text-start"}>Monday, 20th July</p>

                    </div>
                </div>
                <div>
                    <IoIosArrowDropright size={20} className={"text-primary"}/>

                </div>

            </div>
            <div className={"flex flex-row items-center justify-between w-full h-full"}>
                <div className={"flex flex-row gap-6 justify-around items-center"}>
                    {/*<Image src={"/images/lunch.svg"} alt={""} width={100} height={100}/>*/}
                    <div className={"backgroundColor p-4 rounded-lg  "}>

                        <GiMeatCleaver className={"text-white text-2xl "}/>
                    </div>
                    <div className={"flex flex-col  w-full h-full"}>
                        <h1 className={"text-2xl text-start font-bold"}>Lunch</h1>
                        <p className={"text-black/40 text-start"}>Monday, 20th July</p>

                    </div>
                </div>
                <div>
                    <IoIosArrowDropright onClick={() => {
                        setModalTrue(true)
                    }} size={20} className={" cursor-pointer text-primary"}/>

                </div>

            </div>


        </div>
    )
}

export default TodayMealSection