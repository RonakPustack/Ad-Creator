import SwitchComponent from "../helper/SwitchComponent";

type Ad = {
    name?: string | null | undefined;
    status?: string | null | undefined;
} | undefined


type Props = {
    ad: Ad,
    onChange: any,
}

const Ad: React.FC<any> = ({ ad, onChange: onAdUpdate }: Props) => {

    const handleNameUpdate = (e: any) => {
        ad = {...ad, name: e.target.value}
        onAdUpdate(ad);
    }

    const handleSwitchChange = (e: any) => {
        if (e) {
            ad = { ...ad, status: "ACTIVE" }
        } else {
            ad = { ...ad, status: "PAUSED" }

        }

        onAdUpdate(ad);
    }

    return (
        <div className="flex flex-col p-6 rounded-lg bg-white mb-4 text-black">
            <div className="flex place-items-center mb-4">
                <p className="mr-2 text-white bg-green-800 rounded-full text-1xl h-5 w-5"><center>✔︎</center></p>
                <p className="text-black font-bold text-2xl">Ad</p>
            </div>
            <input className="border-slate-500 border placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 p-2 text-black rounded-lg" placeholder="My Ad Name" onChange={handleNameUpdate} />
            <div className="border-slate-500 placeholder-slate-400 p-2 text-black mt-2 flex space-x-4">
                <label>Status:</label>
                <div className='flex flex-col items-center'>
                    <SwitchComponent checked={ad?.status! == "ACTIVE"} onChange={handleSwitchChange} />
                    <p className='font-bold text-xs'> {ad?.status}</p>
                </div>
            </div>
        </div>
    );
};

export default Ad;