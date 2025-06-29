import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Product} from '../model';
import { Image } from '../model/Product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  products = new BehaviorSubject<Product[]>([]);
  ratingList: boolean[] = [];
  constructor(private http:HttpClient) { }

  get(page: number): Observable<Product[] | any> {
    return this.http.get(`${environment.apiUrl}/products/?page=${page}`).pipe(map((data: any)=>{
      let newProducts: Product[] = [];
      for (const item of data['results']) {
        newProducts.push(<Product>{
          id: item['id'],
          url: item['url'],
          name: item['name'],
          description: item['description'],
          average_rating: item['average_rating'],
          price: item['price'],
          images: (item['images'] || []).map((img: any) => ({
            id: img['id'],
            url: img['url'],
            small_url: img['small_url'],
            medium_url: img['medium_url'],
            large_url: img['large_url']
          }) as Image),
          reviews: item['reviews'] || []
        });
      }
      return newProducts;
    }),
    catchError((error)=>{
      return throwError(error); //throwError is deprecated
      // return new Error(error);
    }));
  }

  getByCategory(category: string): Observable<Product[] | any> {
    return this.http.get('', {
      params: new HttpParams().set('category',category)
    });
  }

  getRelated(id: string): Observable<Product[] | any> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}/similar_products/`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}/`);
  }

  search(query: string): Observable<Product[]> {
    return this.http.get<Product[]>('', {
      params: new HttpParams().set('q',query)
    });
  }

  getRatingStar(product:Product){
    this.ratingList = [];
    [...Array(5)].map((_,index)=>{
      return index + 1 <= Math.trunc(product?.average_rating) 
        ? this.ratingList.push(true)
        : this.ratingList.push(false);
    });
    return this.ratingList;
  }
  
}
