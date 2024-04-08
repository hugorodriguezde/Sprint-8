import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit {

  productForm = new FormGroup({
    product: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
  });
  title =' Crear Producte';
  id:string | null;
  constructor(private router: Router,
    private _productService: ProductService,
    private aRouter: ActivatedRoute) {
      this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.editProduct();
  }

  addProduct(){
    console.log(this.productForm);
    console.log(this.productForm.get('product')?.value)

    const product: Product = {
      name: this.productForm.get('product')?.value ?? '',
      category: this.productForm.get('category')?.value ?? '',
      price: Number(this.productForm.get('price')?.value) ?? 0,
    }
    if(this.id !== null){
      this._productService.editProduct(this.id, product).subscribe(data => {
        this.router.navigate(['/home']);
      }, error => {
        console.log(error);
        this.productForm.reset();
      });
      return;
    }
    console.log(product);
    this._productService.saveProduct(product).subscribe(data => {
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
      this.productForm.reset();
    });
  }

    editProduct(){
      if(this.id !== null){
        this.title = 'Editar Producte';
        this._productService.getProduct(this.id).subscribe(data => {
          this.productForm.setValue({
            product: data.name,
            category: data.category,
            price: data.price
          })
        })
      }
    }
}
