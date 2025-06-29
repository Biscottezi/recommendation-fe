import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styles: [
  ]
})
export class ProductdetailComponent implements OnInit{
  isLoading = false;
  //selectedSize!:string;
  //category!:string;
  cart: Product[] = [];
  relatedProductList: Product[] = [];
  ratingList: boolean[] = [];
  images!: string[];
  product!: Product;
  imageSrc!: string;
  selectedImage!: number;
  discount = 0;
  title: string = '';
  constructor(private route:ActivatedRoute, private productService:ProductService, private cartService:CartService, private router:Router){}

  ngOnInit(): void {
    //this.getProduct();
    this.cart = this.cartService.getCart;
    this.route.params.subscribe(()=>{
      this.getProduct();
      this.scrollToTop();
    })
  }

  getProduct(){
    this.isLoading = true;
    const id = this.route.snapshot.params['id'];
    this.productService.getProduct(id).subscribe((data:Product)=>{
      this.isLoading = false;
      this.product = data;
      this.images = data.images ? data.images[0].large_url : [];
      this.imageSrc = data.images ? data.images[0].large_url[0] : '';
      this.title = data.name;
      //this.discount = this.product && Math.round(100-(this.product.price/this.product.prevprice)*100);
      this.getRatingStar();
      this.relatedProducts();
    });
  }
  
  scrollToTop(){
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

  getRatingStar() {
    this.ratingList = this.productService.getRatingStar(this.product);
  }

  addToCart(product:Product) {
    this.cartService.add(product);
  }

  removeFromCart(product:Product) {
    this.cartService.remove(product);    
  }

  isProductInCart(product:Product) {
    return this.cart.some(item => item.id == product.id);
  }

  relatedProducts() {
    this.isLoading = true;
    let recommendedProductIds = [];
    this.productService.getRelated(this.product.id).subscribe((data: any) => {
      // this.relatedProductList = data.filter((item: Product) => {
      //   this.isLoading = false;
      //   return this.product.id !== item.id;
      // });
      this.relatedProductList = [];
      recommendedProductIds = data['similar_products'].map((item: any) => item['product_id'] as string);
      recommendedProductIds.forEach((id: string) => {
        this.productService.getProduct(id).subscribe((product: Product) => {
          if (this.product.id !== product.id) {
            this.relatedProductList.push(product);
          }
        });
      });
      this.isLoading = false;
    });
  }

  addSize(value:string,index:string) {
    //this.selectedSize=index;
    //this.product.size=value;
  }

  onImage(value:string,index:number) {
    this.imageSrc = value;
    this.selectedImage = index;
  }
  
}
