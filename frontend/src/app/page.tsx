// pages/500.tsx
'use client'
import { Avatar } from "@nextui-org/react"
import React from "react";


export default function Custom500() {
    return (
        <>
            <h1>500 - Server-side error occurred</h1>
            <Avatar radius="lg" isBordered color="danger" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="w-6 h-6 text-tiny" />
        </>
    )
}