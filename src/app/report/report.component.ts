import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportContent: string = '';
  error: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.generateReport();
  }

  generateReport() {
    this.http.get('https://localhost:44335/generatereport', { responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Failed to generate report. Please try again later.';
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `An error occurred: ${error.error.message}`;
          } else {
            // Server-side error
            errorMessage = `Server returned error code ${error.status}: ${error.message}`;
          }
          this.error = errorMessage;
          return throwError(errorMessage);
        })
      )
      .subscribe((report: string) => {
        this.reportContent = report;
      });
  }
}
