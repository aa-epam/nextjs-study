'use client'
import {useSession} from "next-auth/react";
import Manage from "@/src/ui/account/manage";
import {useEffect, useMemo, useState} from "react";

export default function ClientManageAccount() {
    const { data, status, update } = useSession()
    const [user, setUser] = useState({ email: '', name: '', update: null })
    const [changed, setChanged] = useState(0)
    let session = data
    useEffect(() => {
        if (session?.user) {
            const changeObj = {} as any
            if (user.email !== session?.user.email) changeObj.email = session?.user.email
            if (user.name !== session?.user.name) changeObj.name = session?.user.name
            if (Object.keys(changeObj).length) {
                changeObj.update = update
                setUser({...user, ...changeObj})
                setChanged(changed + 1)
            }
        }
    }, [session])

    const changedUser = useMemo(
        () => {
            return user
        },
        [changed]
    );
    return <Manage user={changedUser} />
    return <p>Loading</p>
}