import {useEffect, useState} from "react";
import AccountManageRow from "@/src/ui/account/account-manage-row";
import clsx from "clsx";

export default function ChangeCredentials ({ user, submit }) {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [password2, setPassword2] = useState('')
    let [error, setError] = useState('')
    const submitUpdate = (e) => {
        e.stopPropagation()
        if ((password || password2) && password !== password2) {
            setError('Passwords mismatch')
        } else if (user.email === email && !password && !password2) {
            setError('Nothing changed')
        } else {
            submit('creds', { email: email, password: password })
        }
    }
    useEffect(() => {
        setEmail(user.email)
    }, [user])

    useEffect(() => {
        if (error) setError('')
    }, [email, password, password2])

    let inputs = [
        { name: 'email', type: 'email', label: 'Enter new email', value: email, update: setEmail },
        { name: 'password', type: 'password', label: 'Enter new password', value: password, update: setPassword },
        { name: 'password2', type: 'password', label: 'Repeat new password', value: password2, update: setPassword2 }
    ]
    return (
        <div className='text-xl mx-[30px]'>
            {
                inputs.map((input) => {
                    return(
                        // eslint-disable-next-line react/jsx-key
                        <AccountManageRow
                            key={input.name}
                            name={input.name}
                            type={input.type}
                            value={input.value}
                            update={input.update}
                            label={input.label}
                        />
                    )
                })
            }
            <div className= {clsx('text-sm text-right text-red-400 mt-[-10px] pb-[10px]', {
                'invisible': !error
            })}>
                <span>Error: {error}</span>
            </div>
            <div className='max-w-[400px]'>
                <button
                    onClick={submitUpdate}
                    className="text-md h-[48px] px-[20px] items-center justify-center rounded-md bg-lime-200 hover:bg-sky-100 hover:text-blue-600 ">
                    <div>Change</div>
                </button>
            </div>
        </div>
    )
}