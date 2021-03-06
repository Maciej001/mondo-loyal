Meteor.publish('userData', () => {
  return Meteor.users.find();
})

Meteor.publish('cards', () => {
  return Cards.find();
});

Meteor.publish('cardsItem', ( cardId ) => {
  return Cards.find({ _id: cardId });
});

Meteor.publish('customerCards', ( userId ) => {
  return CustomerCards.find({ customerId: userId });
});

Meteor.publish('transactions', (account_id) => {
  return Transactions.find({ account_id: account_id });
})