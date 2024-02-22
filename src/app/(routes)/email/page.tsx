'use client'

import { useState } from "react";
import api from "../../api/arti_api";

export default function EmailRoute() {
    const [responseVal, updateResponseVal] = useState('')

    const onSendEmailClick = async () => {
        updateResponseVal('Loading...')
        await api.sendMarketingEmail();
        updateResponseVal('Email Sent Successfully!')
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center content-center h-full bg-black">
                <button className="text-white px-8 py-5  bg-slate-800 rounded-lg" onClick={onSendEmailClick}>Send Email</button>
                {responseVal ? <p className="mt-2 text-green-500">{responseVal}</p> : <></>}
            </div>
        </>
    );

}