import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  EditProductAction,
  UpdateProductAction,
} from 'src/app/ngrx/products.actions';
import {
  ProductsState,
  ProductsStateEnum,
} from 'src/app/ngrx/products.reducer';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productID: number;
  state: ProductsState | null = null;
  productFormGroup: FormGroup | null = null;
  readonly ProductsStateEnum = ProductsStateEnum;
  formBuilt: boolean = false;
  submitted: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<any>,
    private router: Router
  ) {
    this.productID = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.store.dispatch(new EditProductAction(this.productID));
    this.store.subscribe((state) => {
      this.state = state.catalogState;
      if (this.state?.dataState == ProductsStateEnum.LOADED) {
        if (this.state.currentProduct != null) {
          this.productFormGroup = this.fb.group({
            id: [this.state.currentProduct.id],
            name: [this.state.currentProduct.name, Validators.required],
            price: [this.state.currentProduct.price, Validators.required],
            quantity: [this.state.currentProduct.quantity, Validators.required],
            selected: [this.state.currentProduct.selected],
            available: [this.state.currentProduct.available],
          });
          this.formBuilt = true;
        }
      }
    });
  }

  onUpdated() {
    this.router.navigateByUrl('/products');
  }

  onUpdateProduct() {
    this.submitted = true;
    if (!this.productFormGroup?.valid) return;
    this.store.dispatch(new UpdateProductAction(this.productFormGroup?.value));
  }
}
