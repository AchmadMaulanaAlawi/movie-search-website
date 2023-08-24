import { useState } from "react"
import { useNavigate } from "react-router"
import ReactPaginate from "react-paginate"
import clsx from "clsx"

export default function MovieDisplay({ mediaData }) {
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [filtered, setFiltered] = useState(false)
  const [yearsDropdown, setYearsDrodown] = useState(false)
  const [typesDropdown, setTypesDrodown] = useState(false)
  const years = []
  const types = []

  let filteredItems = mediaData

  if (filtered) {
    if (selectedYear !== "") {
      filteredItems = filteredItems.filter((item) => item.Year === selectedYear)
    }

    if (selectedType !== "") {
      filteredItems = filteredItems.filter((item) => item.Type === selectedType)
    }
  }

  // Pagination
  const itemsPerPage = 8
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + itemsPerPage
  const currentItems = filteredItems.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage)
  const handlePageClick = (event = { selected: 0 }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredItems.length

    setItemOffset(newOffset)
  }

  mediaData.forEach((i) => {
    !years.includes(i.Year) && years.push(i.Year)
    !types.includes(i.Type) && types.push(i.Type)
  })

  function filterHandler(filterName, filterValue) {
    if (filterValue !== "all") {
      if (filterName === "year") {
        setSelectedYear(filterValue)
      } else if (filterName === "type") {
        setSelectedType(filterValue)
      }
      setFiltered(true)
    }
    if (filterValue === "all") {
      if (filterName === "year") {
        setSelectedYear("")
      } else if (filterName === "type") {
        setSelectedType("")
      }
      if (!selectedType.length && !selectedYear.length) {
        setFiltered(false)
      }
    }
    handlePageClick()
  }

  function dropdownHandler(id) {
    if (id === "year") {
      if (typesDropdown) {
        setTypesDrodown(false)
      }
      setYearsDrodown(!yearsDropdown)
    }
    if (id === "type") {
      if (yearsDropdown) {
        setYearsDrodown(false)
      }
      setTypesDrodown(!typesDropdown)
    }
  }

  return (
    <div className="movies-display flex-grow flex flex-col">
      <div className="filter flex text-zinc-100 gap-4 md:mb-8 mb-4 items-center text-sm md:text-base">
        <div className="font-semibold">Filter:</div>
        <div className="filter-item group">
          <button
            className="filter-text"
            onClick={() => dropdownHandler("year")}
          >
            <span>
              {selectedYear.length > 0 && selectedYear !== "all"
                ? selectedYear
                : "Year"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 stroke-zinc-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          <div
            className={clsx(
              "filter-dropdown group-hover:z-[999] pt-2 group-hover:visible absolute top-full min-w-[150px] left-0",
              {
                "visible z-[999]": yearsDropdown,
                "invisible z-[-999]": !yearsDropdown,
              }
            )}
          >
            <div className="items py-2 rounded-lg bg-zinc-100 text-zinc-900">
              <div
                className="dropdown-item py-2 px-4 hover:bg-zinc-200"
                onClick={() => filterHandler("year", "all")}
              >
                All
              </div>
              {mediaData &&
                years
                  .sort((a, b) => b - a)
                  .map((year, index) => {
                    return (
                      <div
                        key={index}
                        className="dropdown-item py-2 px-4 hover:bg-zinc-200"
                        onClick={() => filterHandler("year", year)}
                      >
                        {year}
                      </div>
                    )
                  })}
            </div>
          </div>
        </div>
        <div className="filter-item group">
          <button
            className="filter-text"
            onClick={() => dropdownHandler("type")}
          >
            <span>
              {selectedType.length > 0 && selectedType !== "all"
                ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1)
                : "Type"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 stroke-zinc-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          <div
            className={clsx(
              "filter-dropdown group-hover:z-[999] pt-2 group-hover:visible  absolute top-full min-w-[150px] left-0",
              {
                "visible z-[999]": typesDropdown,
                "invisible z-[-999]": !typesDropdown,
              }
            )}
          >
            <div className="items py-2 rounded-lg bg-zinc-100 text-zinc-900">
              <div
                className="dropdown-item py-2 px-4 hover:bg-zinc-200"
                onClick={() => filterHandler("type", "all")}
              >
                All
              </div>
              {mediaData &&
                types.map((type, index) => {
                  return (
                    <div
                      key={index}
                      className="dropdown-item py-2 px-4 hover:bg-zinc-200"
                      onClick={() => filterHandler("type", type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="cards justify-center mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaData &&
          currentItems.map((m) => {
            return (
              <Card
                key={m.imdbID}
                imdbID={m.imdbID}
                posterUrl={m.Poster}
                title={m.Title}
                year={m.Year}
                type={m.Type}
              />
            )
          })}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        }
        onPageChange={(e) => handlePageClick(e, endOffset)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        }
        renderOnZeroPageCount={null}
        containerClassName="flex space-x-2 mt-auto text-base h-fit mb-0 md:mb-8  mx-auto rounded-full p-1.5 items-center bg-slate-900 w-fit font-semibold text-sm"
        nextLinkClassName="page-button"
        previousLinkClassName="page-button"
        activeLinkClassName="active-page-button"
        breakLinkClassName="page-button"
        pageLinkClassName="page-button"
      />
    </div>
  )
}

export function Card({ imdbID, posterUrl, title, year, type }) {
  const navigate = useNavigate()
  return (
    <div
      className="card cursor-pointer group hover:scale-105 transition-all ease-linear"
      onClick={() => navigate(`${imdbID}`)}
    >
      <div className="relative card-body h-full grid grid-cols-1 overflow-hidden rounded-xl bg-zinc-700">
        <div className="card-image">
          <img
            src={posterUrl}
            alt="Poster"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="desktop-see-more-button absolute top-2 right-2 overflow-hidden">
          <button className="text-zinc-50 -translate-x-full md:group-hover:translate-x-0 translate-y-full md:group-hover:translate-y-0 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 stroke-[3]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </button>
        </div>
        <div className="card-text pb-3 pt-2 md:pt-3 px-2 md:px-4 flex flex-col gap-4 absolute z-10 bottom-0 w-full backdrop-blur-xl backdrop-brightness-75">
          <div className="card-details flex flex-col md:gap-1.5">
            <div className="head-details flex gap-2">
              <div className="title flex-grow text-slate-100 font-bold text-sm md:text-base whitespace-nowrap truncate md:group-hover:whitespace-normal">
                {title}
              </div>
              <div className="mobile-see-more-button md:absolute md:invisible">
                <button className="text-zinc-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="subhead-details flex gap-2 text-xs md:text-sm text-slate-300">
              <p>{year}</p>
              <span>|</span>
              <p>{`${type.charAt(0).toUpperCase() + type.slice(1)}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
