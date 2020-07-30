import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  async loginUser(userCreds) {
     
    let body = {
      email: userCreds.username,
      password: userCreds.password,
    };

    let headers = new HttpHeaders({
      'skip-interceptor': '',
      Authorization: 'Bearer ',
    });

    return this.http
      .post<any>(`${environment.apiURL}/login`, body, { headers: headers, responseType: 'json' })
      .pipe(
        map((user) => {
          console.log(user);
          if( user.success === true) {
            this.storeUserDetails(user.result)
          }
          return user;
        })
      );
  }

  storeUserDetails(user) {
    let storeUser = {
      id: user.userId,
      user_type: user.userType,
      mobile: user.mobile,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname       
    }
    localStorage.setItem('user', JSON.stringify(storeUser));
  }
}
