
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Order {
  prodId: number;
  quantity: number;
}

interface Product {
  productID: number;
  productName: string;
  description: string;
  price: number;
  threshold: number;
  stockLevel: number;
}

@Component({
  selector: 'app-record-sales',
  templateUrl: './record-sales.component.html',
  styleUrls: ['./record-sales.component.css']
})
export class RecordSalesComponent implements OnInit {
  salesForm: FormGroup;
  products: Product[] = [];
  updatedProducts: Product[] = [];
  outOfStockProducts: string[] = [];
  apiUrl = 'https://localhost:44335'; // Replace with your actual API base URL

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.salesForm = this.fb.group({
      prodId: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<Product[]>(`https://localhost:44335/api/Products`)
      .subscribe(
        (response: Product[]) => {
          this.products = response;
        },
        (error) => {
          alert('An error occurred while fetching products');
          console.error(error);
        }
      );
  }

  recordSales() {
    const order: Order = this.salesForm.value;
    this.http.post<{ updatedProducts: Product[], outOfStockProducts: string[] }>(`https://localhost:44335/recordsale`, [order])
      .subscribe(
        (response) => {
          this.updatedProducts = response.updatedProducts;
          this.outOfStockProducts = response.outOfStockProducts;
          if (this.outOfStockProducts.length > 0) {
            alert(`Out of stock products: ${this.outOfStockProducts.join(', ')}`);
          } else {
            alert('Sales recorded successfully');
          }
        },
        (error) => {
          alert('An error occurred while recording sales');
          console.error(error);
        }
      );
  }
}
