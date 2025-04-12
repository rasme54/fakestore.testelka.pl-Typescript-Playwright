import { Page, expect } from "@playwright/test";
import Utils from "../PageObject/utils";

class HomePage {
  private page: Page;
  private utils: Utils;

  constructor(page: Page, utils: Utils) {
    this.page = page;
    this.utils = utils;
  }

  async selectSubpageFromHeaderNavigtion(number: number): Promise<void> {
    /**
     * Navigates to a specific subpage
     * 1 - Main Page
     * 2 - Shop
     * 3 - Orders
     * 4 - Cart
     * 5 - My Account
     * 6 - Wishlist
     */
    const option = number - 1;
    await this.page.locator("#menu-menu > li > a").nth(option).click();
  }
}

export default HomePage;
