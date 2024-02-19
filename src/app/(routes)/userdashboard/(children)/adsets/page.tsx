'use client'

import SwitchComponent from "@/app/components/helper/SwitchComponent";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";

const Adsets = () => {
    const campaignData = [
        {
            "campaign_id": "120206685038780608",
            "name": "My Adset",
            "status": "ACTIVE",
            "bid_strategy": "LOWEST_COST_WITH_BID_CAP",
            "id": "120206685040890608"
        },
        {
            "campaign_id": "120206685028500608",
            "name": "My Adset",
            "status": "ACTIVE",
            "bid_strategy": "LOWEST_COST_WITH_BID_CAP",
            "id": "120206685029210608"
        }
    ];

    return (
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>Status</TableColumn>
                <TableColumn>ID</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Big Strategy</TableColumn>
                <TableColumn>Campaign Id</TableColumn>
                <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
                {campaignData.map((item, index) => (
                    <TableRow key={item.id}>
                        <TableCell><SwitchComponent checked={item.status == "ACTIVE"} onChange={() => { }} /></TableCell>
                        <TableCell><Link href={'/userdashboard/ads'} className='underline text-blue-600'>{item.id}</Link></TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.bid_strategy}</TableCell>
                        <TableCell>{item.campaign_id}</TableCell>
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
    );
}

export default Adsets