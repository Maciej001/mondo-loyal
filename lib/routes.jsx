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

FlowRouter.route('/admin', {
  name: 'Admin',
  action(params) {
    ReactLayout.render(MainLayout, {
      content: <Admin />
    })
  }
});