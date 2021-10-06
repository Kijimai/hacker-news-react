import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions"

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true }
    case SET_STORIES:
      const { hits, numPages } = action.payload
      return {
        ...state,
        isLoading: false,
        hits: hits,
        numPages: numPages,
      }
    case REMOVE_STORY:
      const { id } = action.payload
      const stories = state.hits
      const filteredStories = stories.filter((story) => story.objectID !== id)
      return { ...state, hits: filteredStories }
    case HANDLE_SEARCH:
      return { ...state, query: action.payload }
    case HANDLE_PAGE:
      if (action.payload === "next") {
        let nextPage = state.page + 1
        if (nextPage > state.numPages - 1) {
          nextPage = 0
        }
        return { ...state, page: nextPage }
      }
      if (action.payload === "prev") {
        let prevPage = state.page - 1
        if (prevPage < 0) {
          prevPage = state.numPages - 1
        }
        return { ...state, page: prevPage }
      }
      break
    default:
      throw new Error(`no matching "${action.type}" action`)
  }
}
export default reducer
