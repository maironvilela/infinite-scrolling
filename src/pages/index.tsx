import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GetStaticProps } from 'next';

import { api } from '../services/api'
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { ScrollInfinit } from '../components/ScrollInfinit'

import styles from './index.module.scss';


type Product = {
  id: string;
  description: string;
  price: string;
  img: string;
}

type HomeProps = {
  products: Product[];
  quantityOfProducts: number;
  limit: number,
  page: number,
}

export default function Home({ products, quantityOfProducts, ...props }: HomeProps) {

  const [productList, setProductList] = useState<Product[]>(products)
  const [page, setPage] = useState(props.page)
  const [productsPerPage, setProdutoPerPage] = useState(props.limit)
  const [loading, setLoading] = useState(false)


  const updatePage = async () => {

    if (page >= totalPage) {
      return;
    }
    setLoading(true)
    const nextPage = page + 1;
    console.log(`nextPage: ${nextPage} `)
    console.log(`productsPerPage: ${productsPerPage}`)

    const response = await api.get("products", {
      params: {
        _page: nextPage,
        _limit: productsPerPage,
        _sort: 'published_at',
        _order: 'desc',
      }
    });
    setProductList([...productList, ...response.data])
    console.log(`Setando nova pagina...${nextPage}`)
    setPage(page + 1)
    setLoading(false)
  }

  const totalPage = useMemo(() => {
    return Math.ceil(quantityOfProducts / productsPerPage)
  }, [])

  return (

    <div className={styles.container}>

      <Header />

      <div className={styles.container_card}>

        {productList.map(product => (
          <Card product={product} key={Math.random() * 100} />
        ))}

        {loading && <img src=
          "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
          width={50} />}

        {!loading && (page < totalPage) && <ScrollInfinit updatePage={updatePage} />}

      </div>

    </div >
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get("products", {
    params: {
      _limit: 1,
      _page: 1,
      _sort: 'published_at',
      _order: 'desc',
    }
  });

  const quantityOfProducts = response.headers['x-total-count']
    && Number.parseInt(response.headers['x-total-count'], 10)

  return {
    props: {
      products: response.data,
      quantityOfProducts,
      limit: 1,
      page: 1,
    },
    revalidate: 60,
  }
}


