import clsx from "clsx"
import React, { useEffect, useRef } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MovieDisplay from "../components/MovieDisplay.jsx"
import Error from "../components/Error.jsx"
import { request } from "../functions/request.js"

export default function Home() {
  const [onSearchMode, setOnSearchMode] = useState(false)
  const defaultMovie = "Spider-Man"
  const [inputValue, setInputValue] = useState(`${defaultMovie}`)
  const inputElement = useRef()
  const [currentResponse, setCurrentResponse] = useState({})
  const currentSearched = useRef()
  const navigate = useNavigate()
  const mediaDataError = currentResponse.Error
  const mediaData = currentResponse.Search || []

  function searchHandler(event) {
    event.preventDefault()
    searchButtonHandler()
  }

  async function searchButtonHandler() {
    navigate("/")
    if (inputValue.length) {
      const onSmallScreen = window.matchMedia("(max-width: 768px)").matches
      if (onSmallScreen) {
        setOnSearchMode(!onSearchMode)
        if (!onSearchMode) {
          setTimeout(() => {
            inputElement.current.focus()
          }, 400)
        }
      }
      const trimmedInputValue = inputValue.trim()
      const res = await request(trimmedInputValue)
      setInputValue(trimmedInputValue)
      setCurrentResponse(res)
      currentSearched.current = trimmedInputValue
      inputElement.current.blur()
    }
  }

  useEffect(() => {
    async function requestDefault() {
      const defaultResponse = await request(inputValue)
      setCurrentResponse(defaultResponse)
    }
    requestDefault()
  }, [])

  return (
    <>
      <header>
        <div className="relative container mx-auto md:py-6 px-6 lg:px-24">
          <div className="relative z-20 mobile-navbar flex min-h-[15vh] justify-between items-center">
            <div
              className={clsx(
                "absolute brand me-8 flex flex-col gap-2 transition-all",
                {
                  "-translate-x-[100vw]": onSearchMode,
                }
              )}
            >
              <span className="text-4xl font-bold uppercase text-zinc-100 ">
                Hello,
              </span>
              <span className="text-md  text-zinc-400">
                What do you want to watch today?
              </span>
            </div>
            <form
              onSubmit={(event) => searchHandler(event)}
              className={clsx(
                "search-bar w-full md:flex-row-reverse md:w-fit md:ms-auto p-2 text-black h-fit gap-2 flex justify-between rounded-full transition-all duration-500",
                {
                  "translate-x-[100vw] md:translate-x-0": !onSearchMode,
                }
              )}
            >
              <button
                type="button"
                onClick={() => searchButtonHandler()}
                className={clsx(
                  "search-bar-button p-2 text-black bg-zinc-100 hover:bg-zinc-300 md:duration-200 h-fit flex justify-between rounded-full transition-all duration-500",
                  {
                    "translate-x-[-27vw] xxs:translate-x-[-30vw] sm:translate-x-[-28vw] md:translate-x-0":
                      !onSearchMode,
                  }
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
              <input
                ref={inputElement}
                type="text"
                name="search-movie-input"
                id="search-movie-input"
                className="rounded-full px-4 text-lg w-full bg-zinc-100"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
              <button
                type="button"
                onClick={() => setOnSearchMode(false)}
                className="p-2 text-gray-100 bg-red-600 h-fit flex justify-between rounded-full md:absolute md:invisible"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col">
        <div
          className={clsx(
            "container mx-auto px-6 lg:px-24 transition-all flex flex-col flex-grow",
            {
              "-translate-x-[100vw]": onSearchMode,
            }
          )}
        >
          {currentSearched.current && (
            <div className="mb-6">
              <div className="results-for text-zinc-400">Results for</div>
              <div className="current-searched text-zinc-100 text-3xl">
                {currentSearched.current.charAt(0).toUpperCase() +
                  currentSearched.current.slice(1)}
              </div>
            </div>
          )}
          {mediaDataError && <Error errorMsg={mediaDataError} />}
          <MovieDisplay mediaData={mediaData} />
        </div>
      </main>
      <footer className="mt-auto">
        <div className="container mx-auto py-4">
          <div className="footer-text text-zinc-400 w-fit mx-auto flex gap-1 items-center text-sm md:text-base">
            Made with
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 fill-red-500 stroke-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            by Alawi.
          </div>
        </div>
      </footer>
    </>
  )
}
