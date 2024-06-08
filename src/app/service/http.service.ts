import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get('https://s3.amazonaws.com/api-fun/books.json').pipe(catchError((err) => this.handleError(err)));
  }

  handleError(error: any): Observable<Response> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
