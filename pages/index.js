import Head from 'next/head'
import { getProductsInCollection } from '../lib/shopify'
import Hero from '../components/Hero'
import ProductList from '../components/ProductList'

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Modern eCommerce Shopify + Next.js</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
        <meta name="description" content="Modern eCommerce Shopify Store with Next.js and Tailwind CSS. Uses GraphQL to query product data. Features include Shopify Storefront API, Static Site Generation, and more." />
        <meta property="og:title" content="Modern eCommerce Shopify + Next.js" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rockynguyen.com" />
        <meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" /><meta property="og:description" 
  content="Modern eCommerce Shopify Store with Next.js and Tailwind CSS. Uses GraphQL to query product data. Features include Shopify Storefront API, Static Site Generation, and more." />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Modern eCommerce Shopify + Next.js" />
      </Head>
      <Hero />
      <ProductList products={products} />
    </>
  )
}

export async function getStaticProps() {
  const products = await getProductsInCollection();

  return {
    props: { products }, // will be passed to the page component as props
  }
}