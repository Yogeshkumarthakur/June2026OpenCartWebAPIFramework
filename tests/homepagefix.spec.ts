



import { test, expect } from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';


//hooks:
test.beforeEach( async ({ loginPage }) => { //before each method will run
  
    await loginPage.goToLoginPage(); //goto login page
    await loginPage.doLogin('yt@open.com','pw1234'); //perform the

});

//writing the TC
test('home page title test', async ({homePage}) =>  {
    const pageTitle = await homePage.getPageTitle();// capture the title of homepage from Base page(parent)
    console.log('home page title: ', pageTitle); //priting on console
    expect(pageTitle).toBe('My Account');   //asserting it
});



test('logout link exist test', async ({homePage}) =>  {
    expect(await homePage.isLogoutLinkExists()).toBeTruthy();
});


test('homepage headers exist test', async ({homePage}) =>  {
    let allHeaders = await homePage.getHomePageHeader() //all header will retrun array so lets print on console
    console.log('home page headers :', allHeaders);
    expect.soft(allHeaders).toHaveLength(4); //assertion of total lenght 4 header should be there
    expect.soft(allHeaders).toEqual([       //assertion of exact text
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);

});




//common test method: we can have it and use it all the spec classes
test('comp logo exists on product page', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('footers exist on product page', async ({ basePage }) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
});

