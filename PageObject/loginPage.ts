import { test, Page } from "@playwright/test";
import newUser from "../fixtures/newUser.json";

class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillSignUpEntryFields(): Promise<void> {
    const user = newUser;
    await this.page
      .locator("input[id='reg_email']")
      .pressSequentially(user.email, { delay: 100 });
    await this.page
      .locator("input[id='reg_password']")
      .pressSequentially(user.password, { delay: 100 });
    await this.page
      .locator("button[value='Zarejestruj się']")
      .click({ force: true });
  }
}

export default LoginPage;
