'use client'
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';



const SideNav = () => {
  const path = usePathname();
  const [isHide, setIsHide] = useState(false)
  const hideShowSideBare = () => {
    setIsHide(!isHide);
  };

  return (
    <div className={`bg-color-18 transition-all flex-none relative duration-150 ease-out  ${isHide ? 'w-1' : 'w-[130px]'}`}>

    <div className={` absolute flex justify-end items-center right-0 z-50 top-[145px] ${isHide === true ? 'translate-x-full  rotate-180 z-50': ''} `}>
      <button onClick={hideShowSideBare}>
        <svg className="cursor-pointer hover:opacity-80" width="23" height="37" viewBox="0 0 33 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M33 52H15C6.71573 52 0 45.2843 0 37L0 15C0 6.71573 6.71573 0 15 0H33L33 52Z" fill="#DDDDDD" />
          <path d="M21.577 37C21.577 37 12.6924 30.192 12.6924 25.5C12.6924 20.8096 21.577 14 21.577 14" stroke="#50738B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
    <div className={`transition-all absolute w-[130px] h-full left-0 duration-150 ease-out min-h-screen bg-color-3 rounded-r-3xl ${isHide ? '-translate-x-[95%] ' : ''}`}>
      <div className='relative pt-10 pb-40 flex flex-col justify-between h-full'>
        <div className='  flex flex-col justify-center items-cente gap-5 '>
          <div className='flex justify-center items-center'>
            <Link href={'/home'}>
              <svg className='cursor-pointer' width="83" height="87" viewBox="0 0 83 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.29401 83.02C9.32351 84.4148 11.8638 84.2948 13.8256 82.4936C14.4857 82.5467 15.1216 82.5979 15.7572 82.5958C16.4732 82.5934 17.1888 82.5391 17.9049 82.5143C19.6774 82.4528 21.4501 82.3974 23.2226 82.3347C23.8648 82.312 24.5064 82.2539 25.1486 82.2484C29.2766 82.213 33.4048 82.1876 37.5928 82.1489C37.6819 82.1296 37.701 82.1104 37.7101 82.0812C38.483 82.0761 39.256 82.071 40.0767 82.0871C40.1475 82.1005 40.1706 82.0927 40.1937 82.0848C40.9375 82.0804 41.6814 82.076 42.4749 82.0908C42.5465 82.1004 42.5683 82.0908 42.5902 82.0812C43.4224 82.0761 44.2545 82.0709 45.1381 82.0917C45.213 82.1328 45.2376 82.1459 45.2633 82.1569C48.0417 82.1557 50.8202 82.1442 53.5985 82.1577C55.0242 82.1646 56.4497 82.2151 57.8753 82.2481C59.006 82.2742 60.1366 82.3015 61.2672 82.3323C62.2206 82.3584 63.1739 82.3879 64.1271 82.4203C64.8879 82.4462 65.6486 82.4752 66.409 82.5093C67.6644 82.5654 68.9197 82.6232 70.1747 82.6868C71.2379 82.7408 72.3019 82.7871 73.3631 82.8685C74.1838 82.9314 74.9999 83.0525 75.8198 83.1301C76.3273 83.1781 76.8397 83.1762 77.3469 83.2268C78.063 83.2982 78.7778 83.3869 79.4903 83.4878C80.2415 83.5943 80.9911 83.7144 81.7379 83.8481C82.0142 83.8976 82.2915 83.9783 82.5462 84.0936C82.6563 84.1435 82.7634 84.3133 82.7725 84.436C82.7794 84.5296 82.6457 84.7002 82.5471 84.7244C81.7443 84.9208 80.9349 85.0909 80.069 85.2768C79.9802 85.2935 79.9603 85.3129 79.9505 85.3428C79.7729 85.348 79.5952 85.3532 79.3594 85.3658C79.2707 85.382 79.2506 85.4014 79.2406 85.4315C79.0638 85.437 78.8869 85.4424 78.6514 85.4547C78.5616 85.4701 78.541 85.4896 78.5308 85.5202C78.2924 85.5253 78.0539 85.5303 77.7614 85.5185C77.6563 85.5374 77.6052 85.5732 77.5542 85.609C77.3473 85.6136 77.1404 85.6182 76.8748 85.631C76.7858 85.6482 76.7659 85.6677 76.7562 85.6977C76.518 85.7034 76.2797 85.709 75.9879 85.6968C75.8827 85.7148 75.8311 85.7506 75.7796 85.7864C75.4556 85.7913 75.1317 85.7962 74.7474 85.8088C74.6567 85.8255 74.6365 85.845 74.6267 85.8752C74.2138 85.8798 73.8009 85.8844 73.3274 85.8972C73.2366 85.9144 73.2166 85.9339 73.207 85.9639C72.7328 85.9688 72.2586 85.9737 71.726 85.9597C71.5889 85.9782 71.5103 86.0155 71.4317 86.0529C71.1643 86.0582 70.897 86.0635 70.5662 86.0447C70.2134 86.0091 69.899 85.822 69.6571 86.1416C69.4189 86.1467 69.1807 86.1518 68.8827 86.1356C68.6868 86.1529 68.5508 86.1916 68.4148 86.2303C67.793 86.2351 67.1712 86.2398 66.4935 86.2283C66.3868 86.2477 66.3361 86.2834 66.2853 86.319C65.6638 86.3245 65.0423 86.33 64.3586 86.3128C64.1312 86.3294 63.966 86.3686 63.8009 86.4078C63.0017 86.4126 62.2025 86.4174 61.343 86.4022C61.1757 86.4203 61.0686 86.4584 60.9615 86.4965C60.1642 86.5009 59.367 86.5052 58.5091 86.5181C58.4184 86.5356 58.3986 86.5551 58.389 86.5849C56.9114 86.5894 55.4337 86.594 53.8954 86.6069C53.8046 86.6243 53.7847 86.6437 53.7751 86.6736C51.7954 86.679 49.8157 86.6843 47.7654 86.687C47.6748 86.686 47.6548 86.6875 47.6348 86.6889C47.6348 86.6889 47.6018 86.6923 47.5604 86.6662C46.7935 86.628 46.0681 86.6122 45.3426 86.6107C45.2844 86.6106 45.226 86.7095 45.1677 86.7624C42.7094 86.7674 40.2512 86.7725 37.7433 86.7359C37.5882 86.6626 37.4831 86.6048 37.3772 86.6034C36.6904 86.5942 36.0034 86.5924 35.3166 86.6009C35.1958 86.6024 35.0757 86.6637 34.9553 86.6973C32.9727 86.6945 30.9902 86.6917 28.9557 86.6627C28.8797 86.6208 28.8541 86.6083 28.8269 86.599C27.3787 86.5994 25.9306 86.5997 24.4305 86.574C24.3547 86.532 24.3292 86.5194 24.302 86.5102C23.4156 86.5106 22.5293 86.511 21.5908 86.4852C21.5144 86.4433 21.4885 86.431 21.461 86.4219C20.6643 86.4222 19.8677 86.4224 19.0232 86.3835C18.8008 86.3438 18.6261 86.3432 18.4514 86.3427C17.7998 86.3398 17.1483 86.3368 16.4448 86.3079C16.369 86.2656 16.3434 86.253 16.3159 86.2441C15.7258 86.2445 15.1358 86.2448 14.4988 86.2068C14.3063 86.1671 14.1608 86.1658 14.0153 86.1645C13.7182 86.1618 13.4211 86.1591 13.0761 86.1159C12.7655 86.0758 12.5029 86.0762 12.2403 86.0765C12.0019 86.0736 11.7635 86.0707 11.4809 86.0306C11.3202 85.991 11.2039 85.9887 11.0875 85.9864C10.6427 85.9839 10.1979 85.9815 9.70117 85.9529C9.62546 85.9104 9.59965 85.8979 9.57188 85.8894C9.15921 85.8897 8.74654 85.89 8.29111 85.8572C8.18903 85.8192 8.1297 85.8143 8.07037 85.8094C7.74345 85.8067 7.41652 85.8041 7.03841 85.7754C6.96315 85.7333 6.93737 85.7208 6.90991 85.7119C6.67314 85.7122 6.43636 85.7125 6.14986 85.6867C6.07618 85.6448 6.05065 85.6322 6.02353 85.6229C5.78683 85.6232 5.55012 85.6236 5.2725 85.5909C5.17224 85.5529 5.11289 85.548 5.05354 85.5432C4.81463 85.5406 4.57572 85.5379 4.28632 85.5089C4.21119 85.4662 4.18454 85.4543 4.15587 85.4469C4.00725 85.4468 3.85864 85.4467 3.66275 85.4206C3.59144 85.3789 3.56585 85.3663 3.53873 85.3568C3.33103 85.3571 3.12332 85.3575 2.86638 85.3319C2.79339 85.2892 2.76761 85.2766 2.73981 85.2683C2.61933 85.2685 2.49886 85.2688 2.34092 85.2363C2.24416 85.1984 2.18487 85.1933 2.12557 85.1882C2.05978 85.1856 1.99398 85.183 1.892 85.1446C1.76811 85.106 1.68039 85.1032 1.59268 85.1004C1.52672 85.0975 1.46077 85.0946 1.35216 85.0657C1.2864 85.0227 1.26115 85.0099 1.23374 85.0013C0.824274 84.8969 0.41481 84.7925 0.046257 84.6985C-0.0617004 84.3148 0.0105704 84.1293 0.355898 84.0611C1.25819 83.8828 2.15012 83.646 3.05691 83.4984C3.89416 83.3621 4.74533 83.3112 5.64995 83.2134C5.73883 83.1944 5.75815 83.1748 5.76748 83.1454C5.94753 83.1405 6.12758 83.1356 6.36933 83.1526C6.71868 83.123 7.00635 83.0715 7.29401 83.02Z" fill="#DDDDDD" />
                <path d="M14.5033 45.6035C14.6011 46.9972 14.6404 48.4211 14.3918 49.8671C14.4241 48.6654 14.4417 47.433 14.4639 46.2007C14.4673 46.0121 14.4922 45.8239 14.5033 45.6035Z" fill="#ECEDEE" />
                <path d="M34.5828 69.0059C34.6531 68.9571 34.7596 68.8573 34.8641 68.8594C35.9506 68.8815 37.0367 68.92 38.1341 68.988C37.1108 68.995 36.0764 68.9651 35.0419 68.944C34.9011 68.9411 34.7594 68.9817 34.5828 69.0059Z" fill="#F5F5F6" />
                <path d="M7.27636 82.9946C7.00626 83.0716 6.7186 83.1232 6.40771 83.1493C6.51903 83.0094 6.65356 82.8948 6.80978 82.7578C6.9739 82.8133 7.11634 82.8912 7.27636 82.9946Z" fill="#FAFAFA" />
                <path d="M13.0032 29.8594C12.9688 30.5529 12.9043 31.2626 12.8118 31.9949C12.8106 31.3564 12.835 30.6952 12.8686 30.0345C12.8714 29.9799 12.9368 29.9284 13.0032 29.8594Z" fill="#E6E6E9" />
                <path d="M12.7501 32.1074C12.7884 32.9245 12.7941 33.7655 12.7884 34.6465C12.7482 34.5556 12.6948 34.4245 12.6948 34.2935C12.6952 33.5728 12.7086 32.8521 12.7501 32.1074Z" fill="white" />
                <path d="M51.3693 0.048536C50.6355 0.0856164 49.8847 0.0869364 49.0906 0.0862636C49.2407 0.0553367 49.4339 0.00394537 49.6276 0.00169046C50.2024 -0.00499927 50.7774 0.00767347 51.3693 0.048536Z" fill="#81828C" />
                <path d="M48.8965 70.6559C49.5918 70.6189 50.3061 70.6168 51.0611 70.6204C50.8851 70.6547 50.6685 70.705 50.4513 70.7077C49.9395 70.7142 49.4274 70.6979 48.8965 70.6559Z" fill="white" />
                <path d="M79.448 68.1407C79.4577 68.0726 79.4942 67.9991 79.566 67.9453C79.5591 68.0218 79.517 68.0785 79.448 68.1407Z" fill="#D6D6DA" />
                <path d="M79.2656 68.2346C79.2831 68.1879 79.3298 68.1363 79.3991 68.1152C79.3794 68.1738 79.3371 68.2018 79.2656 68.2346Z" fill="#D6D6DA" />
                <path d="M80.4268 67.1629C80.4038 67.1107 80.4095 67.051 80.4543 66.9883C80.4808 67.042 80.4682 67.0987 80.4268 67.1629Z" fill="#D6D6DA" />
                <path d="M80.2413 67.3455C80.2244 67.3085 80.2327 67.2672 80.2762 67.2402C80.2964 67.2835 80.2815 67.3124 80.2413 67.3455Z" fill="#D6D6DA" />
                <path d="M80.3299 67.2567C80.3133 67.2158 80.3218 67.1708 80.365 67.1465C80.3848 67.1956 80.3699 67.2241 80.3299 67.2567Z" fill="#D6D6DA" />
                <path d="M79.7967 67.7899C79.7812 67.7521 79.7911 67.7102 79.8344 67.6836C79.8525 67.7279 79.8373 67.7569 79.7967 67.7899Z" fill="#D6D6DA" />
                <path d="M79.7084 67.8772C79.6927 67.843 79.7028 67.8045 79.7461 67.7754C79.7642 67.8142 79.7491 67.8436 79.7084 67.8772Z" fill="#D6D6DA" />
                <path d="M79.621 67.9666C79.6035 67.9326 79.6114 67.8943 79.6549 67.8652C79.6758 67.9038 79.6611 67.933 79.621 67.9666Z" fill="#D6D6DA" />
                <path d="M79.9748 67.6118C79.9586 67.5743 79.9677 67.5326 80.011 67.5059C80.0302 67.5498 80.0152 67.5787 79.9748 67.6118Z" fill="#D6D6DA" />
                <path d="M37.6868 82.0801C37.7019 82.1117 37.6826 82.1311 37.6339 82.1497C37.6307 82.132 37.6467 82.105 37.6868 82.0801Z" fill="white" />
                <path d="M40.174 82.0783C40.1712 82.0926 40.1479 82.1006 40.1179 82.0948C40.1113 82.081 40.1534 82.0719 40.174 82.0783Z" fill="white" />
                <path d="M42.57 82.0771C42.5689 82.0914 42.5467 82.1011 42.5162 82.0981C42.5079 82.0853 42.549 82.0725 42.57 82.0771Z" fill="white" />
                <path d="M80.0643 67.5232C80.0471 67.4862 80.0552 67.445 80.0987 67.418C80.1192 67.4611 80.1044 67.49 80.0643 67.5232Z" fill="#D6D6DA" />
                <path d="M45.2578 82.1354C45.2382 82.1476 45.2133 82.1343 45.1792 82.1005C45.1963 82.0921 45.2238 82.1021 45.2578 82.1354Z" fill="white" />
                <path d="M13.8729 82.5171C13.8519 82.4829 13.8577 82.4427 13.9002 82.4082C13.9246 82.4463 13.9122 82.4787 13.8729 82.5171Z" fill="#DDDDDD" />
                <path d="M80.1527 67.4334C80.1358 67.3964 80.1441 67.3551 80.1876 67.3281C80.2078 67.3714 80.1929 67.4003 80.1527 67.4334Z" fill="#D6D6DA" />
                <path d="M79.8867 67.7011C79.8696 67.6655 79.8779 67.6256 79.9214 67.5977C79.9417 67.6387 79.9269 67.6678 79.8867 67.7011Z" fill="#D6D6DA" />
                <path d="M70.6291 47.1036C68.1271 47.3153 65.8499 48.1213 63.8791 49.702C61.4247 51.6706 59.9479 54.2176 59.4641 57.3277C59.3783 57.879 59.3754 58.4433 59.2972 59.0493C59.1372 59.1767 59.0087 59.2491 58.8921 59.3372C57.323 60.5239 55.6481 61.5258 53.8346 62.2984C51.0654 63.4782 48.1682 64.0382 45.1721 64.1431C44.2457 63.2321 43.3135 62.3269 42.3939 61.4091C39.9778 58.9977 37.5678 56.5801 35.1543 54.1661C31.0789 50.0898 27.0021 46.0149 22.9271 41.9382C20.618 39.6281 18.3112 37.3157 16.0139 34.9494C16.0352 34.7628 16.0438 34.631 16.0568 34.4996C16.2126 32.9345 16.263 31.3498 16.5486 29.8088C17.0528 27.0882 17.9631 24.4895 19.2295 22.016C20.6454 19.2506 22.4377 16.759 24.5749 14.5159C26.5145 12.4802 28.6682 10.704 31.0304 9.16448C33.7162 7.41397 36.5623 6.01295 39.5803 4.95101C42.0879 4.06869 44.6487 3.39192 47.2943 3.08803C48.8125 2.91363 50.3352 2.7407 51.8606 2.67341C54.2955 2.56599 56.7282 2.76027 59.1142 3.22258C60.987 3.58548 62.8168 4.17343 64.6612 4.67811C65.2265 4.83279 65.7767 5.04269 66.3338 5.2273C66.9328 5.56431 67.5483 5.87538 68.1278 6.24318C69.8582 7.34148 71.4749 8.58687 72.9265 10.1133C72.9958 10.3239 73.0343 10.4847 73.1122 10.6233C74.5439 13.1717 75.6228 15.8664 76.2453 18.7171C76.658 20.6075 77.0398 22.529 77.1575 24.4536C77.3192 27.0971 77.2489 29.7533 76.7682 32.3855C76.2763 35.0792 75.5361 37.6945 74.4682 40.2103C73.5029 42.4844 72.293 44.63 70.8607 46.6471C70.7629 46.7847 70.7053 46.9507 70.6291 47.1036ZM44.1205 11.3982C44.609 10.3584 44.3282 9.34626 43.3825 8.68068C42.2127 7.85741 40.9166 7.94318 39.6344 8.22428C36.5938 8.89086 33.9798 10.4778 31.438 12.1842C29.4688 13.5062 27.7163 15.0866 26.1828 16.8982C25.4014 17.8213 24.6616 18.7813 24.1965 19.9147C23.7883 20.9098 24.1698 21.7413 24.9012 22.2551C25.7077 22.8218 26.4326 22.8674 27.239 22.2833C28.0967 21.6621 28.8816 20.9413 29.7158 20.2862C31.2221 19.1031 32.6973 17.8734 34.2654 16.7776C36.7209 15.0615 39.4598 13.8628 42.2 12.6808C42.8991 12.3793 43.6618 12.1764 44.1205 11.3982ZM52.5211 5.97998C50.9479 5.31557 49.0409 5.73182 47.891 6.99062C46.9736 7.99497 46.9218 9.13201 47.7843 10.1906C48.0309 10.4932 48.3359 10.7725 48.6669 10.9774C49.5079 11.4984 50.4047 11.8491 51.4311 11.6267C52.6366 11.3654 53.5632 10.6938 54.2071 9.66367C54.7916 8.72852 54.737 7.77898 53.9917 6.97386C53.6148 6.56669 53.0579 6.32618 52.5211 5.97998Z" fill="#52768F" />
                <path d="M7.98864 81.9825C7.4239 81.4436 6.84978 80.9141 6.2962 80.3639C4.77669 78.8537 3.26477 77.3359 1.75304 75.8179C1.59732 75.6615 1.46313 75.4837 1.33716 75.2637C1.37751 75.0095 1.41803 74.8076 1.41861 74.6055C1.42111 73.7325 1.64589 72.9003 2.23368 72.2766C3.29333 71.1521 4.42028 70.0886 5.5529 69.036C7.09602 67.6019 8.67476 66.2062 10.2305 64.7855C11.1233 63.9702 11.9961 63.1329 12.8862 62.3146C14.6221 60.7189 16.3604 59.1257 18.1048 57.5392C18.8673 56.8457 19.6059 56.1162 20.4293 55.502C21.5072 54.6979 22.7465 54.3136 24.1156 54.4698C24.6399 54.5296 25.1646 54.5854 25.6891 54.643C26.8261 55.806 27.963 56.969 29.0922 58.1909C28.7284 58.907 28.4734 59.6511 27.9973 60.205C26.5092 61.9365 24.9391 63.5977 23.3979 65.2834C22.0953 66.7082 20.7877 68.1286 19.4838 69.5524C17.8913 71.2912 16.3047 73.0354 14.7075 74.7699C13.499 76.0822 12.275 77.3803 11.064 78.6903C10.6343 79.155 10.2329 79.646 9.79993 80.1075C9.20544 80.7412 8.59325 81.3583 7.98864 81.9825Z" fill="#F7DE9E" />
                <path d="M62.345 65.0521C61.4635 63.8493 60.9542 62.4845 60.7069 61.0333C60.1677 57.8688 60.8646 54.9811 62.8484 52.4515C64.6084 50.2071 66.9212 48.8376 69.7575 48.4448C73.0553 47.9882 75.9854 48.844 78.5152 51.1104C79.0816 52.9529 79.258 54.7598 78.9828 56.6147C78.6482 58.8702 77.7114 60.842 76.1923 62.5189C74.4339 64.46 72.2581 65.6817 69.6548 66.1208C67.4446 66.4936 65.3144 66.2447 63.2491 65.385C62.9529 65.2617 62.6466 65.1624 62.345 65.0521ZM66.9974 52.122C66.1657 52.6013 65.4862 53.2595 64.9321 54.0264C64.2161 55.0174 63.7351 56.1027 63.795 57.3773C63.8371 58.273 64.4645 59.1844 65.3083 59.4905C66.3631 59.8731 67.3812 59.65 68.3256 59.1979C69.5216 58.6254 70.5056 57.78 71.2097 56.6145C71.83 55.588 72.282 54.5493 72.0512 53.3149C71.8462 52.218 70.9881 51.4301 69.8404 51.3612C68.8181 51.2998 67.9268 51.638 66.9974 52.122Z" fill="#EAEDF4" />
                <path d="M16.0664 36.8086C17.7837 38.517 19.5037 40.2227 21.2176 41.9346C24.2394 44.9526 27.2572 47.9745 30.2769 50.9947C33.7147 54.4329 37.1527 57.871 40.5906 61.3091C41.4578 62.1764 42.3247 63.0439 43.1774 63.9644C42.6516 64.0018 42.1344 64.0295 41.6299 63.9621C40.2786 63.7814 38.9124 63.6463 37.5892 63.3352C35.4362 62.829 33.2818 62.4016 31.0631 62.3708C31.1782 61.3559 31.2466 60.341 30.9654 59.3403C30.6732 58.2999 30.1765 57.371 29.4102 56.5993C28.5567 55.7399 27.7019 54.8818 26.8397 54.0311C24.4383 51.6618 20.5298 51.6239 18.0619 53.94C17.8036 54.1824 17.5384 54.4175 17.2455 54.6166C17.3675 53.4577 17.5444 52.3406 17.6677 51.2177C17.8664 49.4077 17.7987 47.5945 17.5166 45.8016C17.3159 44.526 16.927 43.2801 16.7258 42.0046C16.4539 40.2808 16.2815 38.5413 16.0664 36.8086Z" fill="#E4C78C" />
                <path d="M70.6707 47.1105C70.7055 46.9517 70.7631 46.7856 70.8608 46.648C72.2932 44.6309 73.503 42.4853 74.4683 40.2113C75.5362 37.6954 76.2764 35.0802 76.7683 32.3864C77.249 29.7543 77.3193 27.0981 77.1576 24.4545C77.0399 22.53 76.6582 20.6085 76.2454 18.7181C75.623 15.8674 74.544 13.1727 73.1123 10.6243C73.0344 10.4857 72.9959 10.3249 72.9397 10.1406C73.7931 11.0445 74.6997 11.9393 75.4885 12.9279C78.0091 16.0871 79.7305 19.6621 80.8292 23.5411C81.4375 25.6886 81.8391 27.8765 81.9922 30.1052C82.066 31.1791 82.1611 32.2562 82.1476 33.3306C82.0994 37.1856 81.566 40.9746 80.3887 44.6529C79.8679 46.2802 79.2443 47.8746 78.6375 49.5671C76.2125 47.7894 73.5974 46.9976 70.6707 47.1105Z" fill="#346182" />
                <path d="M66.3144 5.20031C65.7768 5.04255 65.2267 4.83265 64.6614 4.67797C62.817 4.17329 60.9872 3.58534 59.1143 3.22245C56.7284 2.76013 54.2956 2.56586 51.8607 2.67327C50.3354 2.74056 48.8127 2.91349 47.2944 3.08789C44.6488 3.39178 42.088 4.06855 39.5805 4.95087C36.5624 6.01282 33.7163 7.41383 31.0305 9.16434C28.6683 10.7039 26.5147 12.4801 24.5751 14.5157C22.4379 16.7588 20.6455 19.2505 19.2297 22.0158C17.9632 24.4894 17.0529 27.0881 16.5488 29.8086C16.2632 31.3497 16.2127 32.9344 16.057 34.4995C16.0439 34.6308 16.0353 34.7626 16.0019 34.9225C15.3682 34.351 14.7464 33.7616 14.1562 33.142C14.0476 33.0279 14.0273 32.7903 14.0338 32.6121C14.1335 29.8688 14.5626 27.1822 15.4093 24.5641C17.2484 18.8779 20.598 14.2266 25.1173 10.38C29.5914 6.57196 34.7129 4.00997 40.3847 2.52975C43.093 1.82295 45.8466 1.42596 48.6467 1.30182C52.6691 1.12348 56.604 1.60396 60.4581 2.74963C62.4867 3.35265 64.4384 4.15108 66.3144 5.20031Z" fill="#7998AE" />
                <path d="M62.3518 65.0824C62.6467 65.1622 62.9529 65.2614 63.2491 65.3848C65.3144 66.2445 67.4446 66.4934 69.6548 66.1206C72.2581 65.6815 74.434 64.4598 76.1923 62.5187C77.7114 60.8418 78.6483 58.87 78.9829 56.6145C79.2581 54.7596 79.0817 52.9526 78.5287 51.1367C79.7735 52.1298 80.6599 53.425 81.2797 54.8981C83.9267 61.1894 80.2505 68.2745 73.5519 69.6924C69.1641 70.6211 64.8141 68.7906 62.3518 65.0824Z" fill="#C4CBDB" />
                <path d="M8.00586 82.0077C8.59325 81.3587 9.20545 80.7416 9.79993 80.1079C10.2329 79.6464 10.6343 79.1555 11.064 78.6907C12.275 77.3808 13.499 76.0827 14.7075 74.7704C16.3047 73.0359 17.8913 71.2917 19.4838 69.5528C20.7877 68.1291 22.0953 66.7087 23.3979 65.2839C24.9392 63.5981 26.5092 61.937 27.9973 60.2055C28.4734 59.6515 28.7284 58.9075 29.099 58.2207C30.3269 59.8629 30.266 62.5234 28.8762 64.1395C27.4316 65.8192 25.9039 67.4276 24.4076 69.0627C21.435 72.311 18.459 75.5562 15.4844 78.8027C14.6459 79.7178 13.8164 80.6415 12.9668 81.5463C11.6293 82.9708 9.65555 83.1581 8.00586 82.0077Z" fill="#E1C587" />
                <path d="M45.1848 64.1708C48.1684 64.0393 51.0657 63.4793 53.8348 62.2995C55.6483 61.5269 57.3233 60.525 58.8924 59.3383C59.0089 59.2501 59.1374 59.1778 59.2865 59.0898C59.4351 60.0592 59.491 61.0508 59.6946 62.0112C60.0521 63.698 60.843 65.1978 61.901 66.5567C61.9361 66.6018 61.9661 66.6508 62.0374 66.7546C61.697 66.9024 61.3808 67.044 61.0613 67.1778C58.6239 68.1989 56.0848 68.8442 53.4689 69.1782C52.5489 69.2956 51.6169 69.328 50.6891 69.3671C50.5107 69.3746 50.2796 69.2791 50.1512 69.152C48.4916 67.5088 46.8462 65.8512 45.1848 64.1708Z" fill="#346182" />
                <path d="M31.0477 62.4004C33.2818 62.4015 35.4362 62.8289 37.5893 63.3351C38.9124 63.6462 40.2786 63.7813 41.6299 63.962C42.1344 64.0294 42.6516 64.0017 43.1895 63.9913C44.4008 65.1391 45.5843 66.3142 46.7711 67.4861C47.3568 68.0646 47.9485 68.6369 48.5375 69.212C48.5212 69.2556 48.505 69.2993 48.4887 69.343C47.7535 69.2805 47.0084 69.274 46.2852 69.1445C44.3703 68.8018 42.4677 68.3905 40.5549 68.0353C38.3526 67.6264 36.136 67.5074 33.8986 67.7201C30.8813 68.0071 28.0206 68.8129 25.3177 70.1827C25.2335 70.2254 25.1377 70.2452 25.0022 70.2113C25.7243 69.4194 26.445 68.6262 27.169 67.836C27.9672 66.9648 28.7742 66.1016 29.5669 65.2253C30.2941 64.4213 30.7541 63.4721 31.0477 62.4004Z" fill="#D1B47D" />
                <path d="M25.6715 54.6171C25.1646 54.5858 24.6399 54.5299 24.1156 54.4701C22.7465 54.314 21.5072 54.6983 20.4293 55.5024C19.6059 56.1166 18.8673 56.8461 18.1048 57.5396C16.3604 59.126 14.6221 60.7192 12.8862 62.315C11.9961 63.1333 11.1233 63.9706 10.2305 64.7859C8.67476 66.2065 7.09602 67.6023 5.55291 69.0364C4.42029 70.089 3.29334 71.1525 2.23369 72.2769C1.64589 72.9007 1.42111 73.7329 1.41861 74.6059C1.41804 74.8079 1.37752 75.0099 1.32424 75.2364C0.251857 73.6336 0.45148 71.7432 1.86615 70.4353C4.85988 67.6675 7.878 64.926 10.8845 62.172C13.5858 59.6974 16.2711 57.2051 18.9899 54.7498C20.8898 53.034 23.6977 52.9918 25.6715 54.6171Z" fill="#FDE4AF" />
                <path d="M16.0549 36.7815C16.2816 38.5413 16.454 40.2808 16.7259 42.0046C16.9271 43.2801 17.316 44.526 17.5167 45.8016C17.7988 47.5945 17.8665 49.4077 17.6678 51.2177C17.5445 52.3406 17.3676 53.4577 17.2148 54.6151C16.6432 55.2025 16.078 55.7588 15.4986 56.3C14.8296 56.9249 14.1491 57.5375 13.4713 58.1529C13.3678 58.2468 13.2516 58.3269 13.1479 58.4081C13.6569 57.1168 14.226 55.8662 14.6468 54.5676C15.7504 51.162 16.0876 47.6688 15.5459 44.122C15.3038 42.537 14.887 40.9792 14.6267 39.3964C14.3877 37.9432 14.252 36.4729 14.0732 35.0098C14.0688 34.9733 14.0925 34.9334 14.1345 34.7812C14.8022 35.4716 15.4227 36.113 16.0549 36.7815Z" fill="#FDE4AF" />
                <path d="M44.1059 11.4292C43.6618 12.1775 42.8991 12.3804 42.2 12.682C39.4599 13.8639 36.721 15.0626 34.2654 16.7787C32.6973 17.8746 31.2222 19.1042 29.7159 20.2873C28.8817 20.9424 28.0968 21.6632 27.239 22.2845C26.4327 22.8685 25.7078 22.823 24.9012 22.2563C24.1699 21.7424 23.7884 20.9109 24.1966 19.9159C24.6617 18.7824 25.4015 17.8224 26.1828 16.8993C27.7164 15.0877 29.4689 13.5074 31.4381 12.1853C33.9798 10.4789 36.5939 8.89198 39.6345 8.2254C40.9167 7.94431 42.2127 7.85853 43.3826 8.6818C44.3283 9.34739 44.609 10.3596 44.1059 11.4292Z" fill="#7998AE" />
                <path d="M52.5518 5.99594C53.058 6.32697 53.6149 6.56749 53.9918 6.97465C54.7371 7.77978 54.7917 8.72931 54.2072 9.66447C53.5633 10.6946 52.6367 11.3662 51.4312 11.6275C50.4048 11.8499 49.508 11.4991 48.667 10.9782C48.336 10.7733 48.031 10.494 47.7844 10.1914C46.9219 9.13281 46.9737 7.99577 47.8911 6.99142C49.041 5.73262 50.948 5.31637 52.5518 5.99594Z" fill="#7998AE" />
                <path d="M67.0223 52.0983C67.9268 51.6375 68.8182 51.2993 69.8404 51.3607C70.9881 51.4296 71.8462 52.2175 72.0513 53.3144C72.282 54.5488 71.83 55.5875 71.2098 56.6141C70.5056 57.7795 69.5216 58.6249 68.3256 59.1974C67.3812 59.6495 66.3631 59.8726 65.3084 59.49C64.4646 59.1839 63.8372 58.2725 63.7951 57.3768C63.7352 56.1022 64.2161 55.0169 64.9321 54.0259C65.4862 53.259 66.1658 52.6009 67.0223 52.0983Z" fill="#EAEDF4" />
              </svg>
            </Link>
          </div>
        </div>
        <div className=' flex flex-col gap-[50px]'>
          <Link className='' href={'/home'}>
            <div className='flex justify-center items-center flex-col  h-[50px]'>
              <div className="group">
                <svg className={`${path === '/home' ? 'scale-110 fill-color-6' : ''} transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:fill-color-6 `} width="39" height="41" viewBox="0 0 39 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className={`${path === '/home' ? 'stroke-color-6' : ''} group-hover:stroke-color-6 stroke-[#c3cfd7]`} d="M14.3458 36.8116V31.1243C14.3458 29.6777 15.5251 28.5023 16.9862 28.4926H22.3385C23.8066 28.4926 24.9967 29.6709 24.9967 31.1243V36.8292C24.9964 38.0574 25.9866 39.0612 27.2268 39.09H30.795C34.352 39.09 37.2355 36.2353 37.2355 32.7139V16.5353C37.2165 15.1499 36.5595 13.849 35.4514 13.0028L23.2483 3.27089C21.1105 1.57637 18.0715 1.57637 15.9336 3.27089L3.78408 13.0205C2.67181 13.8633 2.0137 15.1663 2 16.5529V32.7139C2 36.2353 4.88352 39.09 8.44051 39.09H12.0087C13.2797 39.09 14.3101 38.0699 14.3101 36.8116" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
          <Link href={'/profile'}>
            <div className='flex justify-center items-center flex-col  h-[50px]'>
              <div className="group">
                <svg className={`${path === '/profile' ? 'scale-110 fill-color-6' : ''} transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:fill-color-6 `} width="35" height="47" viewBox="0 0 35 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className={`${path === '/profile' ? 'stroke-color-6 ' : ''}  group-hover:stroke-color-6 stroke-[#c3cfd7] `} fillRule="evenodd" clipRule="evenodd" d="M17.2803 44.9984C9.03846 44.9984 2 43.7158 2 38.5795C2 33.443 8.99381 28.7012 17.2803 28.7012C25.5225 28.7012 32.5609 33.397 32.5609 38.5335C32.5609 43.6678 25.5671 44.9984 17.2803 44.9984Z" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path className={`${path === '/profile' ? 'stroke-color-6 ' : ''} group-hover:stroke-color-6 stroke-[#c3cfd7]`} fillRule="evenodd" clipRule="evenodd" d="M17.264 21.5872C22.6729 21.5872 27.0566 17.2033 27.0566 11.7946C27.0566 6.38585 22.6729 2 17.264 2C11.8554 2 7.46954 6.38585 7.46954 11.7946C7.45128 17.1851 11.8047 21.5689 17.195 21.5872C17.2194 21.5872 17.2417 21.5872 17.264 21.5872Z" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
          <Link href={'/chat'}>
            <div className='flex justify-center items-center flex-col  h-[50px]'>
              <div className="group">
                <svg className={`${path === '/chat' ? 'scale-110 fill-color-6' : ''} transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:fill-color-6 `} width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className={`${path === '/chat' ? 'stroke-color-6' : ''} group-hover:stroke-color-6 stroke-[#c3cfd7]`} fillRule="evenodd" clipRule="evenodd" d="M33.582 33.5792C27.9281 39.2337 19.5561 40.4554 12.7049 37.2869C11.6935 36.8797 10.8642 36.5506 10.0759 36.5506C7.8802 36.5636 5.14716 38.6927 3.72672 37.2739C2.30627 35.8533 4.43694 33.1181 4.43694 30.9091C4.43694 30.1207 4.12087 29.3063 3.7137 28.2929C0.543737 21.4428 1.7671 13.068 7.42098 7.41533C14.6385 0.195199 26.3645 0.1952 33.582 7.41347C40.8125 14.6448 40.7995 26.361 33.582 33.5792Z" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path className={`${path === '/chat' ? 'stroke-color-3' : ''} group-hover:stroke-color-3 stroke-[#c3cfd7]`} d="M27.7881 21.2637H27.8047" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path className={`${path === '/chat' ? 'stroke-color-3' : ''} group-hover:stroke-color-3 stroke-[#c3cfd7]`} d="M20.3711 21.2637H20.3877" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path className={`${path === '/chat' ? 'stroke-color-3' : ''} group-hover:stroke-color-3 stroke-[#c3cfd7]`} d="M12.9546 21.2637H12.9712" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
          <Link href={'/game'}>
            <div className='flex justify-center items-center flex-col  h-[50px]'>
              <div className="group">
                <svg className={`${path === '/game' ? 'scale-110 fill-color-6' : ''} transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:fill-color-6 `} width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className={`${path === '/game' ? 'stroke-color-3' : ''} group-hover:stroke-color-3 stroke-[#c3cfd7]`} fillRule="evenodd" clipRule="evenodd" d="M39 24.6325C39 13.8583 34.3758 10.2656 20.501 10.2656C6.62431 10.2656 2 13.8583 2 24.6325C2 35.4087 6.62431 38.9995 20.501 38.9995C34.3758 38.9995 39 35.4087 39 24.6325Z" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path className={`${path === '/game' ? 'stroke-color-3' : ''} group-hover:stroke-color-3 stroke-[#c3cfd7]`} d="M14.6689 21.0781V28.0063" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path className={`${path === '/game' ? 'stroke-color-3' : ''} group-hover:stroke-color-3 stroke-[#c3cfd7]`} d="M18.2046 24.543H11.1367" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path className={`${path === '/game' ? 'stroke-color-3' : ''} group-hover:stroke-color-3 stroke-[#c3cfd7]`} d="M26.7259 21.291H26.5278" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path className={`${path === '/game' ? 'stroke-color-3' : ''} group-hover:stroke-color-3 stroke-[#c3cfd7]`} d="M30.0794 27.9043H29.8813" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path className={`${path === '/game' ? 'stroke-color-6' : ''} group-hover:stroke-color-6 stroke-[#c3cfd7]`} d="M13.2344 2C13.2473 3.3838 14.3812 4.49379 15.7648 4.48083H17.718C19.8546 4.46418 21.6025 6.17728 21.6321 8.314V10.2657" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link href={'/setting'}>
            <div className='flex justify-center items-center flex-col  h-[50px]'>
              <div className="group">
                <svg className={`${path === '/setting' ? 'scale-110 fill-color-6' : ''} transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:fill-color-6 `} width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className={`${path === '/setting' ? 'stroke-color-3' : ''} group-hover:stroke-color-3 stroke-[#c3cfd7]`} fillRule="evenodd" clipRule="evenodd" d="M38.2775 11.2505C36.7899 8.92872 33.4962 8.13429 30.9221 9.47501C28.6831 10.6388 25.8849 9.18263 25.8849 6.85319C25.8849 4.17363 23.4729 2 20.4996 2C17.5263 2 15.1143 4.17363 15.1143 6.85319C15.1143 9.18263 12.316 10.6388 10.0791 9.47501C7.50276 8.13429 4.20927 8.92872 2.72157 11.2505C1.23597 13.5722 2.11751 16.5403 4.6938 17.879C6.93072 19.0447 6.93072 21.9553 4.6938 23.121C2.11751 24.4615 1.23597 27.4297 2.72157 29.7496C4.20927 32.0713 7.50276 32.8658 10.0769 31.527C12.3139 30.3613 15.1143 31.8173 15.1143 34.1468C15.1143 36.8263 17.5263 39 20.4996 39C23.4729 39 25.8849 36.8263 25.8849 34.1468C25.8849 31.8173 28.6831 30.3613 30.9221 31.527C33.4962 32.8658 36.7899 32.0713 38.2775 29.7496C39.7651 27.4297 38.8815 24.4615 36.3073 23.121C34.0706 21.9553 34.0684 19.0447 36.3073 17.879C38.8815 16.5403 39.7651 13.5722 38.2775 11.2505Z" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path className={`${path === '/setting' ? 'stroke-color-3' : ''} group-hover:stroke-color-3 stroke-[#c3cfd7] `} fillRule="evenodd" clipRule="evenodd" d="M20.4998 15.6309C23.5053 15.6309 25.941 17.8102 25.941 20.4993C25.941 23.1884 23.5053 25.3677 20.4998 25.3677C17.4943 25.3677 15.0586 23.1884 15.0586 20.4993C15.0586 17.8102 17.4943 15.6309 20.4998 15.6309Z" stroke="#D0C7B4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SideNav;