"use server"
import { auth, POST } from "@/src/server-actions/[...nextauth]"
import VercelWrapper from "@/src/server-actions/services/vercel-wrapper";

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