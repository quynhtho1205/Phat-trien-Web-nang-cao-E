import { Injectable } from '@angular/core';
import { Product } from '../classes/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Coca Cola',
      price: 10.99,
      image_link:
        'https://bizweb.dktcdn.net/thumb/large/100/469/765/products/1503-9de8f3562b364e56b550ff30bc493122-2c0db7cc76fd4b7f8b3c767fb24bc277-d4f804d8fc474b4bae5f628ff0d632e0-master.jpg',
    },
    {
      id: 2,
      name: 'Pepsi',
      price: 19.99,
      image_link:
        'https://product.hstatic.net/1000288770/product/nuoc_ngot_pepsi_cola_lon_330ml_5d1df64d846f4f93aa666c723cea177d_compact.jpg',
    },
    {
      id: 3,
      name: 'Sprite',
      price: 5.49,
      image_link: 'https://horeco.vn/cdn/shop/files/nuoc-ngot-sprite-320ml.jpg?v=1763612869&width=990',
    },
    {
      id: 4,
      name: 'Fanta',
      price: 15.75,
      image_link:
        'https://product.hstatic.net/1000186075/product/nuoc-ngot-vi-cam-coca-cola-fanta-orange-500ml-24_e5263e90be004b758f4ac77af1cc9623_master.jpg',
    },
    {
      id: 5,
      name: 'Red Bull',
      price: 8.25,
      image_link:
        'https://bizweb.dktcdn.net/100/514/431/products/nuoc-tang-luc-redbull-lon-250ml-15112018162747.jpg?v=1716431078530',
    },
  ];

  getProductList(): Product[] {
    return this.products;
  }

  filterProductListByPrice(min: number, max: number): Product[] {
    return this.products.filter((p) => p.price >= min && p.price <= max);
  }
}