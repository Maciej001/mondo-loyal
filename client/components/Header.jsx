Header = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      admin: this.isAdmin()
    }
  },

  isAdmin() {
    let user = Meteor.user();
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },

  goToAdmin() {
    FlowRouter.go('/admin');
  },

  handleSignIn(e) {
    e.preventDefault(); 
    FlowRouter.go("/signin");
  },

  handleSignOut() {
    Meteor.logout((error, success) => {
      if (error) console.log(error);
      FlowRouter.go("/");
    });
  },

  render() {  

    return (  
      <nav id="menu">
        <a className="logo" href="/">Mondo Loyal</a>
        { this.data.currentUser ? 
          <a className="sign-out sign-out-in" href="#" onClick={ this.handleSignOut }>Sign out</a>
        :  
          <a className="sign-in sign-out-in" href="#" onClick={ this.handleSignIn }>Sign in</a>
        }

        { this.data.admin ? 
          <a className="admin" href="#" onClick={ this.goToAdmin }>Admin</a>
          : ""
        }
      </nav>
    ) 
  }
    
});

