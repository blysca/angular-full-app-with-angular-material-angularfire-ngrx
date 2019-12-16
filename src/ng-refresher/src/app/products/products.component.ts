import {Component, OnDestroy, OnInit} from '@angular/core';

import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {ProductsService} from './products.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  faCoffee = faCoffee;
  productName = 'book';
  isDisabled = true;
  products: string[];

  private productsSubscription: Subscription;


  constructor(
    private productsService: ProductsService
  ) {
    setTimeout(() => {
      this.isDisabled = false;
    }, 3000);
  }

  ngOnInit() {
    this.products = this.productsService.getProducts();

    this.productsSubscription = this.productsService.productsUpdated.subscribe(() => {
      this.products = this.productsService.getProducts();
    });
  }


  onAddProduct(form: NgForm) {
    if (form.valid) {
      this.productsService.addProduct(form.value.productName);
      // this.products.push(form.value.productName);
    }
    console.log('*** form ', form);
  }

  onRemoveProduct(productName: string) {
    this.products = this.products.filter(p => p !== productName);
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
