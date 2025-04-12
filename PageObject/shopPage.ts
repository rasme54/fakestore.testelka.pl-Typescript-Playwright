import { Page, expect } from "@playwright/test";

class ShopPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

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
