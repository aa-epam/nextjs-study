'use client'
import {useSession} from "next-auth/react";
import Manage from "@/src/ui/account/manage";

export default function ClientManageAccount() {
    const { data: session, status, update } = useSession()
    if (session?.user) {
        return <Manage user={session?.user} update={update} />
    }
    return <p>Loading</p>
}