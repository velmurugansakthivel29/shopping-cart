import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  selectedSort: string;
  sortOptions = { high: 'Price - High Low', low: 'Price - Low High', discount: 'Discount' };
  @Output() selectedSortEmitter: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  changeSort(value: string) {
    this.selectedSortEmitter.emit(value);
  }

}
