import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  NewProductAction,
  SaveProductAction,
} from 'src/app/ngrx/products.actions';
import { Product } from '../../../model/product.model';
import {
  ProductsState,
  ProductsStateEnum,
} from 'src/app/ngrx/products.reducer';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  productFormGroup: FormGroup | null = null;
  state: ProductsState | null = null;
  readonly ProductsStateEnum = ProductsStateEnum;
  submitted: boolean = false;
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    selected: false,
    available: false,
  };

  constructor(private store: Store<any>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.store.dispatch(new NewProductAction(this.product));

    this.store.subscribe((sate) => {
      this.state = sate.catalogState;
      if (this.state?.dataState == ProductsStateEnum.NEW) {
        this.productFormGroup = this.fb.group({
          name: ['', Validators.required],
          price: [0, Validators.required],
          quantity: [0, Validators.required],
          selected: [true, Validators.required],
        });
      }
    });
  }

  newProduct() {
    this.store.dispatch(new NewProductAction(this.product));
  }

  onSaveProduct() {
    this.store.dispatch(new SaveProductAction(this.productFormGroup?.value));
  }
}
