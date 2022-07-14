import Head from 'next/head'
import React, { PropsWithChildren } from 'react'

export const CommonHead: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <title>PaperStock</title>
      <meta name="description" content="Wiki" />
      {children}
    </Head>
  )
}
