
export interface IProduct {
    id: number;
    name: string;
    price: number;
    discount: number;
    category: string;
    img_url: string;
    originalPrice: number;
    selectedNo?: number;
    isAdded?: boolean;
}
export interface IFilter {
    min: number;
    max: number;
}
