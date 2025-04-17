import { test, Page } from "@playwright/test";

class CartPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async areAddedProductsVisible(): Promise<void> {}
}

export default CartPage;
