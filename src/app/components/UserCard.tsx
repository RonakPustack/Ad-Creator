'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image"
import testMetaMarketing from "../api/meta_marketing_api";
import Link from "next/link";



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
    pagetype: string,
}


export default function Card({ user, pagetype }: Props) {
    const [imageUrl, setImageUrl] = useState('');
    const [base64String, setBase64String] = useState('');

    const handleButtonClick = async () => {
        try {
            const accountId = user?.email;
            const token = user?.image;

            // const response = await testMetaMarketing(
            //     base64String,
            //     token,
            // )

            // console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    const handleImageUpload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e: any) => {
            setImageUrl(e.target.result);
            setBase64String(e.target.result.split(",")[1]);
        };

        reader.readAsDataURL(file);
    };

    const greeting = user?.name ? (
        <div className="flex items-center p-4 bg-white rounded-lg text-black space-x-16 w-64">
            <p className="font-bold">Hello {user?.name.split(' ')[0]}!</p>
            <Link href="/api/auth/signout"><p className="text-blue-700 underline text-sm">Logout</p></Link>
        </div>
    ) : null

    const doNothing = () => { }

    return greeting

    // return (
    //     <section className="flex flex-col gap-4">
            
    //         {/* <br />
    //         <input type="file" accept="image/*" onChange={handleImageUpload} /><br />
    //         {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />}<br />
    //         {base64String && <textarea value={base64String} style={{ color: 'black' }} onChange={doNothing} />}
    //         <button onClick={handleButtonClick}>Create Ad</button> */}
    //     </section>
    // )
}