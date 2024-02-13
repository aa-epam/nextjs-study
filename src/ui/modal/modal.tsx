'use client'
import { lusitana, lusitanaLight } from "@/src/ui/fonts";
import {useRouter} from "next/navigation";
import { signOut } from "next-auth/react";
import SessionService from "@/src/client-services/session-service";

export default function Modal({ close }) {
    const closeModal = () => close()
    const router = useRouter()

    return (
        <div onClick={closeModal}
            className='flex w-screen h-screen flex-row justify-center items-center bg-neutral-300/80'>
            <div onClick={(e) => e.stopPropagation()}
                className='bg-slate-50 px-[50px] py-[30px] rounded-[12px]  max-w-[35%]'>
                <div className='flex flex-col items-center'>
                    <div className={`${lusitana.className} text-2xl pb-[20px]`}>
                        Are you sure?
                    </div>
                    <div className={`${lusitanaLight.className} text-lg  pb-[40px]`}>
                        By processing this action you will be logout and your account will be deleted. Are you sure you want to delete the account?
                    </div>
                    <div className={`${lusitanaLight.className} min-w-[300px] text-md`}>
                        <button
                            onClick={
                                () => {
                                    // Variant 1 - deleting account with signing out on server side
                                    // all done in one call to server. Redirect url may be passed in query params
                                    // router.push('/api/session/user/delete')
                                    // close()

                                    // Variant 2 - delete account with signing out on client side
                                    // all done in 2 calls - 1st - for cleaning DB, second - for signout
                                   SessionService.deleteUser().then(() => {
                                       signOut({ callbackUrl: '/login' }).then(() => {
                                           close()
                                       })
                                   })
                                }
                            }
                            className="h-[48px] w-full items-center justify-center rounded-md bg-red-500 hover:bg-cyan-600 hover:text-slate-50 mb-[20px]">
                            <div className="">Delete</div>
                        </button>
                        <button
                            onClick={closeModal}
                            className="h-[48px] w-full items-center justify-center rounded-md bg-lime-200 hover:bg-sky-100 hover:text-blue-600 ">
                            <div className="">Cancel</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}