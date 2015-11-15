Meteor.startup(() => {

  CLIENT_ID =       Meteor.settings.private.CLIENT_ID;
  CLIENT_SECRET =   Meteor.settings.private.CLIENT_SECRET;

  // Add users 
  if ( Meteor.users.find().count() == 0 ) {

    let users = [
      { name: "Pret a Manger", email: "info@pretamanger.com", roles: ["shop"] },
      { name: "Starbucks", email: "customer_service@starbucks.com", roles: ["shop"] },
      { name: "Department of Coffee", email: "info@departmentofcoffee.com", roles: ["shop"] },
      { name: "Maciej", email: "maciej@gmail.com", roles: ["user"] },
      { name: "Maciej", email: "m.nowakowskipl@gmail.com", roles: ["user"]}
    ]

    _.each(users, (user) => {
      
      let userId = Accounts.createUser({
        email:  user.email,
        name:   user.name,
        password: 'korek001'
      });

      Roles.addUsersToRoles(userId, user.roles);

    });
  }


  // Restivus

  let Api = new Restivus({
    excludedEndpoins: ['put', 'getAll'],
    endpoints: {
      post: {
        authRequired: false
      }
    },
    userDefaultAuth: true,
  });


  // creates endpoint mondo-loyal@
  Api.addCollection(Transactions);



});

