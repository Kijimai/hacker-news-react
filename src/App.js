//Create an app that uses the hacker news API to display all news that contain the query's keyword(s)
//Server side pagination
//each story box should link to the original story
//use useReducer with contextAPI

import React from "react"
import SearchForm from "./components/SearchForm"
import Stories from "./components/Stories"
import Buttons from "./components/Buttons"
function App() {
  return (
    <>
      <SearchForm />
      <Buttons />
      <Stories />
    </>
  )
}

export default App
