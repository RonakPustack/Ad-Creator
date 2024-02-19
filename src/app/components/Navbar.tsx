import Link from "next/link"
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"

export default function Navbar() {
    return (
        <nav className="bg-slate-800 p-2 mr-5 br-5">
            <ul className="flex justify-evenly text-1xl font-normal">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/api/auth/signin">Sign In</Link></li>
                <li><Link href="/api/auth/signout">Sign Out</Link></li>
            </ul>
        </nav>
    )
}

