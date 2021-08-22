import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../modal/user';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  user: User;
  userEmail: string ;
  userPassword: string;
  
  // url:string = "http://spares365-env.eba-e2eubpyu.us-east-2.elasticbeanstalk.com/"; //"http://spares365-env.eba-e2eubpyu.us-east-2.elasticbeanstalk.com/" "http://localhost:5000/";
  url:string = "http://localhost:5000/";
    constructor(private _http: HttpClient) { }

   updateUser(): void {
    this.userEmail = this.user.email
   }
   
   getUserDetails(email: string) {
    const params = new HttpParams()
    .set('email', email);
    return this._http.get<any>(this.url+"getUserDetails", {params});
   }
}
