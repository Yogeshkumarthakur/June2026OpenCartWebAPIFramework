
import { test, expect } from '@playwright/test';

let AUTH_TOKEN = { Authorization: 'Bearer 7283b6a26a7aefcf44a55a70e0071a29ed81e1bda35d50b1f7b36fed82773473' };


//GET call
test('get user test', async ({ request }) => {

    let response = await request.get('https://gorest.co.in/public/v2/users/8515188', {
        headers: AUTH_TOKEN
    });

    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);

});


//POST call
test('create a user test', async ({ request }) => {

    //JS Object
    let userData = {
        name: 'uday',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };

    //JS Object to JSON: Serialization
    let response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    });

    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());//201
    console.log(response.statusText()); //Created
});



//PUT Call
test('Update a user test', async ({ request }) => {

    //JS Object
    let userData = {
        name: 'uday101',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };

    //JS Object to JSON: Serialization
    let response = await request.put('https://gorest.co.in/public/v2/users/8515395', {
        headers: AUTH_TOKEN,
        data: userData
    });

    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());//200
    console.log(response.statusText()); //OK
});




//DELETE Call
test('Delete a user test', async ({ request }) => {


    //JS Object to JSON: Serialization
    let response = await request.delete('https://gorest.co.in/public/v2/users/8515395', {
        headers: AUTH_TOKEN,
    });

    console.log(response.status());//204
    console.log(response.statusText()); //No Content
});