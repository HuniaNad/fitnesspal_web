import {Tag} from "antd";
import {useState} from "react";

const StepOne = () => {
    const tags = [
        {
            title: "Vegan",
        },
        {
            title: "Vegetarian",
        },
        {
            title: "Gluten Free",
        },
        {
            title: "Nut Free",
        },
        {
            title: "Dairy Free",
        },
        {
            title: "Pescetarian",
        },
        {
            title: "Peanut Free",
        },
        {
            title: "Egg Free",
        },
        {
            title: "Pork-free",
        }, {
            title: "Vegan",
        },
        {
            title: "Vegetarian",
        },
        {
            title: "Gluten Free",
        },
        {
            title: "Nut Free",
        },
        {
            title: "Dairy Free",
        },
        {
            title: "Pescetarian",
        }, {
            title: "Vegan",
        },
        {
            title: "Vegetarian",
        },
        {
            title: "Gluten Free",
        },
        {
            title: "Nut Free",
        },
        {
            title: "Dairy Free",
        },
        {
            title: "Pescetarian",
        },
    ];
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const toggleTagSelection = (index : number) => {
        if (selectedTags.includes(index)) {
            // If tag is already selected, remove it from selectedTags
            setSelectedTags(selectedTags.filter(tagIndex => tagIndex !== index));
        } else {
            // If tag is not selected, add it to selectedTags
            setSelectedTags([...selectedTags, index]);
        }
    };

    return (

        <div className={"flex flex-col w-full h-full items-center justify-center gap-6"}>
            <h1 className={"text-2xl  text-start font-bold"}>Before we get started,</h1>
            <h1 className={"text-2xl text-start font-bold"}> Any ingredient allergies?</h1>
            <p className={"text-black/40 text-xs"}>To offer you the best tailored diet experience we need to know more
                information about you.</p>
            <div className={"flex flex-row flex-wrap gap-4 w-4/5 h-full"}>
                {tags && tags.map((tag, index) => {
                    const isSelected = selectedTags.includes(index);

                    return (
                        <Tag
                            className={`border-primary cursor-pointer rounded-2xl px-2 py-1 ${isSelected ? 'backgroundColor font-bold text-white' : 'bg-white text-black'}`}
                            key={index}
                            onClick={() => toggleTagSelection(index)} // Assuming you have a function to toggle tag selection
                        >
                            {tag.title}
                        </Tag>
                    );
                })}

            </div>
            {/*<Button className={"backgroundColor "} size={"large"}>Get Meal Plan</Button>*/}

        </div>
    )
}
export default StepOne