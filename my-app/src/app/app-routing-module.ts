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
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { Contact } from './contact/contact';
import { authGuard } from './classes/auth.guard';
import { CourseRegistrationComponent } from './course-registration-component/course-registration-component';
import { LoginComponent } from './login-component/login-component';
import { FakeProductComponent } from './fake-product-component/fake-product-component';
import { FakeProduct2Component } from './fake-product2-component/fake-product2-component';
import { CourseRegistrationReactiveComponent } from './course-registration-reactive-component/course-registration-reactive-component';
import { BooksComponent } from './books-component/books-component';
import { BookDetailComponent } from './book-detail-component/book-detail-component';
import { BookFilterComponent } from './book-filter-component/book-filter-component';
import { BookNewComponent } from './book-new-component/book-new-component';
import { BookUpdateComponent } from './book-update-component/book-update-component';
import { BookDeleteComponent } from './book-delete-component/book-delete-component';
import { FashionComponent } from './fashion-component/fashion-component';
import { FashionDetailComponent } from './fashion-detail-component/fashion-detail-component';
import { FashionNewComponent } from './fashion-new-component/fashion-new-component';
import { FashionUpdateComponent } from './fashion-update-component/fashion-update-component';
import { FashionDeleteComponent } from './fashion-delete-component/fashion-delete-component';
import { FashionSearchComponent } from './fashion-search-component/fashion-search-component';
import { FashionSlugComponent } from './fashion-slug-component/fashion-slug-component';
import { SearchFashionComponent } from './search-fashion-component/search-fashion-component';
import { Homework } from './homework/homework';


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
  { path: 'search-product', component: ProductListSearchComponent, canActivate: [authGuard] },
  { path: 'ex18', component: Ex18Component },
  {
    path: 'samplenested',
    component: ProductListAdvancedComponent,
    children: [
      { path: 'search', component: ProductListSearchComponent },
      { path: 'detail/:id', component: ProductDetailComponent },
    ],
  },
  { path: 'lazyinfor',
    loadComponent:() =>
      import ('./lazy-component/lazy-component')
        .then(c=>c.LazyComponent),
      canActivate:[authGuard]
   },
  { path: 'course-register', component: CourseRegistrationComponent },
  { path: 'course-reactive-register', component: CourseRegistrationReactiveComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contacts', component: Contact },
  { path: '', component: Contact },
  { path: 'fakeproducts', component: FakeProductComponent },
  { path: 'fakeproducts2', component: FakeProduct2Component },
  { path: 'book-list', component: BooksComponent },
  { path: 'book-detail', component: BookDetailComponent },
  { path: 'book-filter', component: BookFilterComponent },
  { path: 'book-new', component: BookNewComponent },
  { path: 'book-update', component: BookUpdateComponent },
  { path: 'book-delete', component: BookDeleteComponent },
  { path: 'fashions', component: FashionComponent },
  { path: 'fashion-detail', component: FashionDetailComponent },
  { path: 'fashion-new', component: FashionNewComponent },
  { path: 'fashion-update', component: FashionUpdateComponent },
  { path: 'fashion-delete', component: FashionDeleteComponent },
  { path: 'fashion-search', component: FashionSearchComponent },
  { path: 'fashion/:slug', component: FashionSlugComponent },
  { path: 'search-fashion', component: SearchFashionComponent },
  { path: 'homework.html', component: Homework },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
