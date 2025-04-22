import { test, Page, expect } from "@playwright/test";

class CartPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async verifyProductDetails(productIndex: number, price: string, quantity: string): Promise<void> {
    const cartPrice = await this.page.locator("td[class='product-price'] > span > bdi").nth(productIndex).textContent();
    const cartQuantity = await this.page.locator("div[class='quantity'] > input").nth(productIndex).inputValue();
    expect(price).toEqual(cartPrice);
    expect(quantity).toEqual(cartQuantity);
  }
}

export default CartPage;
