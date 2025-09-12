"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

const NavLink = ({ href, children }: { href: string, children: ReactNode }) => {

    const path = usePathname();
    const isActive = path === href

    return (
        <Link
            key={href}
            href={href}
            className={` text-sm font-medium hover:text-pink-400 ${isActive ? "text-pink-400" : "text-neutral-300"}`}
        >
            {children}
        </Link>
    )
}

export default NavLink