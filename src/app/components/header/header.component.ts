import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  cartItems = 0;
  constructor(private store: Store<any>, private route: Router) { }
  ngOnInit(): void {
    this.subscription = this.store.select('cartReducer').subscribe(
      list => {
        this.cartItems = list.cartList.length;
      }
    );

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
