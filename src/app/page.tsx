import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import UserCard from "./components/UserCard"
import SessionPage from "./components/SessionPage"
import Navbar from "./components/Navbar"
import SignIn from "./components/signin/SignIn"
import UserDashboard from "./(routes)/userdashboard/page"

export default async function Home() {
  const session = await getServerSession(options)

  return (
    <>
      {session ? (
        <UserDashboard user={session?.user} />
      ) : (
        <SignIn />
      )}
    </>
  )
}
