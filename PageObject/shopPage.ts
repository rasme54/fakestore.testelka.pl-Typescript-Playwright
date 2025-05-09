import { Page, expect } from "@playwright/test";

class ShopPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addAllToCartFromShopPage(): Promise<void> {
    const numberOfProducts = await this.page.locator("ul[class='products columns-3'] > li").count();
    for (let i = 0; i < numberOfProducts; i++) {
      await this.page.locator("a[rel='nofollow']").nth(i).click();
    }
  }

  async addProductToCartFromShopPage(locator: string, productIndex: number): Promise<void> {
    await this.page.locator(locator).nth(productIndex).click({ force: true });
  }

  async areSerchedProductsVisible(productName: string): Promise<void> {
    const expectedString = `Wyniki wyszukiwania: „${productName}”`;
    const actualString = await this.page.locator("header[class='woocommerce-products-header'] > h1").textContent();
    expect(actualString).toContain(expectedString);
  }

  async collectProductDetails(index: number): Promise<any[]> {
    let arrayOfProductDetails: any[] = [];
    const price = await this.page.locator("span[class='price'] > span > bdi").nth(index).textContent();
    const quantity = await this.page.locator("ul[class='products columns-3'] > li > a[data-quantity='1']").nth(index).getAttribute("data-quantity");
    arrayOfProductDetails.push(price);
    arrayOfProductDetails.push(quantity);
    return arrayOfProductDetails;
  }

  async findProduct(product: string): Promise<void> {
    await this.page.locator("#woocommerce-product-search-field-0").fill(product);
    await this.page.keyboard.press("Enter");
  }

  async gatherProductInfoFromShopPage(productIndex: number): Promise<any[]> {
    const name = await this.page.locator("h2[class='woocommerce-loop-product__title']").nth(productIndex).textContent();
    let price: string | null;

    const productBlock = this.page.locator("ul[class='products columns-3'] > li").nth(productIndex);
    const parentElement = productBlock.locator("span[class='price']");
    const childElement = parentElement.locator("del[aria-hidden='true']");

    if (childElement != null) {
      price = await childElement.locator("span > bdi").nth(1).textContent();
    } else {
      price = await parentElement.locator("ins > span > bdi").textContent();
    }

    let listOfProductInfo = [name, price];

    return listOfProductInfo;
  }

  async goToProductPage(productIndex: number): Promise<void> {
    const product = "ul[class='products columns-3'] > li > a > h2";
    await this.page.locator(product).nth(productIndex).textContent();
    await this.page.locator(product).nth(productIndex).click({ force: true });
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

  async showProductDetails(productIndex: number): Promise<void> {
    await this.page.locator("ul[class='products columns-3'] > li > a > img").nth(productIndex).click({ force: true });
  }
}

export default ShopPage;
