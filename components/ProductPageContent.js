import Image from 'next/image'
import ProductForm from './ProductForm'
import RecommendedList from './RecommendedList'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'

export default function ProductPageContent({ product }) {
  const images = []

  product.images.edges.map((image, i) => {
    images.push(
      <SwiperSlide key={`slide-${i}`}>
        <Image src={image.node.url} alt={image.node.altText} layout="fill" objectFit="cover" />
      </SwiperSlide>
    )
  })

  return (
    <div>
      <div className="max-w-6xl w-11/12 mx-auto flex flex-col justify-center items-center space-y-8 lg:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8">
          <div className="lg:max-w-md w-full border bg-white rounded-2xl overflow-hidden shadow-lg lg:w-1/2">
            <div className="w-full h-96 relative">
              <Swiper
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000', '--swiper-navigation-size': '25px' }}
                className="h-96 rounded-xl"
                modules={[Pagination, Navigation]}
              >
                {images}
              </Swiper>
            </div>
          </div>
          <ProductForm product={product} />
      </div>
      <div className="pt-16 space-y-8 md:space-x-4 lg:space-x-8 max-w-3xl w-11/12 mx-auto" dangerouslySetInnerHTML={{ __html: product.description}} />
      <RecommendedList current={product.id} products={product.collections.edges[0] ? product.collections.edges[0].node.products.edges : []} />
    </div>
  )
}