export class Product {
  _id?:string;
  name:string;
  category:string;
  price:number;

constructor(name: string, category: string, price: number) {

  this.name = name;
  this.category = category;
  this.price = price;

}
}
