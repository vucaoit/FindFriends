
export type UsedProductStatus = 'Used' | 'New'

export interface ProductModel {
    id: number
    name: string
    user_id: number
    category_id: number
    base_price: number
    thumbnail_link: number
    details: string
    stock: number
    shipping_fee: number
    status: UsedProductStatus
    discount?: number
    optional_price?: OptionalProductPrice
}

export interface OptionalProductPrice {
    title: string
    value: {
        name: string
        price: number
    }[]
}
