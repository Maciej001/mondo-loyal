Meteor.publish('userData', () => {
  return Meteor.users.find();
})

Meteor.publish('cards', () => {
  return Cards.find();
});