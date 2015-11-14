SignIn = React.createClass({

  getInitialState() {
    return {
      error: false
    }
  },

  cancel(e) {
    e.preventDefault();
    FlowRouter.go("/");
  },

  validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  },

  signIn(e) {
    e.preventDefault();

    let user = {
      email:    ReactDOM.findDOMNode( this.refs.email ).value.trim(),
      password: ReactDOM.findDOMNode( this.refs.password ).value.trim()
    }

    if ( this.validateEmail( user.email ) ) {

      Meteor.loginWithPassword( user.email, user.password, (error) => { 
        if (error) {
          this.setState({ error: "" + error.reason });
        } else {
          if (this.state.error) { this.setState({ error: false }); }

          if (Roles.userIsInRole(Meteor.userId(), ["shop"])) {
            FlowRouter.go("/shop");  
          } else {
            FlowRouter.go("/user");
          }
          
        }
      });
    } else {
      this.setState({ error: "Wrong email" });
    }
  },

  render() {
    return (
      <div className="container">
        <div id="signin">

            <h4> Signin to your Mondo Loyal account</h4>
            { this.state.error ?
              <h4 className="error-msg">{ this.state.error }</h4>
              : ""
            }
            <form role="form" onSubmit={ this.signIn }>
              <div className="form-group">
                <input type="email" ref="email" className="form-control" id="email" placeholder="Your Email Address"/>
              </div>
              <div className="form-group">
                <input type="password" ref="password"  className="form-control" id="pwd" placeholder="Your Password"/>
              </div>

              <button type="submit" className="btn btn-submit">Signin</button>
              <button className="btn btn-cancel" onClick={ this.cancel }>Cancel</button>
            </form>


        </div>    

      </div>
    )
  }
})
