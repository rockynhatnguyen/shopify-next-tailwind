export default async function available(req, res) {
  const { query: { id } } = req

  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

  async function ShopifyData(query) {
    const URL = `https://${domain}/api/2022-04/graphql.json`

    const options = {
        endpoint: URL,
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query })
    }

    try {
        const data = await fetch(URL, options).then(res => {
            return res.json()
        })

        return data
    } catch (err) {
        throw new Error('Product not fetched');
    }
  }

  async function getAvailableStatusProductVariants(handle) {
    const query = `
      {
        product(handle: "${handle}") {
          id
          variants(first: 25) {
            edges {
              node {
                id
                availableForSale
              }
            }
          }
        }
      }
    `

    const response = await ShopifyData(query);

    const product = response.data.product ? response.data.product : []

    return product;
  }

  const products = await getAvailableStatusProductVariants(id);

  res.status(200);
  res.json(products);
}
