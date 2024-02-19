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

const Campaign = async () => {
    const [campaignData, updateCampaignData] = useState([{ id: "default", status: "", name: "", objective: "" }]);

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token")
        console.log(accessToken)

        setTimeout(async () => {
            const { data, getAllCampaignsError } = await metaMarketingApi.getAllCampaigns(accessToken!);

            if (getAllCampaignsError) {
                console.log(getAllCampaignsError)
                return;
            }

            updateCampaignData(data["data"])
        }, 1000);
    }, [])

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

    return (
        <>
            {campaignData.length > 0 && campaignData[0].id != "default" ?
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
                : <p>No Campaigns Found!</p>
            }
        </>
    );
}

export default Campaign