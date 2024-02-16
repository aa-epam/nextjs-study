'use client'
import {useEffect, useState} from "react";
import AccountManageRow from "@/src/ui/account/account-manage-row";
import clsx from "clsx";

export default function ChangeUserInfo ({ user, submit}) {


    let [name, setName] = useState('')
    let [error, setError] = useState('')

    useEffect(() => {
        setName(user.name)
    }, [user])

    useEffect(() => {
        if (error) setError('')
    }, [name])

    const submitUpdate = (e) => {
        e.stopPropagation()
        if (user.name === name) {
            setError('Nothing changed')
        } else {
            submit('info', {name: name})
        }
    }
    return (
        <div className='text-xl mx-[30px]'>
            <AccountManageRow key="newName" name="newName" type="text" value={name} update={setName} label="User name"/>
            <div className= {clsx('text-sm text-right text-red-400 mt-[-10px] pb-[10px]', {
                'invisible': !error
            })}>
                <span>Error: {error}</span>
            </div>
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