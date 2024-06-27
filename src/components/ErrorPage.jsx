import { Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
  <Typography.Title>
    Oops! Something went wrong. Try after sometime.
    <Link href="/">Home</Link>
  </Typography.Title>
  )
}

export default ErrorPage
