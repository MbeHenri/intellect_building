
export type TypeProduct = "training";

export interface ProductSimple {
    uuid: string,
    img: string,
    name: string,
    quantity?: number,
    price: number,
    type?: TypeProduct,
}

interface Product {
    uuid: string,
    img: string,
    name: string,
    quantity?: number,
    price: number,
    description: string,
    summary: string,
    infos: string,
    type?: TypeProduct,
}

export default Product