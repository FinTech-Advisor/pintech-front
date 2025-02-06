'use client'
import { redirect } from "next/navigation"

export const AccountList = () => {
    const redirectUrl = '/bank/view/1'

    redirect(redirectUrl)
}