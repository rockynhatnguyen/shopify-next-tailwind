import Link from 'next/link'

export default function Hero() {
  return (
    <div className="my-48 mx-auto max-w-7xl px-4 sm:mt-24 md:mt-72 text-center">
        <h1 className="font-extrabold text-gray-900">
            <p className="text-xl sm:text-3xl md:text-4xl">Shopify + Next.js + Tailwind CSS</p>
            <p className="mt-4 text-transparent text-4xl sm:text-6xl md:text-7xl animated-hue">Modern eCommerce</p>
        </h1>
        <h2 className="mt-3 max-w-md mx-auto text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-x-3xl">
            Build the eCommerce of Revolution.
        </h2>
        <div className="mt-5 max-w-md mx-auto flex justify-center items-center md:mt-8">
            <Link href="#">
                <a className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium py-3 border-transparent rounded-md text-white bg-gray-900 hover:bg-gray-700 duration-300">Shop Now</a>
            </Link>
            <Link href="#">
                <a className="inline-flex items-center justify-center h-12 font-semibold py-3 text-gray-900 hover:text-gray-700 duration-300">Learn more</a>
            </Link>
        </div>
    </div>
  )
}
