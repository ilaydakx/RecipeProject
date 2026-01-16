import React, { useState } from 'react'
import './App.css'
import PageContainer from './container/PageContainer'
import RouterConfig from './config/RouterConfig'
function App(){
  return(
    <div>
      <PageContainer>
        <RouterConfig/>                   
      </PageContainer>

    </div>
  )
}
export default App;
