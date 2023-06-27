'use client'

import {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@/components/Form'

const CreateTrivia = () => {
  const router = useRouter()
  const {data: session} = useSession()
  const [submit, setSubmit] = useState(false)
  const [post, setPost] = useState({
    trivia:'',
    tag:'',
  })

  const createTrivia = async (e) => {
    e.preventDefault()
    setSubmit(true)

    try{
      const response = await fetch('/api/trivia/new', {
        method: 'POST',
        body: JSON.stringify({
          trivia: post.trivia,
          userId: session?.user.id,
          tag: post.tag,
        })
      })

      if(response.ok) {
        router.push('/')
      }

    }catch(err){
      console.log(err)
    }

    finally {
      setSubmit(false)
    }
  }

  return (
    <Form type="Create" post={post} setPost={setPost} submit={submit} handleSubmit={createTrivia}/>
  )
}

export default CreateTrivia