import type { NextPage } from 'next'
import Head from 'next/head'

interface IMetaProps {
  title: string
  description: string
}

const Meta: NextPage<IMetaProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Head>
  )
}

export default Meta
