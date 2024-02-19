import Link from 'next/link';
import { IoIosLogOut } from "react-icons/io";

export default function LeftPanel({ name }: { name: string }) {
    return (
        <div className="flex flex-col px-4 pt-8 pb-12 text-5xl text-center text-emerald-600 bg-white border-r border-solid basis-0 border-r-neutral-400 max-md:hidden max-md:text-4xl items-center justify-between">
            <div className="justify-center items-center bg-teal-200 rounded-xl border-2 border-emerald-400 border-solid text-4xl px-4 py-2">
                <center>{name?.split(" ")[0][0]}</center>
            </div>
            <Link href="/api/auth/signout"><IoIosLogOut color='#3b5998' className='w-8' /></Link>
        </div>
    );
}