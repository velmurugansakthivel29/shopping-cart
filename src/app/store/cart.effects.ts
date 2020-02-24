import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { IProduct } from '../shared/model/product.interface';
import { ProductService } from '../shared/service/product.service';
import * as actions from './cart.action';

@Injectable()
export class CartEffects {

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.LOAD_PRODUCTS),
            mergeMap(() => this.productService.getProducts()
                .pipe(
                    map(movies => ({ type: actions.LOAD_PRODUCTS_SUCCESS, payload: movies })),
                    catchError(() => of({ type: actions.LOAD_PRODUCTS_ERROR }))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}
