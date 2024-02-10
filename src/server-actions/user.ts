'use server'

import {authenticate} from "@/src/server-actions/form-actions";
import { User } from "@/src/lib/models";
import { z } from "zod";
import VercelWrapper from "@/src/server-actions/services/vercel-wrapper";

export async function createAccount(
    prevState: string | undefined,
    formData: FormData,
) {
    let user
    try {
        user = await createUser(prevState, formData);
    } catch (error) {
        console.log(error)
        throw error;
    }
    if (user) await authenticate(prevState, formData)
}

type State = {
    errors?: {
        email?: string[];
        password?: string[];
        name?: string[];
    };
    message?: string | null;
};

const CreateAccountFormSchema = z.object({
    email: z.string({
        invalid_type_error: 'Please enter the email',
    }).email(),
    name: z.string({
        invalid_type_error: 'Please user name',
    }),
    password: z.string(),
});

const createUser = async function(prevState: State, formData: FormData) {
    const parsedCredentials = CreateAccountFormSchema.safeParse({
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
    });
    if (parsedCredentials.success) {
        const newUser = parsedCredentials.data as User;
        try {
            const existenceUser = await VercelWrapper.getUserByEmail(newUser.email);
            if (existenceUser) return Promise.reject('Such user is already exist');
        } catch (e) {}
        console.log('User not exist, going forward. newUser', newUser)
        const user = await VercelWrapper.createUser(newUser);
        if (user) return user
        return Promise.reject('Failed to create');
    }
    return {
        errors: parsedCredentials.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to create user',
    };
}

const updateUser = async function(id, formData: FormData) {
    const parsedCredentials = CreateAccountFormSchema.safeParse({
        email: formData.get('email'),
        name: formData.get('name'),
    });
    if (parsedCredentials.success) {
        const newUser = parsedCredentials.data as User;
        const existenceUser = await VercelWrapper.getUserByEmail(newUser.email);
        if (existenceUser) {
            const user = await VercelWrapper.createUser(newUser);
            if (user) return user
        } else {
            return Promise.reject('User not found');
        }
        console.log('newUser ', newUser)
        return Promise.reject('Failed to create');
    }
    return {
        errors: parsedCredentials.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to create user',
    };
}
