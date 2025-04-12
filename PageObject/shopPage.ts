import { Page, expect } from "@playwright/test";

class ShopPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async findProduct(product: string): Promise<void> {
    await this.page.locator("#woocommerce-product-search-field-0").fill(product);
    await this.page.keyboard.press("Enter");
  }

  async gatherProductInfoFromShopPage(productIndex: number): Promise<Array<{name: string; price: string}>> {
    const listofProductInfo: Array<{name: string; price: string}> = [];
    const name = this.page.locator("h2[class='woocommerce-loop-product__title']").nth(productIndex).textContent();
    const price = this.page.locator("span[class='woocommerce-Price-amount amount']").nth(productIndex).textContent();
    return listofProductInfo;
  }

  async isProductSearched(): Promise<void> {}

  async selectCategoryOfProduct(number: number): Promise<void> {
    /**
     * 1 - "Windsurfing"
     * 2 - "Wspinaczka"
     * 3 - "Yoga i pilates"
     * 4 - "Żeglarstwo"
     */
    const option = number - 1;
    await this.page.locator("h2[class='woocommerce-loop-category__title']").nth(option).click();
    const url = this.page.url();
  }
}

export default ShopPage;
