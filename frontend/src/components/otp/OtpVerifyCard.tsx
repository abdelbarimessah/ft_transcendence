"use client";
import Image from "next/image";
import styles from "./Otp.module.css";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

axios.defaults.withCredentials = true;

function OtpVerifyCard() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";

  const handleEnableClick = async () => {
    if (otp.length === 6) {
      try {
        const response = await axios.patch(`${backendUrl}/auth/verify/Otp`, {
          otp,
        });
        if (response.data.valid === true) {
          toast.success("OTP verified");
          setTimeout(() => {
            router.push("/profile");
          }, 1000);
        } else toast.error("Incorrect OTP code");
      } catch {
        toast.error("Incorrect OTP code");
      }
    } else toast.error("You must enter a 6-digit code");
  };

  return (
    <>
      <div className={`relative`}>
        <div
          className={` ${styles.playCard}  overflow-hidden h-[300px] w-[385px]  bg-color-0 rounded-[40px] flex flex-col items-center justify-center gap-[22px]`}
        >
          <div className="h-[36px] w-[36px] flex items-center justify-center bg-color-0 border border-color-6 rounded-[10px]">
            <Image
              src="/../../assets/ScanIcon.svg"
              alt="Scan Icon"
              width={24}
              height={20}
            ></Image>
          </div>
          <div className="flex items-center justify-center flex-col">
            <p className="font-nico-moji text-[10px] md:text-[14px] tracking-[0px]">
              Turn on 2-Step Verification
            </p>
            <p className="font-nico-moji text-color-25 text-[8px] md:text-[10px] tracking-[0px] text-center">
              open authenticator and chose scan barcode.
            </p>
          </div>
          <div className="flex items-center justify-center w-[200px] h-[30px] bg-color-26 rounded-[10px]">
            <input
              type="text"
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="placeholder-color-6 h-full tracking-[18px] placeholder:font-light placeholder:text-[12px] placeholder:tracking-[4px] bg-color-26 placeholder:text-start ml-[18px] font-poppins font-medium rounded-[10px] text-color-6 text-[22px] w-full focus:outline-none"
              style={{ caretColor: "transparent" }}
              onChange={(event) =>
                setOtp(event.target.value.replace(/[^0-9]/g, ""))
              }
              onInput={(event) => {
                event.currentTarget.value = event.currentTarget.value.replace(
                  /[^0-9]/g,
                  ""
                );
              }}
            />
          </div>
          <div className=" flex w-full items-center justify-center gap-[10px] md:gap-[36px] md:flex-row flex-col ">
            <div
              onClick={handleEnableClick}
              className="w-[141px] h-[35px] bg-color-6 rounded-[22px] flex items-center justify-center cursor-pointer"
            >
              <p className="text-[14px] text-color-0 font-nico-moji">
                Verify code
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OtpVerifyCard;
