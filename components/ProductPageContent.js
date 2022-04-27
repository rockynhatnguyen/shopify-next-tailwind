import Image from 'next/image'
import ProductForm from './ProductForm'

export default function ProductPageContent({ product }) {
  return (
    <div className="max-w-6xl w-11/12 mx-auto flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8">
        <div className="max-w-md w-full border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
          <div className="w-full h-96 relative">
            <Image src={product.images.edges[0].node.url} alt={product.images.edges[0].node.altText} layout="fill" objectFit="cover" />
          </div>
        </div>
        <ProductForm product={product} />
    </div>
  )
}
