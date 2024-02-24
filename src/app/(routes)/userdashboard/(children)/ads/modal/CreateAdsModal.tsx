import SwitchComponent from '@/app/components/helper/SwitchComponent';
import React, { useEffect, useState } from 'react';
import ActionButton from '../../../components/ActionButton';
import Dialog from '../../../components/Dialog';
import api from "../../../../../api/arti_api";
import SelectAdCreativeModal from './SelectAdCreativeModal';
import { AdCreative, Variant } from '@/app/models';

interface DialogBoxProps {
    isOpen: boolean;
    onClose: () => void;
    accessToken: string;
    adSetId: string;
    campaignId: string;
}

const CreateAdsModal: React.FC<DialogBoxProps> = ({ isOpen, onClose, accessToken, adSetId, campaignId }) => {
    const [name, updateName] = useState("");
    const [status, updateStatus] = useState("ACTIVE")
    const [isLoading, setLoadingState] = useState(false)
    const [loadingText, setLoadingText] = useState('')
    const [callToActionType, setCallToActionType] = useState("")
    const [imageUrl, setImageUrl] = useState('');
    const [base64String, setBase64String] = useState('');
    const [adTitle, setAdTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState("")

    const [selectedVariant, updateVariant] = useState<Variant>();

    const [adCreativeData, setAdCreative] = useState([])
    const [isAdCreativeModalOpen, setIsAdCreativeModalOpen] = useState(false);

    const callToActionList = [
        { "name": "Book Travel", "value": "BOOK_TRAVEL" },
        { "name": "Contact Us", "value": "CONTACT_US" },
        { "name": "Donate", "value": "DONATE" },
        { "name": "Donate Now", "value": "DONATE_NOW" },
        { "name": "Download", "value": "DOWNLOAD" },
        { "name": "Get Directions", "value": "GET_DIRECTIONS" },
        { "name": "Go Live", "value": "GO_LIVE" },
        { "name": "Interested", "value": "INTERESTED" },
        { "name": "Learn More", "value": "LEARN_MORE" },
        { "name": "Like Page", "value": "LIKE_PAGE" },
        { "name": "Message Page", "value": "MESSAGE_PAGE" },
        { "name": "Raise Money", "value": "RAISE_MONEY" },
        { "name": "Save", "value": "SAVE" },
        { "name": "Send Tip", "value": "SEND_TIP" },
        { "name": "Shop Now", "value": "SHOP_NOW" },
        { "name": "Sign Up", "value": "SIGN_UP" },
        { "name": "View Instagram Profile", "value": "VIEW_INSTAGRAM_PROFILE" },
        { "name": "Instagram Message", "value": "INSTAGRAM_MESSAGE" },
        { "name": "Loyalty Learn More", "value": "LOYALTY_LEARN_MORE" },
        { "name": "Purchase Gift Cards", "value": "PURCHASE_GIFT_CARDS" },
        { "name": "Pay to Access", "value": "PAY_TO_ACCESS" },
        { "name": "See More", "value": "SEE_MORE" },
        { "name": "Try in Camera", "value": "TRY_IN_CAMERA" },
        { "name": "WhatsApp Link", "value": "WHATSAPP_LINK" },
        { "name": "Book Now", "value": "BOOK_NOW" },
        { "name": "Check Availability", "value": "CHECK_AVAILABILITY" },
        { "name": "Order Now", "value": "ORDER_NOW" },
        { "name": "WhatsApp Message", "value": "WHATSAPP_MESSAGE" },
        { "name": "Get Mobile App", "value": "GET_MOBILE_APP" },
        { "name": "Install Mobile App", "value": "INSTALL_MOBILE_APP" },
        { "name": "Use Mobile App", "value": "USE_MOBILE_APP" },
        { "name": "Install App", "value": "INSTALL_APP" },
        { "name": "Use App", "value": "USE_APP" },
        { "name": "Play Game", "value": "PLAY_GAME" },
        { "name": "Watch Video", "value": "WATCH_VIDEO" },
        { "name": "Watch More", "value": "WATCH_MORE" },
        { "name": "Open Link", "value": "OPEN_LINK" },
        { "name": "No Button", "value": "NO_BUTTON" },
        { "name": "Listen Music", "value": "LISTEN_MUSIC" },
        { "name": "Mobile Download", "value": "MOBILE_DOWNLOAD" },
        { "name": "Get Offer", "value": "GET_OFFER" },
        { "name": "Get Offer View", "value": "GET_OFFER_VIEW" },
        { "name": "Buy Now", "value": "BUY_NOW" },
        { "name": "Buy Tickets", "value": "BUY_TICKETS" },
        { "name": "Update App", "value": "UPDATE_APP" },
        { "name": "Bet Now", "value": "BET_NOW" },
        { "name": "Add to Cart", "value": "ADD_TO_CART" },
        { "name": "Sell Now", "value": "SELL_NOW" },
        { "name": "Get Showtimes", "value": "GET_SHOWTIMES" },
        { "name": "Listen Now", "value": "LISTEN_NOW" },
        { "name": "Get Event Tickets", "value": "GET_EVENT_TICKETS" },
        { "name": "Remind Me", "value": "REMIND_ME" },
        { "name": "Search More", "value": "SEARCH_MORE" },
        { "name": "Pre Register", "value": "PRE_REGISTER" },
        { "name": "Swipe Up Product", "value": "SWIPE_UP_PRODUCT" },
        { "name": "Swipe Up Shop", "value": "SWIPE_UP_SHOP" },
        { "name": "Play Game on Facebook", "value": "PLAY_GAME_ON_FACEBOOK" },
        { "name": "Visit World", "value": "VISIT_WORLD" },
        { "name": "Open Instant App", "value": "OPEN_INSTANT_APP" },
        { "name": "Join Group", "value": "JOIN_GROUP" },
        { "name": "Get Promotions", "value": "GET_PROMOTIONS" },
        { "name": "Send Updates", "value": "SEND_UPDATES" },
        { "name": "Inquire Now", "value": "INQUIRE_NOW" },
        { "name": "Visit Profile", "value": "VISIT_PROFILE" },
        { "name": "Chat on WhatsApp", "value": "CHAT_ON_WHATSAPP" },
        { "name": "Explore More", "value": "EXPLORE_MORE" },
        { "name": "Confirm", "value": "CONFIRM" },
        { "name": "Join Channel", "value": "JOIN_CHANNEL" },
        { "name": "Call", "value": "CALL" },
        { "name": "Missed Call", "value": "MISSED_CALL" },
        { "name": "Call Now", "value": "CALL_NOW" },
        { "name": "Call Me", "value": "CALL_ME" },
        { "name": "Apply Now", "value": "APPLY_NOW" },
        { "name": "Buy", "value": "BUY" },
        { "name": "Get Quote", "value": "GET_QUOTE" },
        { "name": "Subscribe", "value": "SUBSCRIBE" },
        { "name": "Record Now", "value": "RECORD_NOW" },
        { "name": "Vote Now", "value": "VOTE_NOW" },
        { "name": "Give Free Rides", "value": "GIVE_FREE_RIDES" },
        { "name": "Register Now", "value": "REGISTER_NOW" },
        { "name": "Open Messenger Ext", "value": "OPEN_MESSENGER_EXT" },
        { "name": "Event RSVP", "value": "EVENT_RSVP" },
        { "name": "Civic Action", "value": "CIVIC_ACTION" },
        { "name": "Send Invites", "value": "SEND_INVITES" },
        { "name": "Refer Friends", "value": "REFER_FRIENDS" },
        { "name": "Request Time", "value": "REQUEST_TIME" },
        { "name": "See Menu", "value": "SEE_MENU" },
        { "name": "Search", "value": "SEARCH" },
        { "name": "Try It", "value": "TRY_IT" },
        { "name": "Try On", "value": "TRY_ON" },
        { "name": "Link Card", "value": "LINK_CARD" },
        { "name": "Dial Code", "value": "DIAL_CODE" },
        { "name": "Find Your Groups", "value": "FIND_YOUR_GROUPS" },
        { "name": "Start Order", "value": "START_ORDER" }
    ]

    const convertImageToBase64 = async (imageUrl: string) => {
        setLoadingState(true)
        setLoadingText('Querying Image...')
        const imageList = imageUrl.split("/");
        try {
            console.log('fetching image');
            const response = await fetch(`https://api.artiai.org/v1/utils/image/${imageList[imageList.length - 1]}`);
            const blob = await response.blob();

            setLoadingText('Processing Image...')

            const reader = new FileReader();
            reader.onload = (e: any) => {
                setBase64String(reader.result?.toString().split(",")[1]!);
                setLoadingText('')
                setLoadingState(false)
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error converting image URL to Base64:', error);
            return null;
        }
    }

    const onImageSelect = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e: any) => {
            const data = e.target.result
            setImageUrl(data);
            setBase64String(data.split(",")[1]);
        };

        reader.readAsDataURL(file);
    }

    const handleCallToActionChange = (e: any) => {
        setCallToActionType(e.target.value)
    }


    const handleNameUpdate = (e: any) => {
        updateName(e.target.value)
    }

    const handleSwitchChange = (e: Boolean) => {
        updateStatus(e ? "ACTIVE" : "PAUSED")
    }

    const handleTitleUpdate = (e: any) => {
        setAdTitle(e.target.value)
    }

    const handleVariantChange = (variant: Variant) => {
        updateVariant(variant)
        setAdTitle(variant.oneLiner)
        convertImageToBase64(variant.imageUrl!);
    }

    const handleSubmit = async () => {
        setLoadingState(true)
        setLoadingText('Creating...')

        try {
            const { adAccountId, getAdAccountIdError } = await api.getAdAccountId(accessToken)
            if (getAdAccountIdError) {
                console.log(JSON.stringify(getAdAccountIdError));
                setErrorMessage(getAdAccountIdError.response.data.error.message)
                return;
            }

            const { imageHash, uploadImageError } = await api.uploadImage(base64String, adAccountId, accessToken);


            const adCreative = {
                name: name,
                call_to_action_type: callToActionType,
                message: adTitle,
            }

            const { creativeId, createAdCreativeError } = await api.createAdCreative(adCreative, imageHash, adAccountId, accessToken);

            if (createAdCreativeError) {
                console.log(JSON.stringify(createAdCreativeError));
                setErrorMessage(createAdCreativeError.response.data.error.message)
                return;
            }


            const ad = {
                name: name,
                status: status,
                adSetId: adSetId,
                campaignId: campaignId,
                creativeId: creativeId,
            }
            const { adId, createAdError } = await api.createAd(ad, adAccountId, accessToken);
            if (createAdError) {
                console.log(JSON.stringify(createAdError));
                setErrorMessage(createAdError.data.error.message)
                return;
            }
            setLoadingState(false)
            onClose();
        } catch (e) { } finally {
            setLoadingState(false)
        }
    }

    const closeAdCreativeModal = () => {
        setIsAdCreativeModalOpen(false);
    };
    const openAdCreativeModal = () => {
        setIsAdCreativeModalOpen(true);
    };


    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col p-6 rounded-lg bg-white mb-4 text-black">
                <p className="text-black font-bold text-2xl mb-6">Create Ad</p>
                <input className="border-slate-500 border placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 p-2 text-black rounded-lg mb-2" placeholder="Ad Name" onChange={handleNameUpdate} />
                <input className="border-slate-500 border placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 p-2 text-black rounded-lg mb-2" placeholder="Ad Title" onChange={handleTitleUpdate} value={adTitle} />

                <div className="border-slate-500 border placeholder-slate-400 p-2 text-black rounded-lg mt-0 mb-4">
                    <label htmlFor="dropdown">Call to action:</label>
                    <select id="dropdown" name="dropdown" onChange={handleCallToActionChange} className="border-0 outline-0">
                        {callToActionList.map((item, index) => (
                            <option key={index} value={item.value}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className='flex bg-gray-200 rounded-md p-5 justify-center' onClick={openAdCreativeModal}>
                    <p className='font-bold text-gray-700'>Select AdCreative</p>
                </div>
                <SelectAdCreativeModal isOpen={isAdCreativeModalOpen} onClose={closeAdCreativeModal} onVariantSelect={handleVariantChange} />
                {
                    selectedVariant ? <>
                        <div className='flex py-4 flex-col items-center'>
                            <img src={selectedVariant.imageUrl!} height='200px' width='200px' className='rounded-md mr-4' />
                        </div>
                    </> : <></>
                }
                {/* <input type="file" className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-green-50 file:text-green-700
      hover:file:bg-green-100
    " onChange={onImageSelect} />
                <center>
                    <div className='mt-5'>
                        {imageUrl && <img src={imageUrl} className='rounded-lg' alt="Uploaded" style={{ maxWidth: '40%' }} />}
                    </div>
                </center> */}

                <div className="border-slate-500 placeholder-slate-400 p-2 text-black mt-2 flex space-x-4">
                    <label>Status:</label>
                    <div className='flex flex-col items-center'>
                        <SwitchComponent checked={status == "ACTIVE"} onChange={handleSwitchChange} />
                        <p className='font-bold text-xs'> {status}</p>
                    </div>
                </div>
                {errorMessage ? <p className='mt-4 text-red-700 align-middle text-sm'>{errorMessage}</p> : <></>}
                <ActionButton isLoading={isLoading} normalText="Create Ad" loadingText={loadingText} handleSubmit={handleSubmit} />
            </div>
        </Dialog>
    );
};

export default CreateAdsModal;
