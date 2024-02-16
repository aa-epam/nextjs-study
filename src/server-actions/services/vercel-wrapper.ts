import {User} from "@/src/lib/models";
import {sql} from "@vercel/postgres";
import bcrypt from "bcrypt";
import {date} from "zod";

class VercelWrapper {
    constructor() {}

    async getUserByEmail(email: string): Promise<User | undefined> {
        try {
            const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
            return user.rows[0];
        } catch (e) {
            console.error('Failed to fetch user:', e);
            throw new Error('Failed to fetch user.');
        }
    }

    async deleteUser(id: string) {
        try {
            await sql`DELETE FROM users WHERE id = ${id}`;
        } catch (e) {
            console.error('Failed to Delete User.', e);
            throw new Error('Failed to Delete User.');
        }
    }


    async createUser(user: User): Promise<any> {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return sql<User>`
                INSERT INTO users (name, email, password)
                VALUES (${user.name}, ${user.email}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
            `;
        } catch (e) {
            console.error('Failed to set user.', e);
            throw new Error('Failed to set user.');
        }
    }

    async updateUser(id: string, user: User, hashedPassword: string): Promise<any> {
        try {
            if (user.password)  hashedPassword = await bcrypt.hash(user.password, 10);
            const result = await sql<User>`
                UPDATE users
                SET name = ${user.name}, email = ${user.email}, password = ${hashedPassword}
                WHERE id = ${id}
                RETURNING *
            `;
            return result.rows[0]
        } catch (e) {
            console.error('Failed to update user.', e);
            throw new Error('Failed to update user.');
        }
    }

    async deleteInvoice(id: string) {
        try {
            await sql`DELETE FROM invoices WHERE id = ${id}`;
        } catch (e) {
            console.error('Failed to Delete Invoice.', e);
            throw new Error('Failed to Delete Invoice.');
        }
    }

    async createInvoice(customerId: string, amount: number, status: string | undefined, date: date) {
        try {
            await sql`
                INSERT INTO invoices (customer_id, amount, status, date)
                VALUES (${customerId}, ${amount}, ${status}, ${date})
            `;
        } catch (e) {
            console.error('Database Error: Failed to Create Invoice.', e);
            throw new Error('Database Error: Failed to Create Invoice.');
        }
    }

    async updateInvoice(id: string, customerId: string, amount: number, status: string | undefined) {
        try {
            await sql`
                UPDATE invoices
                SET customer_id = ${customerId}, amount = ${amount}, status = ${status}
                WHERE id = ${id}
            `;
        } catch (e) {
            console.error('Database Error: Failed to Update Invoice.', e);
            throw new Error('Database Error: Failed to Update Invoice.');
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new VercelWrapper()
