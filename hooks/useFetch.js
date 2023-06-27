import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
        const response = await fetch(url)
        const data = await response.json()

        setPosts(data)
        }

        fetchPosts()
    },[])

    return posts
}

export default useFetch