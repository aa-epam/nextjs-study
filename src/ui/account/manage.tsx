'use client'
import { lusitana, lusitanaLight } from "@/src/ui/fonts";
import SessionService from "@/src/client-services/session-service";
import {useState} from "react";

export default function Manage({ user, update }) {
    let [newEmail, changeNewEmail] = useState('')
    let [newName, changeNewName] = useState('')
    const submitUpdate = () => {
        if ((newEmail && newEmail !== user.email) || (newName && newName !== user.name)) {
            const updateUserParams = {
                email: newEmail || user.email,
                name: newName || user.name
            }
            let promise = SessionService[update ? 'updateUser' : 'updateUser2'](updateUserParams)
            promise.then(data => {
                console.log(data)
                if (update) update({name: updateUserParams.name})
            })
                .catch(e => {
                console.error(e)
            }).finally(() => {
                changeNewEmail('')
                changeNewName('')
            })
        }
    }
    return (
        <>
            <div className='text-xl grid grid-cols-3 w-1/2'>
                <div className={`${lusitana.className}`}>Email</div>
                <div className={`${lusitanaLight.className}`}>{user.email}</div>
                <div>
                    <input
                        id="newEmail"
                        name="newEmail"
                        type="email"
                        value={newEmail}
                        onChange={(e) => changeNewEmail(e.target.value)}
                        placeholder="Enter new email"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>
            </div>
            <div className='text-xl grid grid-cols-3 w-1/2'>
                <div className={`${lusitana.className}`}>Name</div>
                <div className={`${lusitanaLight.className}`}>{user.name}</div>
                <div>
                    <input
                        id="newName"
                        name="newName"
                        type="text"
                        value={newName}
                        onChange={(e) => changeNewName(e.target.value)}
                        placeholder="Enter new name"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>
            </div>
            <div className='w-1/2 max-w-[400px]'>
                <button
                    onClick={submitUpdate}
                    className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 ">
                    <div className="hidden md:block" >Change</div>
                </button>
            </div>
            <div className='w-1/2 max-w-[400px]'>
                <button
                    className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 ">
                    <div className="hidden md:block">Delete account</div>
                </button>
            </div>
        </>
        )
}