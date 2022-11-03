import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import { protectedRoutes } from "config/routes"

export async function middleware(req, res) {
    const { origin } = req.nextUrl
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })
    let allow = protectedRoutes.filter((route) => {
        if (req.nextUrl.pathname.search(route) >= 0) {
            return true
        }
    })

    if (allow.length > 0 && !session) {
        return NextResponse.redirect(`${origin}`)
    }
}
