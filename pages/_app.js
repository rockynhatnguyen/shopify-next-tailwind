import 'tailwindcss/tailwind.css'
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/navigation'
import styles from '../styles/animations.scss'
import Layout from '../components/Layout'
import ShopProvider from '../context/shopContext'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ShopProvider>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </ShopProvider>
  )
}

export default MyApp
