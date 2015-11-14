Home = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },

  signup(e) {
    e.preventDefault();
    FlowRouter.go('/signup');
  },

  render() {
    return (
      <div className="home-page">
        <div className="container">
          <h1>Welcome to Mondo Loyal</h1>
          <p>
          As a company create a loyalty card. As client use Mondo and loyalty cards stamps 
          add up automaticaly, so you don't have to remember. Get treat from time to time for FREE.
          </p>
          { this.data.currentUser ? 
            ""
          :
            <p><a className="btn btn-primary btn-lg" href="#" role="button" onClick={ this.signup }>Sign Up</a></p>
          }

        </div>
      </div>
    )
  }
})
