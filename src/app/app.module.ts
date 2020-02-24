import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { SortComponent } from './components/sort/sort.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';

import { cartReducer } from './store/cart.reducer';
import { CartEffects } from './store/cart.effects';

import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Ng5SliderModule } from 'ng5-slider';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    SortComponent,
    ProductListComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    Ng5SliderModule,
    BrowserAnimationsModule,
    MatDialogModule,
    StoreModule.forRoot({  cartReducer }),
    EffectsModule.forRoot([CartEffects])
  ],
  providers: [],
  entryComponents: [SortComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
