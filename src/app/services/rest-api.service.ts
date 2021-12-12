import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  baseUrl = 'https://angular-shopping-ps14048.herokuapp.com/v1/api/';
  constructor(private httpClient: HttpClient) {}
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      //Client side error
      errorMessage = `Error: ${error.error.error.message}`;
    } else {
      //Server side error
      errorMessage = `Error code: ${error.status} - Message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  get(url: string){
      return this.httpClient.get(url).pipe(catchError(this.handleError));
  }

  getOne(url:string,id:string){
      return this.httpClient.get(url+'/'+id).pipe(catchError(this.handleError));
  }

  post(url:string,body:any){
      return this.httpClient.post(url,body).pipe(catchError(this.handleError));
  }

  put(url:string,body:any,id:string|number){
    return this.httpClient.put(url+'/'+id,body).pipe(catchError(this.handleError));
  }

  delete(url:string,id:string|number){
    return this.httpClient.delete(url+'/'+id).pipe(catchError(this.handleError));
  }
}


