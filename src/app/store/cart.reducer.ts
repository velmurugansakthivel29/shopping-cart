import { IProduct } from '../shared/model/product.interface';
import * as cartActions from './cart.action';

export interface CartState {
    product: IProduct[];
    cartList: IProduct[];
    queryText: string;
}

export const initialState: CartState = {
    product: [],
    cartList: [],
    queryText: null
};

export function cartReducer(state = initialState, action: cartActions.cartActions): CartState {
    switch (action.type) {
        case cartActions.LOAD_PRODUCTS_SUCCESS: {
            if (!state.product.length) {
                return { ...state, product: [...state.product, ...action.payload] };
            } else {
                return state;
            }
        }
        case cartActions.ADD_TO_CART: {
            state.product.filter(product => {
                if (product.id === action.payload.id) {
                    product.isAdded = true;
                }
            });
            return { ...state, cartList: [...state.cartList, action.payload] };
        }
        case cartActions.REMOVE_PRODUCT: {
            state.product.filter(product => {
                if (product.id === action.payload) {
                    product.isAdded = false;
                }
            });
            return { ...state, cartList: state.cartList.filter(product => product.id !== action.payload) };
        }
        case cartActions.SEARCH_PRODUCT: {
            return { ...state, queryText: action.payload };
        }
        default: {
            return state;
        }
    }
}

