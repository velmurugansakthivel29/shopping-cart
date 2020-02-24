import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IFilter } from '../../shared/model/product.interface';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  minValue = 0;
  maxValue = 1000;
  options: Options = {
    floor: 0,
    ceil: 1000
  };


  @Output() filterRangeEmitter: EventEmitter<IFilter> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(minValue: number, maxValue: number) {
    const filter: IFilter = {
      min: minValue,
      max: maxValue
    };
    this.filterRangeEmitter.emit(filter);
  }
}
