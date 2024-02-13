'use client'
import { SessionProvider } from "next-auth/react";
import ClientManageAccount from "@/src/ui/account/client-manage-account";

export default function AccountPage() {
    return (
        <SessionProvider>
            <ClientManageAccount/>
        </SessionProvider>
    )
}
