import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  DeleteProductAction,
  SelectProductAction,
} from 'src/app/ngrx/products.actions';
import { Product } from '../../../model/product.model';
@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css'],
})
export class ProductsItemComponent implements OnInit {
  @Input() product: Product | null = null;
  constructor(private store: Store) {}

  ngOnInit(): void {}

  onSelect(product: Product) {
    this.store.dispatch(new SelectProductAction(product));
  }
  onDelete(product: Product) {
    this.store.dispatch(new DeleteProductAction(product));
  }
}
