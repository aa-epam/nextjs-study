import {lusitana} from "@/src/ui/fonts";

export default function AccountManageRow({ name, label, type, value, update }) {
    return (
        <div className='flex justify-between items-center pb-[20px]'>
            <label htmlFor="newEmail" className={`${lusitana.className}`}>{label}</label>
            <div className='pl-[20px]'>
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={(e) => update(e.target.value)}
                    placeholder=''
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
            </div>
        </div>
    )
}