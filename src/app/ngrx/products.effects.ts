import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import {
  GetAllProductsActionError,
  GetAllProductsActionSuccess,
  GetSelectedProductsActionSuccess,
  GetSelectedProductsActionError,
  ProductsActionsTypes,
} from './products.actions';

@Injectable()
export class ProductsEffect {
  constructor(
    private productService: ProductService,
    private effectActions: Actions
  ) {}

  getAllProductsEffect: Observable<Action> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_ALL_PRODUCTS),
      mergeMap((action) => {
        return this.productService.getProducts().pipe(
          map((products) => new GetAllProductsActionSuccess(products)),
          catchError((err) => of(new GetAllProductsActionError(err.message)))
        );
      })
    )
  );

  // Get Selected Products
  getSelectedProductsEffect: Observable<Action> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_SELECTED_PRODUCTS),
      mergeMap((action) => {
        return this.productService.getSelectedProducts().pipe(
          map((products) => new GetSelectedProductsActionSuccess(products)),
          catchError((err) =>
            of(new GetSelectedProductsActionError(err.message))
          )
        );
      })
    )
  );
}
