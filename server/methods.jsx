Meteor.methods({

  createNewCard(card) {

    //   shopId:           
    //   logoUrl:          
    //   cardHeader:       
    //   cardDescription:  
    //   cardSlogan:       
    //   stampsNumber:     

    Cards.insert(card);

  },

  addCardToCustomer( newCard ) {
    CustomerCards.insert(newCard);
  },

  deleteCard( id ) {
    Cards.remove( id );
  },

  removeCardFromWallet( id ) {
    CustomerCards.remove( id );
  },

  getCard(merchant) {
    return Cards.findOne({ cardHeader: marchant });
  },

  getCustomerCard(card) {
    return CustomerCards.findOne({ cardId: card._id, customerId : this.userId });
  },

  addStamp(marchant) {
    console.log('getting card for :' + marchant);
    Meteor.call("getCard", marchant, (error, card) => {
      if (error) {
        console.log("Card not found");
      } else {
        Meteor.call("getCustomerCard", card, (error, customerCard) => {
          if (error) {
            console.log("error getting customerCard")
          } else {
            CustomerCards.update(customerCard._id, { $inc: { stampsCurrent: 1 } });
          }
        })
      }
    });

  },

  getAccount(access_token) {
    let accountUrl = "https://api.getmondo.co.uk/accounts"
    let accessTokenString = 'Bearer ' + access_token;
    

    HTTP.get(
      accountUrl, 
      { 
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': accessTokenString }
      }, 
      (error, results) => {
        if (error) {
          console.log("Error getting account number :"  + error);
        } else {

          Meteor.users.update(this.userId, {$set: {
            accountId: results.data.accounts[0].id,
            accountDescription: results.data.accounts[0].description
          }})
        }
    });
  }, 

  getAuthorisationToken() {
    console.log("Authenticating...");
    let authUrl = "https://api.getmondo.co.uk/oauth2/token";

    let params = {
      grant_type:       'password',
      client_id:        CLIENT_ID,
      client_secret:    CLIENT_SECRET,
      username:         Meteor.user().emails[0].address,
      password:         'korek001'
    }

    // Get access token
    HTTP.post(
      authUrl, 
      { 
        params: params, 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }, 
      (error, results) => {
        if (error) {
          console.log("Error getting auth :"  + error);
        } else {
          console.log("Authorization token: " + results.data.access_token)

          // Save access_token and user_id to User
          Meteor.users.update(this.userId, {$set: {
            access_token: results.data.access_token,
            user_id: results.data.user_id
          }});

          Meteor.call('getAccount', results.data.access_token, (error, success) => {
            if (error) {
              console.log('problems with getting account : ');
            } else {

              Meteor.call("registerWebHook", results.data.access_token);
            }
          });
        }
    });
  },

  registerWebHook(access_token) {
    let hookUrl = "https://api.getmondo.co.uk/webhooks";

    console.log("registering Web Hook for " + access_token);

    let params = {
      account_id: Meteor.user().accountId,
      url:        "http://mondo-loyal.meteor.com/api/transactions"
    }

    let accessTokenString = 'Bearer ' + access_token;

    HTTP.post(
      hookUrl, 
      { 
        params: params, 
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': accessTokenString }
      }, 
      (error, results) => {
        if (error) {
          console.log("Error registering hook :"  + error);
        } else {

          Meteor.users.update(this.userId, {$set: {
            webhookId: results.data.webhook.id,
            webhookUrl: results.data.webhook.url
          }})
        }
    });

  }



});