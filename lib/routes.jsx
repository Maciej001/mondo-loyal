FlowRouter.route('/',{
  name: 'Home', 
  action(params) {
    ReactLayout.render(MainLayout, { 
      content:  <Home />
    });
  }
});

FlowRouter.notFound = {
  action() {
    ReactLayout.render(MainLayout, { 
      content:  <NotFound />
    });
  }
};

FlowRouter.route('/signup',{
  name: 'Signup', 
  action(params) {
    ReactLayout.render(MainLayout, { 
      content:  <SignUp />
    });
  }
});

FlowRouter.route('/signin',{
  name: 'Home', 
  action(params) {
    ReactLayout.render(MainLayout, { 
      content:  <SignIn />
    });
  }
});

FlowRouter.route('/shop', {
  name: 'Shop',
  action(params) {
    ReactLayout.render(MainLayout, {
      content: <Shop />
    })
  }
});

FlowRouter.route('/user', {
  name: 'User',
  action(params) {
    ReactLayout.render(MainLayout, {
      content: <Customer />
    })
  }
});