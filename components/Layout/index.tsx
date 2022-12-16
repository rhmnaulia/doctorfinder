import Head from 'next/head'
import React from 'react'

interface ILayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Doctor Finder</title>
        <meta
          name='description'
          content='This page created for case study assignment in AlteaCare'
        />
      </Head>
      <main>
        <div
          data-theme='light'
          className='min-h-screen py-8  flex flex-col items-center'
        >
          {children}
        </div>
      </main>
    </>
  )
}

export default Layout
