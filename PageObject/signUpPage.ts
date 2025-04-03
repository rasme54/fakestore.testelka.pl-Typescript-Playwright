import { test, Page } from "@playwright/test";
import newUser from "../fixtures/newUser.json";

class SignUpPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillSignUpForm(): Promise<void> {
    const user = newUser;
    await this.page.locator(".reg_email']").fill(user.email);
  }
}

export default SignUpPage;
