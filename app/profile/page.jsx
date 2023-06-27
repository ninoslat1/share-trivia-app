'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@/components/Profile"

const UserProfile = () => {
  const router = useRouter()
  const {data: session} = useSession()
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-trivia?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure to remove the trivia ?");
    if(hasConfirmed){
      try{
        await fetch(`/api/trivia/${post._id.toString()}`, {
          method: 'DELETE'
        })

        const filteredPosts = post.filter((item) => item._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Profile name='My' desc='Welcome to your personalized page' data={posts} handleEdit={handleEdit} handleDelete={handleDelete}/>
  )
}

export default UserProfile