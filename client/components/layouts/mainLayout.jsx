MainLayout = React.createClass({

  render() {
    return (
      <div>
        <Header />
        { this.props.content }
      </div>
    )
  }
  
});


