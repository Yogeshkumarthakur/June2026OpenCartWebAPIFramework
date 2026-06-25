

import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    //private Locators
   
    private readonly logoutlink: Locator;
    private readonly headers: Locator;
  

    //we are creating the const...of the class LoginPage: to init the above locators
    constructor(page: Page) {
        super(page);       
        this.logoutlink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', {level: 2});
      
    };


        //public page actions(methods)/behaviors of the page

        async isLogoutLinkExists(): Promise <boolean> {
          return await this.logoutlink.isVisible();
        }

        async getHomePageHeader(): Promise<string[]>{
        return await this.headers.allInnerTexts();
         
         }

        async doSearch(searchkey: string): Promise<void> {
        console.log(`search key: ${searchkey}`);
        await this.searchBox.fill(searchkey);
        await this.searchIcon.click();
    }

    } 



