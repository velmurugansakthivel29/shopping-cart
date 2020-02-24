import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct, IFilter } from '../shared/model/product.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SortComponent } from '../components/sort/sort.component';
import { FilterComponent } from '../components/filter/filter.component';
import * as cartActions from '../store/cart.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: IProduct[];
  productList: IProduct[];
  subscription: Subscription;
  matDialogSort: MatDialogRef<SortComponent>;
  matDialogFilter: MatDialogRef<FilterComponent>;
  constructor(private route: Router, private dialog: MatDialog, private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new cartActions.LoadProduct());
    this.subscription = this.store.select('cartReducer').subscribe(
      list => {
        this.products = list.product;
        this.productList = list.product;
        if (list.queryText) {
          this.productList = this.productList.filter((product: IProduct) =>
            product.name.toLowerCase().includes(list.queryText.toLowerCase()));
        }
      }
    );
  }
  openSortDialog() {
    this.matDialogSort = this.dialog.open(SortComponent);
    const sub = this.matDialogSort.componentInstance.selectedSortEmitter.subscribe((data: any) => {
      this.selectedSort(data);
      this.matDialogSort.close();
    });
  }
  openFilterDialog() {
    this.matDialogFilter = this.dialog.open(FilterComponent);
    const sub = this.matDialogFilter.componentInstance.filterRangeEmitter.subscribe((data: any) => {
      this.selectedRange(data);
      this.matDialogFilter.close();
    });
  }
  getTotalAmount(price: number, discount: number) {
    const originalAmount = (price * 100) / (100 - discount);
    return originalAmount.toFixed(2);
  }
  addToCart(product: IProduct) {
    if (product.isAdded) {
      this.route.navigate(['/cart']);
    } else {
      product.selectedNo = 1;
      product.originalPrice = Number(((product.price * 100) / (100 - product.discount)).toFixed(2));
      this.store.dispatch(new cartActions.AddToCart(product));
      this.route.navigate(['/cart']);
    }
  }
  selectedRange(filter: IFilter) {
    this.productList = this.products;
    this.productList = this.productList.filter(product => product.price > filter.min && product.price < filter.max);
  }
  selectedSort(sort: string) {
    switch (sort) {
      case 'low': {
        this.productList.sort((a, b) => a.price - b.price);
        break;
      }
      case 'high': {
        this.productList.sort((a, b) => b.price - a.price);
        break;
      }
      case 'discount': {
        this.productList.sort((a, b) => a.discount - b.discount);
        break;
      }
      default: {
        break;
      }
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

