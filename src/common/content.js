import React from 'react'
import content from '../css/module/content.module.css'

const Content = ({children}) => {
  return (
    <div className={content.content}>{children}</div>
  )
}

export default Content