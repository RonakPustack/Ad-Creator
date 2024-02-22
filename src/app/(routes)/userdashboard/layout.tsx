import LeftPanel from "./components/LeftPanel";
import TabBar from "./components/TabBar";
import { PropsWithChildren } from "react";
import { options } from "../../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"


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
    children: React.ReactNode,
}

const UserDashboardLayout = async ({ children }: Props) => {
    const session = await getServerSession(options)

    const isTest = true
    const accessToken = isTest ? "EAAJKrtHx2ZB8BOwgn5V8FaIjdLwPjkjZBxDVtNvzD1ZCXJZARjaF2A7ZAEcpEbZBebuDQ23ZCYldu7k0FyYupYQQIVWdHHJjGWvfyq9W4oxs9KeOSSjP0i0jp5Ai6gh6WDy93QSP0pVZAtvd0ZBpXNgn7sii9ZBgVomgCNATzNRtZB5xdVxmrh5XMcEOPgmrpSMwedslkclxTlgdE9HqnNKwhYBamzqaI86EyGTrH4HYyIlN4jSKBXgZCfZAyZBqsPR56VYbJUpl4ZD" : session!.user!.image!;

    return (
        <div className="h-full flex gap-5 justify-between pr-12 font-bold whitespace-nowrap bg-zinc-100 md:flex-wrap md:pr-5">
            <LeftPanel name={session?.user?.name!} />
            <div className="flex flex-col flex-1 self-start mt-11 md:mt-5 md:max-w-full">
                <div className="text-6xl text-left text-black md:max-w-full md:text-4xl">
                    <p>Campaigns</p>
                </div>
                <TabBar accessToken={accessToken} />
                <div className="shrink-0 bg-white shadow-sm rounded-lg md:max-w-full text-black p-6" >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default UserDashboardLayout;
