import React from 'react'
import { Container } from '@mui/material'

function PageContainer({children}) {
  return (
    <Container>{children}</Container>
  )
}

export default PageContainer