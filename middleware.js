import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import { protectedRoutes } from "config/routes"

export async function middleware(req, res) {
    const { origin } = req.nextUrl
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    const allowUser = protectedRoutes.user.filter((route) => {
        if (req.nextUrl.pathname.search(route) >= 0) {
            return true
        }
    })
    const allowAdmin = protectedRoutes.admin.filter((route) => {
        if (req.nextUrl.pathname.search(route) >= 0) {
            return true
        }
    })

    if (allowUser.length > 0 && !session) {
        return NextResponse.redirect(`${origin}`)
    }

    if (
        allowAdmin.length > 0 &&
        (!session || !session.roles.includes("ADMIN"))
    ) {
        return NextResponse.redirect(`${origin}`)
    }
}
