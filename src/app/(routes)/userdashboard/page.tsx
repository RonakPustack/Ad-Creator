'use client'

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from 'next/image';
import { MdEdit, MdDelete } from "react-icons/md";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/react";
import SwitchComponent from "../../components/helper/SwitchComponent";
import LeftPanel from "./components/LeftPanel";
import TabBar from "./components/TabBar";


type User = {
    name?: string | null | undefined;
    // is mapped to uid
    email?: string | null | undefined;
    // is mapped to user token
    image?: string | null | undefined;
    id?: string | null | undefined;
} | undefined


type Props = {
    user: User,
}

export default function UserDashboard({ user }: Props) {

    useEffect(() => {
        localStorage.setItem("access_token", user?.image!);
    }, []);

    return <>
        <center>
            <h1 className="text-white text-3xl mb-12">{user ? `Welcome ${user!.name}` : "Undefined"}</h1>
            <Link href="/userdashboard/campaign" className="text-white p-5 bg-slate-800 rounded-lg mr-5">Access Dashboard</Link>
            <Link href="/api/auth/signout" className="text-white p-5 bg-slate-800 rounded-lg">Log Out</Link>
        </center>
    </>
}