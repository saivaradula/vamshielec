import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  async getUsers() {
    return this.http
      .post<any>(`${environment.apiURL}/customer-list`, { id: 1 })
      .pipe(
        map((u) => {
          return u;
        })
      );
  }

  async getDetails(id) {
    return this.http
    .get<any>(`${environment.apiURL}/customer-details/${id}`)
    .pipe(
      map((u) => {
        return u;
      })
    );
  }
}
