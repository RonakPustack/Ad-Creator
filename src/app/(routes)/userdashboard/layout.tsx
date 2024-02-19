'use client'

import { useEffect, useState } from "react";
import LeftPanel from "./components/LeftPanel";
import TabBar from "./components/TabBar";
import { PropsWithChildren } from "react";


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

const UserDashboardLayout = ({ user, children }: Props) => {

    return (
        <div className="h-full flex gap-5 justify-between pr-12 font-bold whitespace-nowrap bg-zinc-100 md:flex-wrap md:pr-5">
            <LeftPanel name={user?.name!} />
            <div className="flex flex-col flex-1 self-start mt-11 md:mt-5 md:max-w-full">
                <div className="text-6xl text-left text-black md:max-w-full md:text-4xl">
                    <p>Campaigns</p>
                </div>
                <TabBar index={0} />
                <div className="shrink-0 bg-white shadow-sm rounded-lg md:max-w-full text-black p-6" >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default UserDashboardLayout;
