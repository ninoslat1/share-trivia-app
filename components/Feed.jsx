'use client'

import { useState, useEffect } from "react"
import TriviaCard from "./TriviaCard"
import useFetch from "@/hooks/useFetch"

const TriviaCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 trivia_layout'>
      {data.map((post) => (
        <TriviaCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [searchTimer, setSearchTimer] = useState(null)
  const [searchedResult, setSearchedResult] = useState([])

  const filterTrivias = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.trivia)
    );
  };

  const handleSearch = (e) => {
    clearTimeout(searchTimer)
    setSearchText(e.target.value);

    setSearchTimer(
      setTimeout(() => {
        const searchResult = filterTrivias(e.target.value)
        setSearchedResult(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const searchResult = filterTrivias(tagName);
    setSearchedResult(searchResult)
  }

  const posts = useFetch('/api/trivia')

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search trivia from tag or username" value={searchText} onChange={handleSearch} required className="search_input peer"/>
      </form>
      {searchText ? (
        <TriviaCardList data={searchedResult} handleTagClick={handleTagClick}/>
      ) : (
        <TriviaCardList data={posts} handleTagClick={handleTagClick}/>
      )}
    </section>
  )
}

export default Feed