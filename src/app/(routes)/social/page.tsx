'use client'

import { AdCreative, Variant } from "@/app/models";
import Link from "next/link";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import api from "../../api/arti_api";

const SocialPage = () => {
    const [variant, updateVariant] = useState<Variant>();

    return (
        <>
            <div className="w-full h-full bg-white flex flex-col items-center">
                <div className="bg-slate-300 w-full py-4 px-12 flex justify-between items-center">
                    <p className="text-3xl font-bold">Social Dashboard</p>
                    <Link href="/api/auth/signout"><IoIosLogOut color='#000' size={45} className='w-8' /></Link>
                </div>
                <div className="mt-2 flex w-full h-full">
                    <LeftPanel />
                    <AdCreativeView onVariantSelect={updateVariant} />
                    <CreatePostView selectedVariant={variant} pageId="260564970462712" pageAccessToken="EAAJKrtHx2ZB8BO9NBQ422BmjQkt2f5jljbX5CeGq7lPHRj9OGO78pd8JJuF4ZAzkI2HeWwDTQ45kXoEzwoBcLZAC3OcRXQ3VOsoUjjX1LYjVRZB2vlwnK58NSPm7BEq6Ps2tpnBUUidm8M4LxMYQwUv5aaKCk8qSrRFChxlqHHrzxa7LfQMMNKhdsjWwsZAh4AEIwA827Cl88tuUZCgqIHzWZAs0HfMliLNgtUBdeYZD" />
                </div>

            </div>
        </>
    );
}

const LeftPanel = () => {
    const pagesData = [
        {
            "access_token": "EAAJKrtHx2ZB8BO9NBQ422BmjQkt2f5jljbX5CeGq7lPHRj9OGO78pd8JJuF4ZAzkI2HeWwDTQ45kXoEzwoBcLZAC3OcRXQ3VOsoUjjX1LYjVRZB2vlwnK58NSPm7BEq6Ps2tpnBUUidm8M4LxMYQwUv5aaKCk8qSrRFChxlqHHrzxa7LfQMMNKhdsjWwsZAh4AEIwA827Cl88tuUZCgqIHzWZAs0HfMliLNgtUBdeYZD",
            "category": "Entertainment website",
            "category_list": [
                {
                    "id": "2705",
                    "name": "Entertainment website"
                }
            ],
            "name": "Random Page",
            "id": "260564970462712",
            "tasks": [
                "ADVERTISE",
                "ANALYZE",
                "CREATE_CONTENT",
                "MESSAGING",
                "MODERATE",
                "MANAGE"
            ]
        }
    ]

    return <>
        <div className="bg-slate-100 h-full p-5 ml-2">
            <p className="text-xl font-bold mb-4">My Pages</p>
            {pagesData.map((item, index) => {
                return <button key={item.id}>
                    <div className="flex rounded-md bg-slate-300 p-2  pr-8">
                        <div className="rounded-md py-2 px-4 bg-slate-500 font-bold text-2xl text-white mr-4" >{item.name[0]}</div>
                        <div className="flex flex-col items-start">
                            <p className="font-bold text">{item.name}</p>
                            <p className="text-slate-800 text-xs">{item.id}</p>
                        </div>
                    </div> </button>
            })}
        </div>
    </>
}


const AdCreativeView = ({ onVariantSelect }: { onVariantSelect: (variant: Variant) => void }) => {
    const [adCreativeData, setAdCreative] = useState<AdCreative[]>([])

    const onRefreshData = async () => {
        const { data, getAllAdCreativesError } = await api.getAllAdCreatives()

        if (getAllAdCreativesError) {
            console.log(JSON.stringify(getAllAdCreativesError))
            return;
        }

        setAdCreative(data.splice(0, 2))
    }

    const handleVariantSelect = (item: Variant) => {
        onVariantSelect(item)
    }

    return <>
        <div className="flex flex-col p-6 rounded-lg bg-white mb-4 text-black">
            <div className="flex justify-between content-center">
                <p className="text-black font-bold text-2xl">Select Ad Creative</p>
                <button className="px-8 bg-green-600 text-white rounded-md" onClick={onRefreshData}>Refresh</button>
            </div>
            {adCreativeData ? <div>
                {adCreativeData.map((adCreative, index) => {
                    return <div key={adCreative.id} className='flex flex-col py-4 border-gray-400 border-b items-center'>
                        <div className='flex justify-between w-full'>
                            <div>
                                <span className='font-semibold'>Objective: </span><span className=''>{adCreative.adObjective}</span>
                                <p className='text-sm mt-2 mb-2'>{adCreative.summary}</p>
                                <div className='flex'>
                                    {adCreative.variants.map((item, index) => {
                                        return <div key={item.id} className='flex flex-col rounded-md bg-green-50 p-4 items-center mr-4 justify-between'>
                                            <div className='flex'>
                                                <img src={item.imageUrl!} height='80px' width='80px' className='rounded-md mr-4' />
                                                <div className='flex flex-col'><p className='font-semibold'>{item.oneLiner}</p>
                                                    <p className='text-xs'>{item.imageDescription}</p></div>
                                            </div>

                                            <button className='py-2 w-full mt-4 bg-green-600 text-white font-semibold rounded-md' onClick={() => handleVariantSelect(item)}>Select</button>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
                :
                <></>
            }
        </div>
    </>
}

const CreatePostView = ({ selectedVariant, pageId, pageAccessToken }: { selectedVariant?: Variant, pageId: string, pageAccessToken: string }) => {

    const [errorMessage, setErrorMessage] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    let isImageReady = imageUrl && imageUrl.length > 0

    const createPost = async () => {
        const { postId, createPostError } = await api.createPost(
            pageId,
            pageAccessToken,
            {
                message: selectedVariant?.imageDescription,
                url: selectedVariant?.imageUrl,
            },
        );

        if (createPostError) {
            setErrorMessage(createPostError)
        } else {
            setErrorMessage(postId);
        }
    }

    const onImageUrlChange = (e: any) => {
        setImageUrl(e.target.value)
    }

    return <>
        <div className="flex flex-col p-6 rounded-lg bg-white mb-4 text-black">
            <p className="text-black font-bold text-2xl mb-4">Create Facebook Post</p>
            {selectedVariant ?
                <div>
                    <input className="mb-2 border border-black-200 p-2" placeholder="Enter image URL" onChange={onImageUrlChange} />
                    <img className="mb-1 rounded-md h-[200px] w-[200px]" src={isImageReady ? imageUrl : selectedVariant.imageUrl!}></img>
                    <p className="mb-4">{selectedVariant.oneLiner!}</p>
                    <p className="text-red-500 text-xs">{errorMessage}</p>
                    <button className="bg-blue-500 text-white text p-3 rounded-md w-full mt-1" onClick={createPost}>Post</button>
                </div>
                : <p>Select a variant!</p>}
        </div>
    </>
}

export default SocialPage