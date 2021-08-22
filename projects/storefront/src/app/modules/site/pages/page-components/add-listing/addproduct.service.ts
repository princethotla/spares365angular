import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Addproduct } from './addproduct';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  upload(file: File) {
    throw new Error('Method not implemented.');
  }

  url:string = "http://localhost:5000/";
  constructor(private _http: HttpClient) { }

  public addproductFromRemote(Addproduct: Addproduct): Observable<any> {
    return this._http.post<any>("http://spares365-env.eba-e2eubpyu.us-east-2.elasticbeanstalk.com/addproduct", Addproduct);
  }

  public listProductByNameFromRemote(name: string): Observable<any> {
    return this._http.post<any>("http://spares365-env.eba-e2eubpyu.us-east-2.elasticbeanstalk.com/product/", name);
  }

  public listAllProductsFromRemote(): Observable<any> {
    return this._http.get<any>("http://spares365-env.eba-e2eubpyu.us-east-2.elasticbeanstalk.com/findallproducts");
  }
  public placeOrder(email: string){
    const params = new HttpParams().set('email', email);
    return this._http.get<any>(this.url+"place_Order", {params});
 }
  
}