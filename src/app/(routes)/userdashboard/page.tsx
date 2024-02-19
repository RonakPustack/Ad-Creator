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

// const _initialize = async (accountId: string, accessToken: string) => {
//     const response = await metaApi.getAllCampaigns(accessToken)
// }
// done

// User ID: 2813205032159881
// User Token: EAAKIiDG1r2wBO8THfdFv2Ppu9wZB3Vi3tD63eowZAdWyFju5QaoUFYVD1QcI1m9i67qSW9Ezabd9lmatFICmXb3PF0N1MaRQI4pG4HmVrzxVYxizaXjEDrgzFufMkbRlcXaAW6GxRATiP3cQmcmELvj0Pg8TYnqjGghJXnykbC6TIHZBKXYQyZCRkReZAbWFQiRHfI0DJk6P0ktNd9g2O2cImxAjUbGgHdYSsWqVL4sfy2JqfZCwJXSDZBctZAb73vO5sAZDZD
// Marketing Auth
export default function UserDashboard({ user }: Props) {
    
    return <>
        <h1 className="text-white">{user ? `User ID: ${user!.email}` : "Undefined"}</h1>
        <h1 className="text-white">{user ? `User Token: ${user!.image}` : "Undefined"}</h1>
    </>
    // const campaignData = [
    //     {
    //         "name": "TEST",
    //         "status": "ACTIVE",
    //         "objective": "OUTCOME_AWARENESS",
    //         "id": "120206692019020608"
    //     },
    //     {
    //         "name": "TEST",
    //         "status": "PAUSED",
    //         "objective": "OUTCOME_AWARENESS",
    //         "id": "120206691071310608"
    //     },
    //     {
    //         "name": "Ronak's Campaign",
    //         "status": "ACTIVE",
    //         "objective": "OUTCOME_APP_PROMOTION",
    //         "id": "120206685038780608"
    //     },
    //     {
    //         "name": "Ronak's Campaign",
    //         "status": "ACTIVE",
    //         "objective": "OUTCOME_APP_PROMOTION",
    //         "id": "120206685028500608"
    //     }
    // ];


    // return (
    //     <div className="h-full flex gap-5 justify-between pr-12 font-bold whitespace-nowrap bg-zinc-100 md:flex-wrap md:pr-5">
    //         <LeftPanel name={user?.name!} />
    //         <div className="flex flex-col px-4 pt-8 pb-12 text-5xl text-center text-emerald-600 bg-white border-r border-solid basis-0 border-r-neutral-400 md:hidden md:text-4xl">
    //             <div className="justify-center items-center px-10 bg-teal-200 rounded-xl border-2 border-emerald-400 border-solid h-[104px] md:px-5 md:text-4xl"> R </div>
    //             <Image
    //                 src=""
    //                 alt="menu icon"
    //                 width={73}
    //                 height={1538}
    //                 className="self-center aspect-[1.22] mt-[1538px] w-[73px] md:mt-10"
    //             />
    //         </div>
    //         <div className="flex flex-col flex-1 self-start mt-11 md:mt-5 md:max-w-full">
    //             <div className="text-6xl text-left text-black md:max-w-full md:text-4xl">
    //                 <p>Campaigns</p>
    //             </div>
    //             <TabBar index={0} />
    //             <div className="shrink-0 bg-white shadow-sm rounded-lg md:max-w-full text-black p-6" >
    //                 <Table aria-label="Example static collection table">
    //                     <TableHeader>
    //                         <TableColumn>Status</TableColumn>
    //                         <TableColumn>ID</TableColumn>
    //                         <TableColumn>Name</TableColumn>
    //                         <TableColumn>Objective</TableColumn>
    //                         <TableColumn>Action</TableColumn>
    //                     </TableHeader>
    //                     <TableBody>
    //                         {campaignData.map((item, index) => (
    //                             <TableRow key={item.id}>
    //                                 <TableCell><SwitchComponent checked={item.status == "ACTIVE"} onChange={() => { }} /></TableCell>
    //                                 <TableCell>{item.id}</TableCell>
    //                                 <TableCell>{item.name}</TableCell>
    //                                 <TableCell>{item.objective}</TableCell>
    //                                 <TableCell>
    //                                     <div className="flex">
    //                                         <div className="p-1 mr-2 bg-slate-300 rounded-md"><MdEdit /></div>
    //                                         <div className="p-1 bg-red-200 rounded-md"><MdDelete /></div>
    //                                     </div>
    //                                 </TableCell>
    //                             </TableRow>
    //                         ))}
    //                     </TableBody>
    //                 </Table>
    //             </div>
    //         </div>
    //     </div>
}