'use client'

import { useEffect, useState } from "react";

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
    return (
        <h1>hi</h1>
    );
}