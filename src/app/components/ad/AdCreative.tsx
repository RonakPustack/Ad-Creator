
type AdCreative = {
    name?: string | null | undefined;
    call_to_action_type?: number | null | undefined;
    message?: number | null | undefined;
} | undefined


type Props = {
    adcreative: AdCreative,
    onChange: any,
}

const AdCreative: React.FC<any> = ({ adcreative, onChange: onAdcreativeUpdate }: Props) => {

    const handleNameUpdate = (e: any) => {
        adcreative = { ...adcreative, name: e.target.value }
        onAdcreativeUpdate(adcreative);
    }
    const handleMessageUpdate = (e: any) => {
        adcreative = { ...adcreative, message: e.target.value }
        onAdcreativeUpdate(adcreative);
    }

    const handleCallToActionChange = (e:any) => {
        adcreative = { ...adcreative, call_to_action_type: e.target.value }
        onAdcreativeUpdate(adcreative);
    }

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


    return (
        <div className="flex flex-col p-6 rounded-lg bg-white mb-4 text-black">
            <div className="flex place-items-center mb-4">
                <p className="mr-2 text-white bg-green-800 rounded-full text-1xl h-5 w-5"><center>✔︎</center></p>
                <p className="text-black font-bold text-2xl">AdCreative</p>
            </div>

            <input className="border-slate-500 border placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 p-2 text-black rounded-lg" placeholder="My Ad Creative Name" onChange={handleNameUpdate} />

            <input className="border-slate-500 border placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 p-2 text-black rounded-lg mt-2" placeholder="Ad Title" onChange={handleMessageUpdate} />

            <div className="border-slate-500 border placeholder-slate-400 p-2 text-black rounded-lg mt-2">
                <label htmlFor="dropdown">Call to action:</label>
                <select id="dropdown" name="dropdown" onChange={handleCallToActionChange} className="border-0 outline-0">
                    {callToActionList.map((item, index) => (
                        <option key={index} value={item.value}>{item.name}</option>
                    ))}
                </select>
            </div> 
        </div>
    );
};

export default AdCreative;