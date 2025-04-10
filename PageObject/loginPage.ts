import { test, Page } from "@playwright/test";
import newUser from "../fixtures/newUser.json";

class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillLogInEntryFields(user: any): Promise<void> {
    await this.page.locator("input[id='username']").pressSequentially(user.email, { delay: 100 });
    await this.page.locator("input[id='password']").pressSequentially(user.password, { delay: 100 });
    await this.page.locator("button[value='Zaloguj się']").click({ force: true });
  }

  async fillSignUpEntryFields(user: any): Promise<void> {
    await this.page.locator("input[id='reg_email']").pressSequentially(user.email, { delay: 100 });
    await this.page.locator("input[id='reg_password']").pressSequentially(user.password, { delay: 100 });
    await this.page.locator("button[value='Zarejestruj się']").click({ force: true });
  }
}

export default LoginPage;
