'use client'
import { inputFieldValidation } from '@/utils';
import React, { useEffect, useRef, useState } from 'react'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

type ChildComponentProps =  {
    type?: string;
    label?: string;
    placeholder?: string;
    rightPlaceholder?: string;
    value: string | number;
    setValue: any;
    noArrows?: boolean;
    error?: string | null;
    classNames?: string;
}

const Input = ({
    type = 'text',
    label = '',
    placeholder = '',
    rightPlaceholder = '',
    value = '',
    setValue = () => {},
    noArrows = false,
    error = '',
    classNames = ''
}: ChildComponentProps) => {
  const [otp1, setotp1] = useState('');
  const [otp2, setotp2] = useState('');
  const [otp3, setotp3] = useState('');
  const [otp4, setotp4] = useState('');
  const [otp5, setotp5] = useState('');
  const [otp6, setotp6] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const customClasses = "field-border block w-full border-0 py-1.5 px-4 sm:text-sm sm:leading-6";
  if (noArrows) {customClasses.concat(' no-arrows');};
  if (classNames.length>0) {customClasses.concat(` ${classNames}`);};

  const handleChange = (index: number, value: string) => {
    if (value) {
        if (index < inputRefs.length - 1) {
            inputRefs[index + 1].current?.focus();
        } else {
            inputRefs[0].current?.focus();
        }
    }
  };

  useEffect(() => {
    setValue(otp1 + otp2 + otp3 + otp4 + otp5 + otp6);
  }, [otp1, otp2, otp3, otp4, otp5, otp6, setValue]);

  const renderOTPField = () => {
    return (
        <div className="mt-1 rounded-md otp">
            <input
                ref={inputRefs[0]}
                type="text"
                maxLength={1}
                name="digit1"
                id="digit1"
                className="field-border text-center w-16 h-16 border-0 py-1.5 sm:text-sm sm:leading-6"
                value={otp1}
                onChange={(e) => {
                    setotp1(e.target.value);
                    handleChange(0, e.target.value);
                }}
            />
            <input
                ref={inputRefs[1]}
                type="text"
                maxLength={1}
                name="digit2"
                id="digit2"
                className="field-border text-center w-16 h-16 border-0 py-1.5 sm:text-sm sm:leading-6"
                value={otp2}
                onChange={(e) => {
                    setotp2(e.target.value);
                    handleChange(1, e.target.value);
                }}
            />
            <input
                ref={inputRefs[2]}
                type="text"
                maxLength={1}
                name="digit3"
                id="digit3"
                className="field-border text-center w-16 h-16 border-0 py-1.5 sm:text-sm sm:leading-6"
                value={otp3}
                onChange={(e) => {
                    setotp3(e.target.value);
                    handleChange(2, e.target.value);
                }}
            />
            <input
                ref={inputRefs[3]}
                type="text"
                maxLength={1}
                name="digit4"
                id="digit4"
                className="field-border text-center w-16 h-16 border-0 py-1.5 sm:text-sm sm:leading-6"
                value={otp4}
                onChange={(e) => {
                    setotp4(e.target.value);
                    handleChange(3, e.target.value);
                }}
            />
            <input
                ref={inputRefs[4]}
                type="text"
                maxLength={1}
                name="digit5"
                id="digit5"
                className="field-border text-center w-16 h-16 border-0 py-1.5 sm:text-sm sm:leading-6"
                value={otp5}
                onChange={(e) => {
                    setotp5(e.target.value);
                    handleChange(4, e.target.value);
                }}
            />
            <input
                ref={inputRefs[5]}
                type="text"
                maxLength={1}
                name="digit6"
                id="digit6"
                className="field-border text-center w-16 h-16 border-0 py-1.5 sm:text-sm sm:leading-6"
                value={otp6}
                onChange={(e) => {
                    setotp6(e.target.value);
                    handleChange(5, e.target.value);
                }}
            />
        </div> 
    )
  }

  const renderPasswordField = () => {
    return (
        <div className="relative mt-1 rounded-md shadow-sm">
            <input
                type={ showPassword ? 'text' : 'password' }
                name={label.toLowerCase()}
                id={label.toLowerCase()}
                className={customClasses}
                placeholder={placeholder}
                value={inputFieldValidation(value, type)}
                onChange={(e) => setValue(e.target.value)}
                style={{ marginBottom: error ? '0' : '10px' }}
            />
            <div className="absolute inset-y-0 pr-4 right-0 flex items-center">
                { showPassword ? 
                    <VisibilityOutlinedIcon 
                        onClick={() => setShowPassword(false)} 
                        className="cursor-pointer password-icon"
                    /> 
                  : <VisibilityOffOutlinedIcon 
                        onClick={() => setShowPassword(true)} 
                        className="cursor-pointer password-icon"
                    />
                }
            </div>
        </div>
    )
  }

  return (
    <div>
        <label htmlFor={label.toLowerCase()} className="block capitalize text-sm font-medium">
            {label}
        </label>

        { type === 'otp' ? 
            renderOTPField()
          : type === 'password' ? 
            renderPasswordField()
          : <div className="relative mt-1 rounded-md shadow-sm">
                <input
                type={type}
                name={label.toLowerCase()}
                id={label.toLowerCase()}
                className={customClasses}
                placeholder={placeholder}
                value={inputFieldValidation(value, type)}
                onChange={(e) => setValue(e.target.value)}
                style={{ marginBottom: error ? '0' : '10px' }}
                />
                { rightPlaceholder !== '' && 
                    <div className="absolute inset-y-0 pr-4 right-0 flex items-center">
                        <span className="right-placeholder sm:text-sm">{rightPlaceholder}</span>
                    </div>
                }
            </div>
        }
        { error && 
            <p 
                className="text-red-500 text-xs mt-1 error-msg" 
                style={{ width: (label.toLowerCase() === 'weight' || label.toLowerCase() === 'height') ? '150px' : '350px' }}>** {error}</p> 
        }
    </div>
  )
}

export default Input
