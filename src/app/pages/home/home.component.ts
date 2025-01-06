import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  productService: ProductService = inject(ProductService)
  products: Product[] | undefined;

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;

      console.log('this.products', this.products);
    })
  }
}
