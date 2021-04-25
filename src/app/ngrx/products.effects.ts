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
  ProductsActions,
  SearchProductsActionSuccess,
  SearchProductsActionError,
  SelectProductActionSuccess,
  SelectProductActionError,
} from './products.actions';

@Injectable()
export class ProductsEffect {
  constructor(
    private productService: ProductService,
    private effectActions: Actions
  ) {}

  getAllProductsEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_ALL_PRODUCTS),
      mergeMap((action: ProductsActions) => {
        return this.productService.getProducts().pipe(
          map((products) => new GetAllProductsActionSuccess(products)),
          catchError((err) => of(new GetAllProductsActionError(err.message)))
        );
      })
    )
  );

  // Get Selected Products
  getSelectedProductsEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_SELECTED_PRODUCTS),
      mergeMap((action: ProductsActions) => {
        return this.productService.getSelectedProducts().pipe(
          map((products) => new GetSelectedProductsActionSuccess(products)),
          catchError((err) =>
            of(new GetSelectedProductsActionError(err.message))
          )
        );
      })
    )
  );

  // Search Products
  searchProductsEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductsActionsTypes.SEARCH_PRODUCTS),
      mergeMap((action: ProductsActions) => {
        return this.productService.searchProducts(action.payload).pipe(
          map((products) => new SearchProductsActionSuccess(products)),
          catchError((err) => of(new SearchProductsActionError(err.message)))
        );
      })
    )
  );

  // Select Product
  selectProductEffect: Observable<ProductsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductsActionsTypes.SELECT_PRODUCT),
      mergeMap((action: ProductsActions) => {
        return this.productService.setSelected(action.payload).pipe(
          map((product) => new SelectProductActionSuccess(product)),
          catchError((err) => of(new SelectProductActionError(err.message)))
        );
      })
    )
  );
}
