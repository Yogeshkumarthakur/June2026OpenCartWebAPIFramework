
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    //private Locators
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly ForgottenPasswordLink: Locator;
    private readonly logo: Locator;
    private readonly loginErrorMessage: Locator;


    //we are creating the const...of the class LoginPage: to init the above locators
    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.ForgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.logo = page.getByAltText('naveenopencart');
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');

    };



        //public page actions(methods)/behaviors of the page
        async goToLoginPage(): Promise<void> {
        await this.page.goto('opencart/index.php?route=account/login');
        }

          async getLoginPageTitle(): Promise<string> {
          return await this.page.title();
        }

          async isForgotPasswordLinkExists(): Promise <boolean> {
          return await this.ForgottenPasswordLink.isVisible();
        }

        async doLogin(username: string, password: string): Promise<void>  {
            console.log(`user creds: ${username} : ${password}`);
            await this.emailId.fill(username);
            await this.password.fill(password);
            await this.loginBtn.click();
        }

        //  async isInvalidLoginErrorDispalayed(): Promise<void> {
        // await this.loginErrorMessage.isVisible();
        
        // }

        async isInvalidLoginErrorDispalayed(): Promise<boolean> {
    return this.loginErrorMessage.isVisible();
}


    }



