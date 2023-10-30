import { useSession, signIn, signOut } from "next-auth/react"

export default function CamperVanPage() {
  const { data: session, status } = useSession()
  const userEmail = session?.user?.email

  if (status === "loading") {
    return <p>Hang on there...</p>
  }

  if (status === "authenticated") {
    return (
      <>
    <div>
      {session ? (
        <div>
          <h1>Welcome, {session.user.name}!</h1>
          <p>Email: {session.user.email}</p>
          <p>ID: {session.user.id}</p> {/* Display the ID */}
          <img src={session.user.image || "/default-avatar.png"} alt="User Image" />
        </div>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <>
      <p>Not signed in.</p>
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  )
}