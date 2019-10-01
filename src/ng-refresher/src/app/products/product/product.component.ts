import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() productName: string;
  
  @Output() productClicked = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }
  
  onClicked() {
    this.productClicked.emit( )
  }

}
