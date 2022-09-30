import Page from 'app/layouts/Page'
import { IPizza } from 'app/redux/slices/pizza/types'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React, { FC } from 'react'

type PizzaType = {
  pizza: IPizza
}

const FullPizza: FC<PizzaType> = ({ pizza }) => {
  return (
    <Page>
      <div className='container'>
        {pizza.imageUrl ? <Image src={pizza.imageUrl} alt={pizza.title} width={580} height={580} /> : ''}
        <h2>{pizza.title}</h2>
        <h4>{pizza.price > 0 ? pizza.price : 'Загрузка...'}</h4>
      </div>
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await axios.get(`https://62ee9ce0f5521ecad578b7b7.mockapi.io/items/${params?.id}`)
  const pizza = data

  return {
    props: {
      pizza
    },
    revalidate: 10
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get<IPizza[]>(`https://62ee9ce0f5521ecad578b7b7.mockapi.io/items`)

  const paths = data.map(item => ({
    params: {
      id: item.id
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export default FullPizza
