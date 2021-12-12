import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from '../services/rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private rest: RestApiService, private http: HttpClient) {}
  getPublicContent(): Observable<any> {
    return this.http.get(this.rest.baseUrl +'test/' + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.rest.baseUrl +'test/' + 'Customers', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(this.rest.baseUrl +'test/' + 'Staffs', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.rest.baseUrl +'test/' + 'Directors', { responseType: 'text' });
  }
}
