import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListDropdownComponent } from './product-list-dropdown-component';

describe('ProductListDropdownComponent', () => {
  let component: ProductListDropdownComponent;
  let fixture: ComponentFixture<ProductListDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListDropdownComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
