const { MessengerClient } = require('messaging-api-messenger');

// get accessToken from facebook developers website
const accessToken =
  'EAAIESRzf86cBAB2PBZCPWHM7ugEsmScnZA4eOE6Sb401YZApHOXeBaCxYO1sv8l1yDSKlL6Kj4g7ZAPslRZB3gli4V4zJpTfRr8uIUZCBs6ujGGdj9TGvUNuOBgckazeZBwqXbUl7bJtUI0VCIgk8Vbq2CIiu8ZAniADN2xJm7LKgfQ902Gjo1jB';
const appSecret = '';
const client = MessengerClient.connect({ accessToken, version: 'v3.1' });

module.exports = function(options = {}) {
  return function(hook) {
    const USER_ID = '2237680739606502';
    // Activate pages_messaging_phone_number on your Facebook App, This requires approval from FB.
    // You will have to activate the customer matching on your page. It requires you to pay $99 one time cost.
    // const recipient = { 'phone_number': '+8 (490) 846-4299', 'name': { 'first_name': 'Hieu', 'last_name': 'Pham' } };
    const customer = hook.data;

    client
      .sendMessage(USER_ID, {
        text: `${customer.firstName} ${customer.lastName}`,
      })
      .catch(error => {
        console.log(error); // formatted error message
        console.log(error.stack); // error stack trace
        console.log(error.config); // axios request config
        console.log(error.request); // HTTP request
        console.log(error.response); // HTTP response
        return reject(error);
      })
      .then(() => resolve(hook));
  };
};
