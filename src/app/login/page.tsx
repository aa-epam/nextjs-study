import AcmeLogo from '@/src/ui/acme-logo';
import LoginForm from '@/src/ui/login-form';
import Link from "next/link";
import clsx from "clsx";

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <AcmeLogo />
                    </div>
                </div>
                <LoginForm />
                <Link
                    key='signup'
                    href='/signup'
                    className={clsx(
                        'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                    )}
                >
                    <p className="hidden md:block">Do not have an account? Press here to create</p>
                </Link>
            </div>
        </main>
    );
}