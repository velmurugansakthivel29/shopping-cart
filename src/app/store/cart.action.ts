import { createAction, props, Action } from '@ngrx/store';
import { IProduct } from '../shared/model/product.interface';


export const ADD_TO_CART = '[Add Cart] Add to cart';
export const LOAD_PRODUCTS = '[Load Product] Load Product';
export const LOAD_PRODUCTS_SUCCESS = '[Load Product] Load Product Success';
export const LOAD_PRODUCTS_ERROR = '[Load Product] Load Product Error';
export const REMOVE_PRODUCT = '[Remove Product] Remove Product';
export const SEARCH_PRODUCT = '[Search Product] Search Product';


export class LoadProduct implements Action {
    readonly type = LOAD_PRODUCTS;
}
export class LoadProductSuccess implements Action {
    readonly type = LOAD_PRODUCTS_SUCCESS;
    constructor(public payload: IProduct[]) { }
}
export class LoadProductError implements Action {
    readonly type = LOAD_PRODUCTS_ERROR;
    constructor(public payload: string) { }
}
export class AddToCart implements Action {
    readonly type = ADD_TO_CART;
    constructor(public payload: IProduct) { }
}
export class RemoveProduct implements Action {
    readonly type = REMOVE_PRODUCT;
    constructor(public payload: number) { }
}
export class SearchProduct implements Action {
    readonly type = SEARCH_PRODUCT;
    constructor(public payload: string) { }
}

export type cartActions = AddToCart | LoadProduct | LoadProductSuccess | LoadProductError | RemoveProduct | SearchProduct;
