Cards = new Mongo.Collection('cards');
CustomerCards = new Mongo.Collection('customerCards');
Transactions = new Mongo.Collection('transactions');

Transactions.after.insert(function (userId, doc) {  
  let customerCard = '';

  if (doc.data.description === 'Starbucks') marchant = 'Starbucks Coffee';
  if (doc.data.description === 'Pret a Manger') marchant = 'Pret A Manger';
  if (doc.data.description === 'Department Of Coffee And Social Affairs') marchant = 'Department Of Coffee';
  console.log("marchant: " + marchant );

  CustomerCard.update({_id: "ZzubfBaxqyGXjN2yq"}, { $inc: { stampsCurrent: 1 }});

});