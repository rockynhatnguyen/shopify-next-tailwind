import { useState, useContext, useEffect } from 'react'
import formatter from '../utils/helpers'
import ProductOptions from '../components/ProductOptions'
import { CartContext } from '../context/shopContext'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url, id) => (
    axios.get(url, {
        params: {
            id: id
        }
    }).then((res) => res.data)
)

export default function ProductForm({ product }) {
    const { data: productInventory } = useSWR(
        ['/api/available', product.handle],
        (url, id) => fetcher(url, id),
        { errorRetryCount: 3 }
    )

    const [available, setAvailable] = useState(true)

    const { addToCart } = useContext(CartContext)

    const allVariantOptions = product.variants.edges?.map(variant => {
        const allOptions = {};

        variant.node.selectedOptions.map(item => {
            allOptions[item.name] = item.value;
        })

        return {
            id: variant.node.id,
            title: product.title,
            handle: product.handle,
            image: variant.node.image?.url,
            options: allOptions,
            variantTitle: variant.node.title,
            variantPrice: variant.node.priceV2.amount,
            variantQuantity: 1
        }
    })

    const defaultValues = {}
    product.options.map(item => {
        defaultValues[item.name] = item.values[0]
    })

    const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
    const [selectedOptions, setSelectedOptions] = useState(defaultValues)

    function setOptions(name, value) {
        setSelectedOptions(prevState => {
            return { ...prevState, [name]: value }
        })

        const selection = {
            ...selectedOptions,
            [name]: value
        }

        allVariantOptions.map(item => {
            if (JSON.stringify(item.options) === JSON.stringify(selection)) {
                setSelectedVariant(item)
            }
        })
    }

    useEffect(() => {
        if (productInventory) {
            const checkAvailable = productInventory?.variants.edges.filter(item => item.node.id === selectedVariant.id)

            if (checkAvailable[0].node.availableForSale) {
                setAvailable(true)
            } else {
                setAvailable(false)
            }
        }
    }, [productInventory, selectedVariant]);

    return (
        <div className="w-full md:1/3 flex flex-col rounded-2xl p-4 shadow-lg">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <span className="pb-3">{formatter.format(product.variants.edges[0].node.priceV2.amount)}</span>
            {
                product.options.map(({ name, values}) => (
                    <ProductOptions 
                        key={`key-${name}`}
                        name={name}
                        values={values}
                        selectedOptions={selectedOptions}
                        setOptions={setOptions}
                    />
                ))
            }
            {
                available ? 
                <button 
                onClick={() => {
                    addToCart(selectedVariant)
                }}
                className="bg-black rounded-lg text-white mt-3 px-2 py-3 hover:bg-gray-800">
                    Add To Cart
                </button>
                :
                <button disabled
                className="bg-gray-500 rounded-lg text-white mt-3 px-2 py-3 cursor-not-allowed">
                    Out of Stock
                </button>
            }
        </div>
    )
}
