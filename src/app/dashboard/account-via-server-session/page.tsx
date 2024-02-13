import { auth } from "@/src/server-actions/[...nextauth]";
import Manage from "@/src/ui/account/manage";

export default async function AccountPage() {
    const session = await auth()
    if (session?.user) {
        return <Manage user={session?.user} />
    }
    return <p>Loading</p>
}
