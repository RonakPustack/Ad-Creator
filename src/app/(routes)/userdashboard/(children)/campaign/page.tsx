'use client'

import { MdEdit, MdDelete } from "react-icons/md";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/react";
import SwitchComponent from '@/app/components/helper/SwitchComponent';
import Link from "next/link";

const Campaign = () => {
    const campaignData = [
        {
            "name": "TEST",
            "status": "ACTIVE",
            "objective": "OUTCOME_AWARENESS",
            "id": "120206692019020608"
        },
        {
            "name": "TEST",
            "status": "PAUSED",
            "objective": "OUTCOME_AWARENESS",
            "id": "120206691071310608"
        },
        {
            "name": "Ronak's Campaign",
            "status": "ACTIVE",
            "objective": "OUTCOME_APP_PROMOTION",
            "id": "120206685038780608"
        },
        {
            "name": "Ronak's Campaign",
            "status": "ACTIVE",
            "objective": "OUTCOME_APP_PROMOTION",
            "id": "120206685028500608"
        }
    ];

    return (
        <>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Objective</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                    {campaignData.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell><SwitchComponent checked={item.status == "ACTIVE"} onChange={() => { }} /></TableCell>
                            <TableCell><Link href={'/userdashboard/adsets'} className='underline text-blue-600'>{item.id}</Link></TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.objective}</TableCell>
                            <TableCell>
                                <div className="flex">
                                    <div className="p-1 mr-2 bg-slate-300 rounded-md"><MdEdit /></div>
                                    <div className="p-1 bg-red-200 rounded-md"><MdDelete /></div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default Campaign