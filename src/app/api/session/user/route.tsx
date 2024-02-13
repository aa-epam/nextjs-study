"use server"
import {auth, POST, signOut} from "@/src/server-actions/[...nextauth]"
import VercelWrapper from "@/src/server-actions/services/vercel-wrapper";
import {redirect} from "next/navigation";

export const PUT = auth(async(req) => {
    // req.auth
    let updatedUser = await req.json()
    const isUserExists = !!await VercelWrapper.getUserByEmail(req.auth.user.email)
    if (isUserExists) {
        try {
            let user = await VercelWrapper.updateUser(req.auth.user.id, updatedUser)
            return new Response(JSON.stringify(user), { status: 200 })
        } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), { status: 404 })
        }
    } else {
        return new Response(JSON.stringify({ error: 'Such user not exist' }), { status: 404 })
    }

})

export const DELETE = auth(async(req) => {
    const isUserExists = !!await VercelWrapper.getUserByEmail(req.auth.user.email)
    if (isUserExists) {
        try {
            // await VercelWrapper.deleteUser(req.auth.user.id)
            return new Response(JSON.stringify({ result: 'deleted' }), { status: 200 })
        } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), { status: 404 })
        }
    }
    return new Response(JSON.stringify({ error: 'user not exist' }), { status: 403 })
})

// This route should handle user data update with server-side sesision update
// for current moment - not working because of next-auth js not ready (however should)
export const PATCH = auth(async(req) => {
    // req.auth
    let updatedUser = await req.json()
    const isUserExists = !!await VercelWrapper.getUserByEmail(req.auth.user.email)
    if (isUserExists) {
        try {
            let user = await VercelWrapper.updateUser(req.auth.user.id, updatedUser)
            try {
                let result = await fetch(`http://${req.headers.get('host')}/api/auth`, {
                    method: 'POST',
                    body: JSON.stringify(updatedUser)
                })
                console.log(result)
            } catch (e) {
            }
            return new Response(JSON.stringify(user), { status: 200 })
        } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), { status: 404 })
        }
    } else {
        return new Response(JSON.stringify({ error: 'Such user not exist' }), { status: 404 })
    }

})