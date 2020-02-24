import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as cartActions from '../../store/cart.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private store: Store<any>, private route: Router) { }

  ngOnInit(): void {
  }
  searchProduct(search: string) {
    this.route.navigate(['/']);
    this.store.dispatch(new cartActions.SearchProduct(search));
  }
}
