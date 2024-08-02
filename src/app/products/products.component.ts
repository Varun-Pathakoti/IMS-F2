import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: any[] = [];
  productDetails: any = null;
  searchCriteria: string = 'id';
  searchValue: string = '';
  updateSuccessMessage: string = '';
  updateErrorMessage: string = '';

  // Track updated fields
  updatedProduct: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.http.get("https://localhost:44335/api/Products")
      .subscribe((res: any) => {
        this.productList = res;
        this.checkStockLevels(); // Update stock levels
      }, error => {
        console.error("Error fetching product list", error);
        this.updateErrorMessage = "Error fetching product list. Please try again later.";
        alert(this.updateErrorMessage);
      });
  }

  searchProduct() {
    this.updateSuccessMessage = '';
    this.updateErrorMessage = '';

    if (this.searchCriteria === 'id') {
      const id = parseInt(this.searchValue, 10);
      if (isNaN(id) || id <= 0) {
        this.updateErrorMessage = "Please enter a valid Product ID.";
        alert(this.updateErrorMessage);
        return;
      }

      this.http.get(`https://localhost:44335/api/Products/${id}`)
        .subscribe((res: any) => {
          this.productDetails = res;
          this.updatedProduct = { ...res };
          this.checkStockLevels(); // Ensure stock levels are checked
          this.router.navigate(['/products', res.productID]);
        }, error => {
          console.error("Product not found", error);
          this.updateErrorMessage = "Product not found. Please enter a valid Product ID.";
          alert(this.updateErrorMessage);
          this.productDetails = null;
        });
    } else if (this.searchCriteria === 'name') {
      this.searchProductByName();
    }
  }

  searchProductByName() {
    this.updateSuccessMessage = '';
    this.updateErrorMessage = '';

    this.http.get(`https://localhost:44335/getbyname/${this.searchValue}`)
      .subscribe((res: any) => {
        if (res && res.length > 0) {
          this.productList = res;
          this.productDetails = null;
          this.checkStockLevels(); // Update stock levels after search
        } else {
          this.updateErrorMessage = "Product not available.";
          alert(this.updateErrorMessage);
          this.productList = [];
          this.refreshPage();
        }
      }, error => {
        console.error("Error fetching products by name", error);
        this.updateErrorMessage = "Error fetching products by name. Please try again later.";
        alert(this.updateErrorMessage);
        this.productList = [];
      });
  }

  showProductDetails(product: any) {
    this.router.navigate(['/products', product.productID]);
    this.productDetails = product;
    this.updatedProduct = { ...product };
    this.updateSuccessMessage = '';
    this.updateErrorMessage = '';        
  }
  /*goBack() {
    this.router.navigate(['/products']);
  }*/

  updateProduct() {
    if (!this.productDetails) {
      this.updateErrorMessage = "No product selected for update.";
      alert(this.updateErrorMessage);
      return;
    }

    this.http.put(`https://localhost:44335/update/${this.productDetails.productID}`, this.updatedProduct)
      .subscribe((res: any) => {
        this.updateSuccessMessage = "Product updated successfully";
        alert(this.updateSuccessMessage);
        this.productDetails = res;
        this.getAllProducts(); // Refresh product list and check stock levels
      /*  this.router.navigate(['/products']).then(() => {
          window.location.reload(); // Refresh the page
        });*/
      }, error => {
        console.error("Failed to update product", error);
        this.updateErrorMessage = "Failed to update product. Please try again later.";
        alert(this.updateErrorMessage);
      });
  }

  deleteProduct(productId: number) {
    this.http.delete(`https://localhost:44335/delete/${productId}`)
      .subscribe(() => {
        this.getAllProducts();
        if (this.productDetails && this.productDetails.productID === productId) {
          this.productDetails = null;
        }
        alert("Product deleted successfully");
      }, error => {
        console.error("Failed to delete product", error);
        this.updateErrorMessage = "Failed to delete product. Please try again later.";
        alert(this.updateErrorMessage);
      });
  }

  // Method to check stock levels
  checkStockLevels() {
    this.productList.forEach(product => {
      if (product.stockLevel <= product.threshold) {
        product.stockStatus = 'Low Stock';
      } else {
        product.stockStatus = 'Available';
      }
    });
  }

  // Method to refresh the page
  refreshPage() {
    this.router.navigate(['/products']).then(() => {
      window.location.reload();
    });
  }
}
