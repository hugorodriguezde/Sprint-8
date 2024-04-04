import { Component } from '@angular/core';
import { CreateProductComponent } from '../../components/create-product/create-product.component';
import { ListProductComponent } from '../../components/list-product/list-product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CreateProductComponent, ListProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
