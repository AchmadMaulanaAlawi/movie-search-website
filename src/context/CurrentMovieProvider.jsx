import React, { createContext, useState } from "react"

const CurrentResponseContext = createContext({})

export function CurrentMovieProvider({ children }) {
  const [currentResponse, setCurrentResponse] = useState([])
  const [currentSearched, setCurrentSearched] = useState("")

  return (
    <CurrentResponseContext.Provider
      value={[
        currentResponse,
        setCurrentResponse,
        currentSearched,
        setCurrentSearched,
      ]}
    >
      {children}
    </CurrentResponseContext.Provider>
  )
}

export default CurrentResponseContext
