import {GiMeatCleaver} from "react-icons/gi";
import {Button, Divider} from "antd";

const LunchSection = () => {
    return (
        <div className={"flex flex-col items-center justify-center gap-4 w-full h-full"}>
            <h1 className={"w-full font-bold text-lg"}>
                Ready for Lunch?
            </h1>
            <div
                className={"flex flex-col items-center justify-center gap-6 w-full h-full shadow-lg border rounded-2xl p-6"}>
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
                        <h1>450 kcal</h1>
                    </div>

                </div>
                <Divider rootClassName={"bg-primary/40 m-0"}/>
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
                        <h1>450 kcal</h1>
                    </div>

                </div>
                <div className={"w-full flex justify-end"}>
                    <Button className={"backgroundColor w-44  text-white  "} size={"large"}>Complete</Button>
                </div>

            </div>

        </div>
    )
}

export default LunchSection