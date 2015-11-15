Hooks = React.createClass({
  render() {

    return (
      <div className="container">
        <h3>{Meteor.user().emails[0].address}</h3>
        <h3>{Meteor.user().access_token}</h3>
        <h3>{Meteor.user().user_id}</h3>


      </div>
    )
  }
})
  