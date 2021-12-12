import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RestApiService } from '../services/rest-api.service';
import { TokenStorageService } from './tokenStorage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private rest: RestApiService,
    private tokenStorage: TokenStorageService
  ) {}
  login({ username, password }: any): Observable<any> {
    return this.http.post(
      this.rest.baseUrl + 'rest/auth/signin',
      { username, password },
      httpOptions
    );
  }
  logout() {
    this.tokenStorage.signOut();
  }
  register({
    username,
    email,
    password,
    fullname,
    photo,
    role
  }: any): Observable<any> {
    return this.http.post(
      this.rest.baseUrl + 'rest/auth/signup',
      { username, email, password, fullname, photo ,role},
      httpOptions
    );
  }

  update({
    username,
    email,
    password,
    fullname,
    photo,
    role
  }: any): Observable<any> {
    return this.http.put(
      this.rest.baseUrl + 'rest/auth/update/'+username,
      { username, email, password, fullname, photo ,role},
      httpOptions
    );
  }

  getAll(): Observable<any>{
    return this.http.get(this.rest.baseUrl+"rest/auth/getAll",httpOptions);
  }

  accountRequestByUsername(username: string): Observable<any>{
    return this.http.get(this.rest.baseUrl+"rest/auth/getOne/"+username,httpOptions);
  }

  isLoggedIn() {
    return this.tokenStorage.getToken()!==null;
  }

  isDirector(){
    return this.isLoggedIn() && this.tokenStorage.getUser().roles.indexOf("Directors")>-1;
  }

  isStaff(){
    return this.isLoggedIn() && this.tokenStorage.getUser().roles.indexOf("Staffs")>-1;
  }

  isAdminOrStaff(){
    return this.isDirector() || this.isStaff();
  }
}
