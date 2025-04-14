import { expect, Page } from "@playwright/test";

class ProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyProduct(name: string): Promise<void> {
    const productName = await this.page.locator("h1[class='product_title entry-title']").textContent();
    expect(productName).toContain(name);
  }
}

export default ProductPage;
