import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  sortOption: string = 'id'; // Default sort option

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.http.get<Sale[]>(this.apiUrl).subscribe(
      (data: Sale[]) => {
        this.sales = data;
        this.sortSales(); // Sort after loading data
      },
      (error: any) => {
        this.error = 'Failed to load sales data';
        console.error('Error:', error);
      }
    );
  }

  sortSales(): void {
    switch (this.sortOption) {
      case 'id':
        this.sales.sort((a, b) => a.productId - b.productId);
        break;
      case 'productName':
        this.sales.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case 'saleDate':
        this.sales.sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime()); // Descending order
        break;
      case 'quantity':
        this.sales.sort((a, b) => b.quantity - a.quantity); // Descending order
        break;
      default:
        this.sales.sort((a, b) => a.id - b.id); // Default sort by ID
        break;
    }
  
  
  }

  onSortChange(event: any): void {
    this.sortOption = event.target.value;
    this.sortSales(); // Re-sort when the sort option changes
  }
}
