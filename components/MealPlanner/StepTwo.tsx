import { Radio, Tag } from "antd";
import { useState } from "react";

const StepTwo = () => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

    const radioItems = [
        {
            title: "Vegan",
        },
        {
            title: "Non-Vegan",
        }
    ];

    const onChange = (e: any) => {
        setSelectedValue(e.target.value);
    };

    return (
        <div className={"flex flex-col w-full h-full items-center justify-center gap-6"}>
            <h1 className={"text-2xl text-start font-bold"}>Do you follow any of these diets?</h1>
            <p className={"text-black/40 text-xs"}>To offer you the best tailored diet experience we need to know more information about you.</p>
            <div className={"flex flex-col flex-wrap gap-4 w-4/5 h-full"}>
                <Radio.Group rootClassName={"flex flex-col gap-4"} onChange={onChange} value={selectedValue}>
                    {radioItems.map((item, index) => (
                        <Radio rootClassName={"border shadow-lg rounded-md p-4"} key={index} value={item.title}>
                            {item.title}
                        </Radio>
                    ))}
                </Radio.Group>
            </div>
        </div>
    );
};

export default StepTwo;
