import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  productName: string;
  description: string;
  image: string;
  price: number;
  threshold: number;
  stockLevel: number;
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  private apiUrl = 'https://localhost:44335/create'; // Replace with your actual API URL

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      threshold: ['', [Validators.required, Validators.min(0)]],
      stockLevel: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.productForm.markAllAsTouched();

   

    const product: Product = this.productForm.value;
    this.createProduct(product).subscribe(
      response => {
        this.productForm.reset();
        alert('Product created successfully');
      },
      error => {
        console.error('Error creating product:', error);
        alert('Failed to create product. Please try again later.');
      }
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.productForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required.`;
      }
      if (control.errors['min']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be a positive number.`;
      }
    }
    return null;
  }
}
