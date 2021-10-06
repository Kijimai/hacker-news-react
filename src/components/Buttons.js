import React from "react"
import { useGlobalContext } from "../utils/context"

const Buttons = () => {
  const { isLoading, page, numPages, handlePage } = useGlobalContext()
  return (
    <div className="btn-container">
      <button disabled={isLoading} onClick={() => handlePage("prev")}>
        Prev
      </button>
      <p>
        {page + 1} of {numPages}
      </p>
      <button disabled={isLoading} onClick={() => handlePage("next")}>
        Next
      </button>
    </div>
  )
}

export default Buttons
