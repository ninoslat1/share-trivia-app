'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import {signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Navbar = () => {
  const {data: session} = useSession()
  
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }

    setUpProviders();
  },[])


  return (
    <>
      <nav className="flex-between w-full mb-15 pt-3">
        <Link href="/" className="flex gap-2 flex-center group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path className="group-hover:text-teal-500 duration-500" strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        <p className="text-xl font-bold">Trivitopia</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5 items-center">
              <Link href="/create-trivia" className="cyan_btn">Create Trivia</Link>
              <button type="button" onClick={signOut} className='outline_btn'>Sign Out</button>
              <Link href="/profile">
                <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile' onClick={() => setToggleDropdown((prev) => !prev)}/>
              </Link>
            </div>
          ):(
            <>
              {providers && Object.values(providers).map((provider) => (
                <button type="button" className="flex items-center border border-black rounded-full py-2 px-5" key={provider.name} onClick={() => signIn(provider.id)}>Sign In
                  <img src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' className="mx-2.5" width={20} height={20}/>
                </button>
              ))}
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile' onClick={() => setToggleDropdown((prev) => !prev)}/>

              {toggleDropdown && (
                <div className="dropdown">
                  <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>My Profile</Link>
                  <Link href="/create=trivia" className="dropdown_link" onClick={() => setToggleDropdown(false)}>Create Trivia</Link>
                  <button type="button" onClick={() => {setToggleDropdown(false); signOut();}} className='mt-5 w-full outline_btn'>Sign Out</button>
                </div>
              )}

            </div>
          ) : (
            <>
              {providers && Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="cyan_btn">
                  Sign In
                </button>
              ))}
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar