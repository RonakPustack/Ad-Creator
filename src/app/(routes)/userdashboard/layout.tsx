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
    // const accessToken = isTest ? "EAAJKrtHx2ZB8BO9Wn9jw5YsA2i9YM2NbbmWQxM378U0m4yYyZC6ngWAKmAeLYYG0P2LygOfFFzZB8Qsoue41brMTO0LHdifwADrm3CGVTXhFb9zV3ztDZB7JMAn8JwfMT8xZBeagAOo5gELc6pLZCSZAALwTdWWvxalPQeigpnknnd3QdjoiiJWBNGDvZCXS5nrWjRjOaW4nBrD2v9j2F8IdP1NdyaFeRl1HXKBqXf5weZC79oEBGlSYdiieZCp38vzyb2SZBLDBtI1wqMZD" : session!.user!.image!;

    return (
        <div className="h-full flex gap-5 justify-between pr-12 font-bold whitespace-nowrap bg-zinc-100 md:flex-wrap md:pr-5">
            <LeftPanel name={session?.user?.name!} />
            <div className="flex flex-col flex-1 self-start mt-11 md:mt-5 md:max-w-full">
                <div className="text-6xl text-left text-black md:max-w-full md:text-4xl">
                    <p>Campaigns</p>
                </div>
                <TabBar />
                <div className="shrink-0 bg-white shadow-sm rounded-lg md:max-w-full text-black p-6" >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default UserDashboardLayout;
