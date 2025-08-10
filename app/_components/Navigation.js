import Link from 'next/link';
import React from 'react'
import { auth } from '../_lib/auth';

const Navigation = async () => {
  const session = await auth();
  return (
    <nav className='z-10 text-xl'>
      <ul className='flex gap-16 items-center'>
        <li><Link className='hover:textaccent-400 transition-colors' href="/cabins">Cabins</Link></li>
        <li><Link className='hover:textaccent-400 transition-colors' href="/about">About</Link></li>

        <li>
          {session?.user?.image ? (<Link className='hover:textaccent-400 transition-colors flex items-center gap-4' href="/account"><img className='h-8 rounded-full' src={session.user.image} alt={session.user.name} referrerPolicy='no-referrer' /><span>Guest area</span></Link>) : (
            <Link className='hover:textaccent-400 transition-colors' href="/account">Guest area</Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
export default Navigation;