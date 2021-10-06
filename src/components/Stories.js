import React from "react"

import { useGlobalContext } from "../utils/context"

const Stories = () => {
  const { isLoading, hits, handleRemove } = useGlobalContext()

  if (isLoading) {
    return <div className="loading"></div>
  }

  return (
    <section className="stories">
      {hits.map((story) => {
        const {
          objectID: id,
          title,
          num_comments: comments,
          url,
          points,
          author,
        } = story
        return (
          <article key={id} className="story">
            <h4 className="title">{title}</h4>
            <p className="info">
              {points} points by <span>{author} | </span> {comments} comments
            </p>
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={url}
                className="read-link"
              >
                Read More
              </a>
              <button
                onClick={() => {
                  handleRemove(id)
                }}
                className="remove-btn"
              >
                Not Interested
              </button>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default Stories
