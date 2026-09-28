import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BindingPropertyComponent } from './binding-property-component/binding-property-component';
import { BindingClassComponent } from './binding-class-component/binding-class-component';
import { BindingStyleComponent } from './binding-style-component/binding-style-component';
import { BindingEventComponent } from './binding-event-component/binding-event-component';
import { BindingTwoWayComponent } from './binding-two-way-component/binding-two-way-component';
import { ProductListCallServiceComponent } from './product-list-call-service/product-list-call-service';
import { ProductListDropdownComponent } from './product-list-dropdown-component/product-list-dropdown-component';
import { ProductListComponent } from './product-list-component/product-list-component';
import { ProductListCallHttpServiceComponent } from './product-list-call-http-service-component/product-list-call-http-service-component';
import { ProductHttpHandleErrorServiceComponent } from './product-http-handle-error-service-component/product-http-handle-error-service-component';
import { ProductDetailComponent } from './product-detail-component/product-detail-component';
import { ProductListAdvancedComponent } from './product-list-advanced-component/product-list-advanced-component';
import { ProductListSearchComponent } from './product-list-search-component/product-list-search-component';
import { Ex18Component } from './ex18/ex18';

const routes: Routes = [
  { path: 'binding-property', component: BindingPropertyComponent },
  { path: 'binding-class', component: BindingClassComponent },
  { path: 'binding-style', component: BindingStyleComponent },
  { path: 'binding-event', component: BindingEventComponent },
  { path: 'binding-two-way', component: BindingTwoWayComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-list-dropdown', component: ProductListDropdownComponent },
  { path: 'product-list-call-service', component: ProductListCallServiceComponent },
  { path: 'product-list-call-http-service', component: ProductListCallHttpServiceComponent },
  { path: 'product-http-handle-error-service', component: ProductHttpHandleErrorServiceComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductListAdvancedComponent },
  { path: 'searchproduct', redirectTo: 'search-product', pathMatch: 'full' },
  { path: 'search-product', component: ProductListSearchComponent },
  { path: 'ex18', component: Ex18Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
