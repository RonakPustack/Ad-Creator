import Link from "next/link"

export default function SignIn() {
    return (
        <div className="">
            <div className="rounded-lg p-10 bg-slate-600">
                <p className="font-bold text-2xl">Authenticate!</p>
                <Link href="/api/auth/signin"><div className="mt-8 p-4 bg-indigo-500 rounded-lg text-center font-bold">Sign In</div></Link>
            </div>
        </div>
    );
}