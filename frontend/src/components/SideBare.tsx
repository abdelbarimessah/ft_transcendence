'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SIDE_ITEMS } from './icons/ConstansItems';
import { SideNavItem } from './icons/Types';
import { Icon } from '@iconify/react';

const SideNav = () => {
  return (
    <div className="min:h-screen min:w-screen overflow-x-hidden w-fit md:pr-8 pr-3 pt-2 flex flex-col gap-3 border-r-[1px] pl-[50px] bg-color-3">
      sidde bare
    </div>
  );
};

export default SideNav;