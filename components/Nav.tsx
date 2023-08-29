"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from '@node_modules/next-auth/providers';


/*{providers && Object.values(providers).map(Provider => {
  <button type='button' key={Provider.id} onClick={() => signIn(Provider.id)} className='black_btn'> Sign In </button> 
})}*/
//const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null> (null);
/*useEffect(() => {
      const fetchProviders  = async () =>{
        const response = await getProviders()
        //console.log(response)
        setProviders(response)
      }
      fetchProviders()
    }) */

export default function Nav() {

    const {data: session} = useSession();
    
    const [toggleDropdown, setToggleDropdown] = useState(false);
    
    return (
      <nav className='w-full flex-between mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
          <Image src='/assets/images/logo.svg' alt='logo' width={30} height={30} className='object-contain'/> 
          <p className='logo_text'>Promptopia</p>
        </Link>
        
        {/* desktop navigation */}
        <div className='sm:flex hidden'>
          {
            session?.user ? 
            <div className='flex gap-3 md:gap-5'>
              <Link href='/create-prompt' className='black_btn'> Create post </Link>
              <button type='button' onClick={() => signOut()} className='outline_btn'> signOut </button>
              <Link href='/profile'>
                <Image src={session?.user!.image || '/assets/images/logo.svg'} alt='profile-photo' width={37} height={37} className='rounded-full'/>
              </Link>
            </div> : 
            <>
              { <button type='button' key={'google'} onClick={() => signIn('google')} className='black_btn'> Sign In with google </button> }
            </>
          }
        </div>

        {/* mobile navigation */}
        <div className='sm:hidden flex relative'>
          {
            session?.user ? 
            <div className='flex'>
              <Image src={session?.user!.image || '/assets/images/logo.svg'} alt='profile-photo' width={37} height={37} className='rounded-full' onClick={() => {setToggleDropdown((prev) => !prev)}}/>
              {toggleDropdown && 
              <div className='dropdown_custom'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => {setToggleDropdown(false)}}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => {setToggleDropdown(false)}}
                >
                  Create Prompt
                </Link>
                <button
                  className='mt-5 w-full black_btn'
                  onClick={() => {setToggleDropdown(false); signOut();}}
                >
                  Sign Out
                </button>
              </div>
              }
            </div> : 
            <>
              { <button type='button' key={'google'} onClick={() => signIn('google')} className='black_btn'> Sign In with google </button> }
            </>
          }
        </div>

      </nav>
    )
}
