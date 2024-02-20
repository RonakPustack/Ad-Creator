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
import { useEffect, useState } from "react";
import metaMarketingApi from "../../../../api/meta_marketing_api";

import { options } from "../../../../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"



const delay = (delay: number) => new Promise((res) => {
    setTimeout(res, delay)
})

const Campaign = () => {
    const [campaignData, updateCampaignData] = useState([{ id: "default", status: "", name: "", objective: "" }]);

    useEffect(() => {
        const afterSomeTime = async () => {
            await delay(5000);
            const accessToken = localStorage.getItem("access_token")
            const { data, getAllCampaignsError } = await metaMarketingApi.getAllCampaigns(accessToken!);

            if (getAllCampaignsError) {
                console.log(getAllCampaignsError)
                return;
            }

            console.log(data["data"])
            updateCampaignData(data["data"])
        }

        afterSomeTime();
    }, []);

    return (
        <>
            {campaignData.length > 0 ?
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
                                <TableCell><Link href={`/userdashboard/adsets/${item.id}`} className='underline text-blue-600'>{item.id}</Link></TableCell>
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
                : <p>{campaignData.length}</p>
            }
        </>
    );
}

export default Campaign