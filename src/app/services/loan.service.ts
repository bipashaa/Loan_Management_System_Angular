import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient, private login: LoginService) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public getAllLoanDetails() {
    return this.http.get(
      'http://localhost:8100/api/v1/get-loan',
      this.httpOptions
    );
  }

  public getAllLoanDetailsById(loanNo: any) {
    return this.http.get('http://localhost:8100/api/v1/get-loan/' + loanNo);
  }

  public create(data: any) {
    return this.http.post(
      'http://localhost:8100/api/v1/add-loan',
      JSON.stringify(data),
      this.httpOptions
    );
  }

  public update(loanNo: any, data: any) {
    return this.http
      .put(
        'http://localhost:8100/api/v1/update-loan/' + loanNo,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  public delete(loanNo: any): Observable<any> {
    return this.http
      .delete('http://localhost:8100/api/v1/delete-loan/' + loanNo)
      .pipe(catchError(this.handleError));
  }

  public search(searchTerm: any) {
    return this.http.get(
      'http://localhost:8100/api/v1/loan/search/' + searchTerm,
      this.httpOptions
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
