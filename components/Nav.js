import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '../context/shopContext'
import MiniCart from '../components/MiniCart'

export default function Nav() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext)

  let cartQuantity = 0
  cart.map(item => {
    return (cartQuantity += item?.variantQuantity)
  })

  return (
    <header className="border-b sticky top-0 z-20 bg-white">
        <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 md:px-8 mx-auto lg:max-w-screen-xl">
            <Link href="/" passHref>
                <a className="cursor-pointer">
                    <span className="text-lg pt-1 font-bold">Shopify Next.js</span>
                </a>
            </Link>
            <button 
              className="relative mr-6 text-md font-bold cursor-pointer group"
              onClick={() => setCartOpen(!cartOpen)}
              >
              Cart
              <span className="absolute top-0 left-9 text-xs font-light text-white bg-red-700 py-3 px-3 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="absolute transform translate-y-[-50%] translate-x-[-50%]">{cartQuantity}</span>
              </span>
            </button>
            <MiniCart cart={cart} />
        </div>
    </header>
  )
}
