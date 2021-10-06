import React, { useContext, useEffect, useReducer } from "react"

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions"
import reducer from "./reducer"

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?"

const initialState = {
  isLoading: true,
  hits: [],
  query: "react js",
  page: 0,
  numPages: 0,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, numPages: data.nbPages },
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`)
  }, [state.query, state.page])

  const handleRemove = (id) => {
    dispatch({ type: REMOVE_STORY, payload: { id } })
  }

  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query, page: 0 })
  }

  const handlePage = (value) => {
    console.log(value)
    dispatch({ type: HANDLE_PAGE, payload: value })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleRemove,
        handleSearch,
        handlePage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
