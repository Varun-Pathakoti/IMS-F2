import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: any[] = [];
  productId: number = 0;
  productDetails: any = null;
  newStock: number = 0; // Track the new stock value

  updateSuccessMessage: string = '';
  updateErrorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.http.get("https://localhost:44335/api/Products")
      .subscribe((res: any) => {
        this.productList = res;
      });
  }

  searchProductById() {
    // Reset messages
    this.updateSuccessMessage = '';
    this.updateErrorMessage = '';

    if (this.productId === 0) {
      this.updateErrorMessage = "Please enter a valid Product ID.";
      return;
    }

    this.http.get(`https://localhost:44335/api/Products/${this.productId}`)
      .subscribe((res: any) => {
        this.productDetails = res;
        this.newStock = this.productDetails.stockLevel; // Initialize newStock with current stock level
      }, (error) => {
        console.error("Product not found", error);
        this.productDetails = null;
        this.updateErrorMessage = "Product not found. Please enter a valid Product ID.";
      });
  }

  updateStock() {
    const updatedProduct = { ...this.productDetails, stockLevel: this.newStock };
    this.http.put(`https://localhost:44335/update/${this.productId}/${this.newStock}`, updatedProduct)
      .subscribe((res: any) => {
        this.updateSuccessMessage = "Stock updated successfully";
        this.productDetails = res; // Update local product details with response
      }, (error) => {
        console.error("Failed to update stock", error);
        this.updateErrorMessage = "Failed to update stock. Please try again later.";
      });
  }
}
