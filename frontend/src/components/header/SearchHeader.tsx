"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import debounce from "debounce";
import Link from "next/link";
import { SocketContext } from "@/app/SocketContext";

interface Result {
  firstName: string;
  lastName: string;
  nickName: string;
  avatar: string;
  providerId: string;
}

const SearchBareHeader = () => {
  const socketClient = useContext(SocketContext);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debouncedHandleInputChange = debounce(async (value) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/user/userSearch",
        {
          params: { query: value },
        }
      );

      setSearchResults(response.data.filtered);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, 500);

  useEffect(() => {
    socketClient.on("updateInfo", async (data) => {
      if (searchInput) {
        try {
          const response = await axios.get(
            "http://localhost:3000/user/userSearch",
            {
              params: { query: searchInput },
            }
          );

          setSearchResults(response.data.filtered);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    });
  }, [socketClient, searchInput]);

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setSearchInput(value);
    debouncedHandleInputChange(value);
  };

  const handleSearch = async (event: any) => {
    event.preventDefault();
  };

  return (
    <div className="max-w-[651px] w-full h-[66px] bg-color-0 rounded-[22px] flex items-center justify-start gap-[10px] cursor-pointer relative  position-relative">
      <div className="h-full w-[60px] flex items-center justify-center">
        <div className=" w-[30px] h-[30px] relative ">
          <Image
            src="/../../assets/searchIconProfileHeader.svg"
            alt="My Gallery Image"
            fill={true}
            priority={true}
            draggable={false}
          />
        </div>
      </div>
      <form
        onSubmit={handleSearch}
        className="w-full h-[70%] rounded-[22px] border-color-6"
      >
        <input
          type="search"
          placeholder="Search..."
          className="placeholder-color-20/50 px-[8px] h-full tracking-wider placeholder:font-light font-poppins font-[400] rounded-[22px] text-black/80 text-[22px] w-full mr-2 focus:outline-none"
          value={searchInput}
          onChange={handleInputChange}
        />
      </form>
      {searchInput && (
        <div className="result bg-color-0 z-[3000] absolute top-[70px] left-0 flex flex-col items-center justify-content-start h-[500px] xl:w-[651px] w-full rounded-[22px] pb-5">
          <div className="w-full flex items-center pl-5 gap-3 h-[50px] border-b-[2px] border-l-color-30 ">
            <span className="font-nico-moji text-color-6 text-[20px] capitalize text-center">
              People
            </span>
            <div
              className="h-[20px] mt-1  rounded-[5px] bg-color-29/20 flex items-center justify-center"
              style={{
                width:
                  searchResults.length > 9
                    ? `${searchResults.length / 10 + 30}px`
                    : "25px",
              }}
            >
              <span className="font-nico-moji text-color-6 text-[16px]  text-center">
                {searchResults.length}
              </span>
            </div>
          </div>
          <div className="w-full bg-color-30 gap-[2px] flex flex-col overflow-y-auto no-scrollbar">
            {searchResults.map((result: Result, index: any) => (
              <Link
                key={index}
                href={`http://localhost:8000/profile/${result?.providerId}`}
              >
                <div className=" h-[100px] pt-3 xl:pt-0 xl:h-[66px] w-full bg-color-0 hover:bg-color-30 z-[4000] flex xl:flex-row flex-col pl-5 items-center justify-start gap-3  hover:scale-[1.01]">
                  <div className="w-[50px] h-[50px] bg-color-15 rounded-full relative overflow-hiddenr">
                    <Image
                      src={result?.avatar}
                      alt="My Gallery Image"
                      fill={true}
                      sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                      className="object-cover  rounded-full  w-[50px] h-[50px]"
                      draggable={false}
                    />
                  </div>
                  <div className="flex gap-2 items-center justify-center">
                    <span className="font-nico-moji hidden lg:block text-color-6 text-[16px] capitalize text-center">
                      {`${result?.firstName.substring(0, 10)}${
                        result?.firstName.length > 10 ? "..." : ""
                      }`}
                    </span>
                    <span className="font-nico-moji  hidden lg:block text-color-6 text-[16px] capitalize text-center">
                      {`${result?.lastName.substring(0, 10)}${
                        result?.lastName.length > 10 ? "..." : ""
                      }`}
                    </span>
                    <div className="flex">
                      <span className="font-nico-moji text-color-29 text-[12px] capitalize text-center">
                        @
                      </span>
                      <span className="font-nico-moji text-color-29 text-[12px] capitalize text-center">
                        {`${result?.nickName.substring(0, 10)}${
                          result?.nickName.length > 10 ? "..." : ""
                        }`}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBareHeader;
