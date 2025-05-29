import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

const Main = styled.main`
  flex: 1;
  padding: 6rem 0; /* Increased padding from 4rem to 6rem */
  background-color: var(--background);
`

function Layout() {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <div className="container">
          <Outlet />
        </div>
      </Main>
      <Footer />
    </LayoutContainer>
  )
}

export default Layout
