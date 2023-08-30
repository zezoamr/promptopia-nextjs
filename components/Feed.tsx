"use client";

import { ChangeEvent, useEffect, useState } from "react";

import React from 'react'
import PromptCard from "./PromptCard";

function PromptCardList({data, handleTagClick} : {data: any, handleTagClick: CallableFunction}) {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post: any) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleDelete={()=>{}}
          handleEdit={()=>{}}
        />
      ))}
    </div>
  )
}

export default function Feed() {
  const [searchText, setSearchText] = useState<string>('')
  const [allPosts, setAllPosts] = useState([])

  const handleSearchChange = (e:  ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      //console.log('data' + JSON.stringify(data))

      setAllPosts(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search by prompt tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={allPosts}
          handleTagClick={() => {}}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={() => {}} />
      )}
      {/* searched Prompts section*/}

    </section>
  )
}
