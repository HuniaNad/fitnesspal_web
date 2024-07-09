import { Progress } from "antd";
import {IoFootsteps} from "react-icons/io5";
import {MdSportsGymnastics} from "react-icons/md";
import LocalDrinkRoundedIcon from '@mui/icons-material/LocalDrinkRounded';
import { colors } from "@/public/colors/colors";

const ActivitySection = ({ title, value }: {title: string, value: string | number}) => {
    const totalCups = 8;
    const cupsDrunk = value as number;

    const renderCups = () => {
        const cups = [];
        for (let i = 0; i < totalCups; i++) {
          if (i < cupsDrunk) {
            // Render colored cup for drunk count
            cups.push(<LocalDrinkRoundedIcon key={i} style={{ color: colors.brightGreen, fontSize: '30px' }} />);
          } else {
            // Render default cup icon
            cups.push(<LocalDrinkRoundedIcon key={i} style={{ fontSize: '20px' }} />);
          }
        }
        return cups;
      };

    return(
        <div
            className={"flex flex-col items-center justify-center rounded-2xl border shadow-lg p-4 gap-4 w-full h-full"}>
            <div className={"flex flex-row items-center justify-between w-full"}>
                <h3>{title}</h3>
                <MdSportsGymnastics size={23} className={"backgroundColor  text-white p-1 rounded-full"}/>
            </div>
            <div className={"flex flex-row justify-center items-center gap-1 my-10"}>
                {renderCups()}
            </div>
            <h1 className={"text-center font-bold w-full"}>Today&apos;s Target: {value}/{totalCups}</h1>
        </div>
    )
}
export default ActivitySection