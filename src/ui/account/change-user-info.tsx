'use client'
import {useEffect, useState} from "react";
import AccountManageRow from "@/src/ui/account/account-manage-row";

export default function ChangeUserInfo ({ user, submit}) {
    useEffect(() => {
        setName(user.name)
    }, [user])

    let [name, setName] = useState('')

    const submitUpdate = () => {
        submit('info', { name: name })
    }
    return (
        <div className='text-xl mx-[30px]'>
            <AccountManageRow key="newName" name="newName" type="text" value={name} update={setName} label="User name"/>
            <div className=' max-w-[400px]'>
                <button
                    onClick={submitUpdate}
                    className="text-md h-[48px] px-[20px] items-center justify-center rounded-md bg-lime-200 hover:bg-sky-100 hover:text-blue-600 ">
                    <div>Change</div>
                </button>
            </div>
        </div>
    )
}