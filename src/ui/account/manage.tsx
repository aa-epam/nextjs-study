'use client'
import {memo, useEffect, useState} from "react";
import clsx from 'clsx';
import Modal from "@/src/ui/modal/modal";
import ChangeCredentials from "@/src/ui/account/change-credentials";
import ChangeUserInfo from "@/src/ui/account/change-user-info";
import SessionService from "@/src/client-services/session-service";
import {signOut} from "next-auth/react";

// eslint-disable-next-line react/display-name
const Manage = memo(function({ user }) {
    let update = user.update
    let [key1, reset1] = useState(1)
    let [key2, reset2] = useState(0)
    let [source, setSource] = useState('')
    let [modal, changeModalVisibility] = useState(false)
    useEffect(() => {
        switch(source) {
            case 'creds':
                reset1(key1 + 1);
                setSource('')
                break
            case 'info':
                reset2(key2 - 1);
                setSource('')
                break
            default:
                break
        }
    }, [user])

    const submitUpdate = (source, updateUserParams) => {
        setSource(source)
        if (!updateUserParams.email) updateUserParams.email = user.email
        if (!updateUserParams.name) updateUserParams.name = user.name
        let promise = SessionService[update ? 'updateUser' : 'updateUser2'](updateUserParams)
        promise.then(data => {
            console.log(data.body)
            if (data.body.needSignOut) {
                signOut({ callbackUrl: '/login' })
            } else {
                update(updateUserParams)
            }
        })
        .catch(e => {
            console.error(e)
        })
    }
    return (
        <div className='flex direction-row'>
            <div className={
                clsx('fixed top-0 left-0', {
                    'visible': modal,
                    'invisible': !modal
                })
            }>
                <Modal close={changeModalVisibility}/>
            </div>
            <ChangeCredentials user = { user } submit={submitUpdate}/>
            <ChangeUserInfo  user = { user } submit={submitUpdate}/>
            <div className='w-1/2 max-w-[400px]'>
                <button
                    onClick={() => changeModalVisibility(true)}
                    className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 ">
                    <div className="hidden md:block">Delete account</div>
                </button>
            </div>
        </div>
        )
})
export default Manage