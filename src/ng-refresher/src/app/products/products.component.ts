import { Component, OnInit } from '@angular/core';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  faCoffee = faCoffee;
  
  productName = 'book';
  isDisabled = true;
  products = ['a book', 'a tree'];
  constructor() {
    setTimeout(()=>{
      this.isDisabled = false;
    }, 3000)
  }

  ngOnInit() {
  }
  
  
  onAddProduct() {
    this.products.push(this.productName);
  }
  
  onRemoveProduct(productName: string) {
    this.products = this.products.filter(p=> p!== productName);
  }
}
