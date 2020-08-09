import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http: HttpClient) { }

  async getBrands() {
    return this.http
      .get<any>(`${environment.apiURL}/brand-list`)
      .pipe(
        map((p) => {
          return p;
        })
      );
  }

  async getBrandDetails(id) {
    return this.http
      .get<any>(`${environment.apiURL}/brand/${id}`)
      .pipe(
        map((p) => {
          return p;
        })
      );
  }

  async addBrands(data) {
    return this.http
      .post<any>(`${environment.apiURL}/brands`, data)
      .pipe(
        map((p) => {
          return p;
        })
      )
  }
}
