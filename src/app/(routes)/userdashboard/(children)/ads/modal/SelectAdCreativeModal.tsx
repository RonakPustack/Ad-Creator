import SwitchComponent from '@/app/components/helper/SwitchComponent';
import React, { useEffect, useState } from 'react';
import ActionButton from '../../../components/ActionButton';
import Dialog from '../../../components/Dialog';
import api from "../../../../../api/arti_api";
import { AdCreative, Variant } from '@/app/models';

interface DialogBoxProps {
    isOpen: boolean;
    onClose: () => void;
    onVariantSelect: (variant: Variant) => void
}


const SelectAdCreativeModal: React.FC<DialogBoxProps> = ({ isOpen, onClose, onVariantSelect }) => {
    const [adCreativeData, setAdCreative] = useState<AdCreative[]>([])

    useEffect(() => {
        const queryData = async () => {
            const { data, getAllAdCreativesError } = await api.getAllAdCreatives()

            if (getAllAdCreativesError) {
                console.log(JSON.stringify(getAllAdCreativesError))
                return;
            }

            setAdCreative(data.splice(0, 1))
        }

        queryData();
    }, []);

    const handleVariantSelect = (variant: Variant) => {
        onVariantSelect(variant);
        onClose();
    }


    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col p-6 rounded-lg bg-white mb-4 text-black">
                <p className="text-black font-bold text-2xl mb-6">Select Ad Creative</p>
                {adCreativeData ? <div className='h-[600px] w-[750px]'>
                    {adCreativeData.map((item, index) => {
                        return <ListItem adCreative={item} onVariantSelect={handleVariantSelect} key={item.id} />
                    })}
                </div> : <></>}
            </div>
        </Dialog>
    );
};


const ListItem = ({ adCreative, onVariantSelect }: { adCreative: AdCreative, onVariantSelect: any }) => {
    return <>
        <div className='flex flex-col py-4 border-gray-400 border-b items-center'>
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

                                <button className='py-2 w-full mt-4 bg-green-600 text-white font-semibold rounded-md' onClick={() => onVariantSelect(item)}>Select</button>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default SelectAdCreativeModal;
