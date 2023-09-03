"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";

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
  const [searchedPosts, setSearchedPosts] = useState([])

  const handleSearchChange = (e:  ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchText(e.target.value)
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSearchedPosts = useCallback(async (arg: any, addsearchtexttoform: boolean) => {
    try {
      if (addsearchtexttoform) {
        setSearchText(arg)
      }
      const response = await fetch("/api/prompt/search/" + arg);
      const data = await response.json();
      setSearchedPosts(data);
      //console.log("searchedposts" + JSON.stringify(searchedPosts))
    } catch (error) {
      console.log(error)
    }
  }, [searchText])

  useEffect(() => {
    setSearchText('')
  }, [])

  
  useEffect(() => {
    if(searchText.trim() === "") {
      fetchPosts()
    } else{
      fetchSearchedPosts(searchText, false)
    }
  }, [fetchSearchedPosts, searchText])

  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={(e) => e.preventDefault()}>
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
      {searchText.trim() === '' ? (
        <PromptCardList
          data={allPosts}
          handleTagClick={fetchSearchedPosts}
        />
      ) : (
        <PromptCardList data={searchedPosts} handleTagClick={fetchSearchedPosts} />
      )}
      {/* searched Prompts section*/}

    </section>
  )
}
