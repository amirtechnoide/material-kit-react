import React from 'react'
import { useParams } from 'react-router-dom'

const BlogPostDetail = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <div>BlogPostDetail</div>
  )
}

export default BlogPostDetail