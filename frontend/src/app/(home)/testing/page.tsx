'use client'
import React, { FC, useEffect, useRef, useState } from "react";

interface Props {}
let currentOtpIndex: number = 0;

const OTPField: FC<Props> = (props): JSX.Element => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);

  const handelChange = ({target} :React.ChangeEvent<HTMLInputElement>):void => {
        const {value} = target;
        const newOtp: string[] = [...otp];
        newOtp[currentOtpIndex] = value.substring(value.length - 1);

        if(!value) setActiveOtpIndex(currentOtpIndex - 1);
        else setActiveOtpIndex(currentOtpIndex + 1);

        setOtp(newOtp);
        console.log('value ===>', value);
    }

    const handleKeyDown = ({key}: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        currentOtpIndex = index;
        if(key === 'Backspace' ) setActiveOtpIndex(currentOtpIndex - 1);
    }

    useEffect(() => {
        inputRef.current?.focus();
    },[activeOtpIndex])
    console.log('otp ===>', otp);
  return (
    <div className="h-screen flex justify-center items-center space-x-2">
      {otp.map((_, index) => {
        return (
          <React.Fragment key={index}>
            <input
            ref={index === activeOtpIndex ? inputRef : null}
              type="number"
              className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
              onChange={handelChange}
              onKeyDown={(e) => handleKeyDown(e, index) }
              value={otp[index]}
            />
            {index === otp.length - 1 ? null : (
              <span className="w-2 py-0.5 bg-gray-400" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OTPField;