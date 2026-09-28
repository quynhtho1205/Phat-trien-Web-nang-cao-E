import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListCallService } from './product-list-call-service';

describe('ProductListCallService', () => {
  let component: ProductListCallService;
  let fixture: ComponentFixture<ProductListCallService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListCallService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListCallService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
