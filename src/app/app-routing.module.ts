import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ReportComponent } from './report/report.component';
import { RecordSalesComponent } from './record-sales/record-sales.component';

const routes: Routes = [
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
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
