import { expect, Page, Locator } from "@playwright/test";

class ProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCartFromProductPage(quantity?: any): Promise<void> {
    if (typeof quantity === "number") {
      const quantityInput = this.page.locator("input[name='quantity']");
      await quantityInput.clear();
      await quantityInput.fill(quantity.toString());
    }
    await this.page.locator("button[name='add-to-cart']").click({ force: true });
  }

  async verifyProduct(name: string): Promise<void> {
    const productName = await this.page.locator("h1[class='product_title entry-title']").textContent();
    expect(productName).toContain(name);
  }
}

export default ProductPage;
