NotFound = React.createClass({
  goHome() {
    FlowRouter.go('/');
  },

  render() {
    return (
      <div id="not-found" className="container">
        <h2>Sorry, route not found</h2>
        <p><a className="btn btn-primary btn-lg" href="#" role="button" onClick={ this.goHome }>Home</a></p>
      </div>
    )
  }
})