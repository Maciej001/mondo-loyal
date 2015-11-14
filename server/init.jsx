Meteor.startup(() => {

  // Add users 
  if ( Meteor.users.find().count() == 0 ) {

    let users = [
      { name: "Pret a Manger", email: "info@pretamanger.com", roles: ["shop"] },
      { name: "Starbucks", email: "customer_service@starbucks.com", roles: ["shop"] },
      { name: "Department of Coffee", email: "info@departmentofcoffee", roles: ["shop"] },
      { name: "Maciej", email: "maciej@gmail.com", roles: ["user"] }
    ]

    _.each(users, (user) => {
      
      let userId = Accounts.createUser({
        email:  user.email,
        name:   user.name,
        password: '123'
      });

      Roles.addUsersToRoles(userId, user.roles);

    });
  }
});

