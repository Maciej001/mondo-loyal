Meteor.methods({

  createNewCard(card) {
    check(card, {
      shopId:           String,    
      logoUrl:          String,
      cardHeader:       String, 
      cardDescription:  String,
      cardSlogan:       String,
      stampsNumber:     Number
    })
    //   shopId:           
    //   logoUrl:          
    //   cardHeader:       
    //   cardDescription:  
    //   cardSlogan:       
    //   stampsNumber:     

    Cards.insert(card);

  }

});