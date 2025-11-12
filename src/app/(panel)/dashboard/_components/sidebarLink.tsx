import Link from 'next/link'
import React from 'react'
import { sidebarLinkProps } from '@/@types/sidebarLinkProps'
import clsx from 'clsx'

const SidebarLink = ({ href, icon, isopen, label, pathname }: sidebarLinkProps) => {
  return (
    <Link href={href}>
      <div className={clsx("flex items-center gap-2 px-3 py-2 rounded-md transition-colors", {
        "bg-blue-500 text-white": pathname === href,
        " text-gray-700 hover:bg-gray-100": pathname !== href
      })}>
        <span className='w-6 h-6'>{icon}</span>
        {!isopen && <span>{label}</span>}
      </div>
    </Link>
  )
}

export default SidebarLink