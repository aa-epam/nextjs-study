import {auth, signOut} from "@/src/server-actions/[...nextauth]";
import VercelWrapper from "@/src/server-actions/services/vercel-wrapper";
import { redirect} from "next/navigation";


// Note - because of fact that signOut on server side will WORK AS EXPECTED only if
// function that contains it called by the browser requests (not by XHR or fetch)
// there are only 2 ways how custom functions maybe implemented in a manner that will allow
// this logic work properly
// 1. As a GET route - so link to api call could be passed to useRoute router directly
// 2. As a form-action callback - so browser itself will create POST request and react will
// handle it as expected

// same logic is applied to usage of redirect function in route handlers - it WILL NOT WORK
// if call to route handler is done with XHR
export const GET = auth(async(req) => {
    const isUserExists = !!await VercelWrapper.getUserByEmail(req.auth.user.email)
    if (isUserExists) {
        try {
            // await VercelWrapper.deleteUser(req.auth.user.id)
        } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), { status: 404 })
        }
        await signOut({ redirect: false })
        redirect('/login')
    }
})