

import { test, expect } from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';

test.beforeEach( async ({ loginPage,  }) => {
    await loginPage.goToLoginPage();
});



test('login page title test', async ({loginPage}) =>  {
    const pageTitle = await loginPage.getPageTitle(); //getPageTitle() is coming From Base page
    console.log('login page title: ', pageTitle);
    expect(pageTitle).toBe('Account Login');   //assertion
});



test('forgot pwd link exists', async ({loginPage}) =>  {
    expect (await loginPage.isForgotPasswordLinkExists()).toBeTruthy();
   });



   test('user is able to login to app test', async ({ loginPage, homePage }) =>  {
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    expect.soft(await homePage.isLogoutLinkExists()).toBeTruthy(); // checking logout link to make sure we are on homepage
    expect.soft(await homePage.getPageTitle()).toBe('My Account'); //getPageTitle() coming from parent base page
});

//DD_1: with fixtuers: running in sequencial mode: only 1 test running with test data one by one using testData fixture so avoid mainting the testdata inside fixture file
test('login to app using wrong credentials with Data driven test', async ({ loginPage, testData }) =>  {
 for (let row of testData) {
           await loginPage.doLogin(row.username, row.password);
           expect(await loginPage.isForgotPasswordLinkExists()).toBeTruthy();
    }
});

//DD_2: without Fixtures: parallel mode. read csv data directly and loop the test method row wise
        let testData = CsvHelper.readCsv('src/data/logindata.csv');
        for(let row of testData){
            test(`invalid login test - ${row.username} - ${row.password}`, async ( {loginPage}) => {
                 await loginPage.doLogin(row.username, row.password);
                 expect(await loginPage.isForgotPasswordLinkExists()).toBeTruthy();
            })
        };



        
//MS excel - office latest
//xlsx format
//maintenance
let loginTestData = ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx');
for (let row of loginTestData) {
    test(`invalid login test with excel data - ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDispalayed()).toBeTruthy();

    });
};



let loginJSONData = JsonHelper.readJson("src/data/logindata.json");
for (let row of loginJSONData) {
    test(`invalid login test with JSON data - ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDispalayed()).toBeTruthy();
    });
};



//common test method: we can have it and use it all the spec classes
test('comp logo exists on product page', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('footers exist on product page', async ({ basePage }) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
});



//csv vs excel vs json
// To run on stage env this is the cmd need to run in powershell    $env:ENV="stage"; npx playwright test tests/loginpagefix.spec.ts