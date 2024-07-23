import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ReportComponent } from './report/report.component';
import { RecordSalesComponent } from './record-sales/record-sales.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
  path:'products',
  component:ProductsComponent
  },
  {
    path:'create-product',
    component:CreateProductComponent
    },
    {
      path:'report',
      component:ReportComponent
    },
    {
      path:'record-sales',
      component:RecordSalesComponent
    },
   
    {
      path:'register',
      component:RegisterComponent
    },
    {
      path:'navbar',
      component:NavbarComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
