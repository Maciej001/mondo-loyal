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
  }


});