'use client'

import Input from "@/components/Input/input";
import { colors } from "@/public/colors/colors";
import { ResetBMIType } from "@/types";
import { calculateBMI, validateBMI, validateHeight, validateWeight, validateWeightAndHeight } from "@/utils/bmiCalculator";
import React from "react";
import CustomBMIModal from "../../CustomBMIModal/modal";

const BMISection = () => {
  const [weight, setWeight] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [bmi, setBmi] = React.useState(0);
  const [bmiMsg, setBmiMsg] = React.useState('');
  const [msgColor, setMsgColor] = React.useState(colors.purple);
  const [toggle, setToggle] = React.useState(false);

  const resetBMI = (params: ResetBMIType | null) => {
    if (!params) return;

    const { bmi, message, color } = params;

    if (bmi) setBmi(bmi);
    if (message) setBmiMsg(message);
    if (color) setMsgColor(color);
  }
  
  React.useEffect(() => {
    const validateWeightResult = validateWeight(weight);
    if (validateWeightResult) {
      resetBMI(validateWeightResult);
      return;
    }

    const validateHeightResult = validateHeight(height);
    if (validateHeightResult) {
      resetBMI(validateHeightResult);
      return;
    }

    const validateWeightAndHeightResult = validateWeightAndHeight(weight, height);
    if (validateWeightAndHeightResult) {
      resetBMI(validateWeightAndHeightResult);
      return;
    }

    const bmi = calculateBMI(weight, height);
    setBmi(bmi);

    const { message, color } = validateBMI(bmi);
    setBmiMsg(message);
    setMsgColor(color);
  }, [weight, height]);

  const handleModalState = (state: boolean) => {
    setToggle(state);
  }

  return (
    <>
      <section id="bmicalculation" className="bmi-container">
        <div className="bmi-text">
          <h1 className="text-4xl font-bold headline-secondary">Body Mass</h1>
          <h1 className="text-4xl font-bold headline-secondary">Index Calculator</h1>
          <p className="mt-4 text-xl text-secondary">Better understand your weight in relation to your height using our body mass index (BMI) calculator.</p>
          
          <div className="space"></div>
          <button className="custom-btn" onClick={() => setToggle(!toggle)}>BMI Analysis</button>
        </div>

        <div className="bmi-calculator">
          <p className="cal-head">Enter your details below</p>

          <div className="cal-fields">
            <Input label="Weight" placeholder="0.0" rightPlaceholder="kg" value={weight} setValue={setWeight}/>
            <Input label="Height" placeholder="0.0" rightPlaceholder="cm" value={height} setValue={setHeight}/>
          </div>

          <div className="cal-value" style={{background: msgColor}}>
            <p className="cal-head">Your BMI is...</p>
            <div className="cal-body">
              <p className="bmi">{bmi}</p>
              <p className="msg">{bmiMsg}</p>
            </div>
          </div>
        </div>

        { toggle && <CustomBMIModal modalState={toggle} setModalState={handleModalState} /> }
        
      </section>
      
    </>
  )
}

export default BMISection
