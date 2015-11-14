SignUp = React.createClass({


  getInitialState() {
    return {
      error: false
    }
  },

  cancel(e) {
    e.preventDefault();
    FlowRouter.go("/")
  },

  signUp(e) {
    e.preventDefault();

    let user = {
      email:    ReactDOM.findDOMNode( this.refs.email ).value.trim(),
      password: ReactDOM.findDOMNode( this.refs.password ).value.trim()
    }

    Accounts.createUser( user, ( error, result ) => {
      if ( error ) {
        this.setState({ error: "" + error });
        console.log(this.state.error);
      } else {

        if ( this.state.error ) this.setState({ error: false});
        FlowRouter.go("/");
      }
    });

  },

  render() {
    return (
      <div className="container">
        <div id="signin">

            <h4> Signup with Email</h4> 
            { this.state.error ?
              <h4 className="error-msg">{ this.state.error }</h4>
              : ""
            } 
            <form role="form" onSubmit={ this.signUp }>
              <div className="form-group">
                <input type="email" ref="email" className="form-control" id="email" placeholder="Your Email Address"/>
              </div>
              <div className="form-group">
                <input type="password" ref="password" className="form-control" id="pwd" placeholder="Your Password"/>
              </div>

              <button type="submit" className="btn btn-submit">Create account</button>
              <button className="btn btn-cancel" onClick={ this.cancel }>Cancel</button>
            </form>


        </div>    

      </div>
    )
  }
})
