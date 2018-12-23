import React from "react"

export default ({ url, title, name, type, children }) => {
  if (url) return (
    <p class={type.toLowerCase() + ' sourcelink'}>
      <a href={url}>{type}: {title || name}</a>
    </p>
  )
  else return (<span />)
}
