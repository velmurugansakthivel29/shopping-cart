import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../shared/model/product.interface';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as cartActions from '../store/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  selectedProducts: IProduct[];
  subscription: Subscription;
  price = 0;
  total = 0;
  discount = 0;
  itemCount: number;
  showMinNotification = false;
  constructor(private store: Store<any>, private route: Router) { }

  ngOnInit(): void {
    this.subscription = this.store.select('cartReducer').subscribe(
      list => {
        this.selectedProducts = list.cartList;
      }
    );
    if (this.selectedProducts.length === 0) {
      this.route.navigate(['/']);
    }
    this.getTotalAmount();

  }
  getOriginalAmount(price: number, discount: number) {
    const originalAmount = (price * 100) / (100 - discount);
    return originalAmount.toFixed(2);
  }
  getTotalAmount() {
    this.price = 0;
    this.discount = 0;
    this.selectedProducts.forEach(product => {
      this.price = Number((this.price + (product.originalPrice * product.selectedNo)).toFixed(2));
      this.discount = Number((this.discount + ((product.originalPrice - product.price) * product.selectedNo)).toFixed(2));
      this.total = Number((this.price - this.discount).toFixed(2));
    });
  }

  updateCount(product: IProduct, count: number, addCount?: number) {
    count = addCount + Number(count);
    if (count >= 1) {
      product.selectedNo = count;
      this.showMinNotification = (count > 1) ? false : true;
      this.getTotalAmount();
    }

  }
  removeCart(productId: number) {
    this.store.dispatch(new cartActions.RemoveProduct(productId));
    this.getTotalAmount();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
