import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Sale } from './sale.model'; // Import the Sale model if you have it defined
interface Sale {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  saleDate: Date;
}
@Component({
  selector: 'app-sales',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  sales: Sale[] = [];
  error: string | null = null;
  private apiUrl: string = 'https://localhost:44335/salestable';
 
   // Replace with your API URL

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.http.get<Sale[]>(this.apiUrl).subscribe(
      (data: Sale[]) => {
        this.sales = data;
      },
      (error: any) => {
        this.error = 'Failed to load sales data';
        console.error('Error:', error);
      }
    );
  }
}
