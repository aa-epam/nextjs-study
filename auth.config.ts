export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        // @ts-ignore
        async jwt({ token, user, trigger, session }){
            if (trigger === "update") {
                token.name = session.name
            }
            // console.log('jwt', token, user, trigger, session)
            return token
        },
        async session({ session, token }){
            session.user.id = token.sub
            // console.log('session', session, token)
            return Promise.resolve(session)
        },
        authorized({ auth, request }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
            const isOnLogin = request.nextUrl.pathname.startsWith('/login');
            console.log('========================')
            console.log('isLoggedIn >>>>>>', isLoggedIn)
            console.log('isOnDashboard >>>>>>', isOnDashboard)
            console.log('nextUrl >>>>>>', request.nextUrl.toString())
            console.log('newUrl >>>>>>', new URL('/dashboard', request.nextUrl).toString())
            console.log('========================')
            if (isLoggedIn) {
                if (isOnLogin) return Response.redirect(new URL('/dashboard', request.nextUrl));
                return true;
            } else {
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
};