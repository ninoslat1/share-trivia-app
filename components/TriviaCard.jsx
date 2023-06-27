"use client"

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const TriviaCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const {data: session} = useSession()
  const pathName = usePathname()
  const router = useRouter()
  const [copied, setCopied] = useState("")

  const handleCopy = () => {
    setCopied(post.trivia);
    navigator.clipboard.writeText(post.trivia)
    setTimeout(() => setCopied(''), 3000)
  }

  const handleProfile = () => {
    if(post.creator._id === session?.user.id){
      return router.push("/profile")
    }
    else{
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
    }
  }

  return (
    <div className="trivia_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleProfile}>
          <Image src={post.creator.image} alt={`${post.creator.username} user image`} width={40} height={40} className='rounded-full object-contain'/>
          <div className="flex flex-col p-2.5">
            <h3 className="font-satoshi font-semibold text-slate-900">{post.creator.username}</h3>
            <p className="font-inter text-sm text-slate-500">{post.creator.email}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={(handleCopy)}>
          {copied === post.trivia ? 
          <svg xmlns="http://www.w3.org/2000/svg" fill='none' viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path className="text-teal-500" strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
           : 
            <svg xmlns="http://www.w3.org/2000/svg" fill='none' viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path className="text-lime-500" strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
          }
        </div>
      </div>

      <p className="my-5 font-satoshi text-sm text-slate-700">{post.trivia}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>#{post.tag}</p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="flex-center gap-4 border-t border-slate-100 my-2.5 py-5">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
          <p className="font-inter text-sm text-red-700 cursor-pointer" onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  )
}

export default TriviaCard