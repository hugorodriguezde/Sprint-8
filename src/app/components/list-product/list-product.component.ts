import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { catchError, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../../models/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CurrencyPipe],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit {

  products: Product[] = [];
  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this._productService.getProducts()
    .pipe(
      tap(products => {
        this.products = products;
        console.log(this.products);
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        return [];
      })
    )
    .subscribe();
  }

  deleteProduct(id: any) {
    this._productService.deleteProduct(id)
      .pipe(
        tap(() => {
          console.log('Product deleted successfully!');
          this.getProducts();
        }),
        catchError(error => {
          console.error('Error deleting product:', error);
          return [];
        })
      )
      .subscribe();
  }
}
