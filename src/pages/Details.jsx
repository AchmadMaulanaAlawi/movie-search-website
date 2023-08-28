import React from "react"
import { useLoaderData, useNavigate } from "react-router-dom"

export default function Details() {
  const navigate = useNavigate()
  const media = useLoaderData()
  const {
    Error,
    Poster,
    Title,
    Rated,
    imdbRating,
    imdbVotes,
    Released,
    Director,
    Writer,
    Actors,
    Plot,
    Ratings,
  } = media
  const mediaIsError = Error
  const genresArray = media?.Genre?.match(/\w+-*\w*/gi)

  return (
    <div className="container relative mx-auto flex-grow min-h-max">
      {mediaIsError ? (
        <Error
          errorMsg={mediaIsError}
          className="mt-8"
        />
      ) : (
        <>
          <div className="details-img relative sm:flex sm:px-4 sm:pb-4 sm:pt-24">
            <div className="img-container w-full md:w-3/4">
              <img
                src={Poster}
                alt="Movie poster"
                className="w-full mx-auto"
              />
            </div>
            <div className="h-full w-full absolute media-img top-0 left-0 sm:invisible sm:z-[-999] "></div>
            <div className="text-on-img px-4 absolute sm:static sm:flex-grow bottom-0 pb-4">
              <div className="sm:px-4">
                <div className="title font-semibold mb-4 items-center title-text text-4xl sm:text-2xl md:text-4xl text-zinc-100">
                  {Title}
                  <span className="ms-4 bg-zinc-400 text-zinc-200 py-0.5 px-1.5 text-sm h-fit bg-opacity-25 rounded-md">
                    {Rated}
                  </span>
                </div>
                <div className="rating text-md flex gap-8 text-zinc-100">
                  <div className="imdb-rating flex gap-2 items-center">
                    <img
                      src="src/img/imdb.png"
                      alt="imdb-icon"
                    />
                    <div className="rating-value text-zinc-100">
                      {imdbRating}
                    </div>
                    <div className="votes text-zinc-400">({imdbVotes})</div>
                  </div>
                  {Ratings[1] && (
                    <div className="rt-rating flex gap-2 items-center">
                      <img
                        className="w-5"
                        src="src/img/rt.png"
                        alt="rt-icon"
                      />
                      <div className="rating-value text-zinc-100">
                        {Ratings[0].Value}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="details-text grid grid-cols-2 py-4 px-4 gap-4 sm:static absolute top-full left-0">
                <div className="genres mb-4 text-sm flex items-center gap-2 space-y-1 row-span-1 col-span-2">
                  {genresArray.map((genre, index) => {
                    return (
                      <div
                        key={index}
                        className="genre px-3 py-1.5 text-slate-100 rounded-full border bg-slate-900 border-slate-300"
                      >
                        {genre}
                      </div>
                    )
                  })}
                </div>
                <DetailsItem
                  text="Release Date"
                  value={Released}
                />
                <DetailsItem
                  text="Director"
                  value={Director}
                />
                <DetailsItem
                  text="Writer"
                  value={Writer}
                />
                <DetailsItem
                  text="Actor"
                  value={Actors}
                />
                <div className="space-y-1 col-span-2 my-4">
                  <div className="text text-zinc-200 font-semibold text-xl sm:text-2xl">
                    Plot
                  </div>
                  <div className="text-zinc-400 text-sm md:text-base">
                    {Plot}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute top-5 cursor-pointer sm:bg-transparent sm:hover:bg-transparent sm:text-zinc-100 sm:left-0 sm:top-4 hover:bg-zinc-300 transition-all left-5 back-button rounded-full text-zinc-900 p-3 bg-zinc-100 w-fit"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 stroke-2 m-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  )
}

function DetailsItem({ text, value }) {
  return (
    <div className="space-y-1">
      <div className="text text-zinc-400 text-sm sm:text-base">{text}</div>
      <div className="text-zinc-200 text-sm sm:text-base">{value}</div>
    </div>
  )
}

export async function detailsLoader({ params }) {
  const res = await fetch(
    `${import.meta.env.VITE_DETAILS_API_URL + params.imdbID}`
  )
    .then((response) => response.json())
    .catch((err) => err)
  return res.Response ? res : { Error: `${res}` }
}
