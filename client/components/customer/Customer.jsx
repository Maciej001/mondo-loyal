Customer = React.createClass({

  getInitialState() {
    return {
      panel: "my-cards"
    }
  },

  switchToYourCards() {
    this.setState({ panel: "my-cards" });
  },

  switchToOtherCards() {
    this.setState({ panel: "other-cards" });
  },

  render() {
    let yourCardsClass = this.state.panel === "my-cards" ? "btn btn-primary btn-lg btn-sw" : "btn btn-lg btn-sw";
    let otherCardsClass = this.state.panel === "other-cards" ? "btn btn-primary btn-lg btn-sw" : "btn btn-lg btn-sw";

    return (
      <div className="container-fluid user-panel">
        <div className="container">

          <div id="user-menu" className="row">
            <div className="col-xs-12">
              <button type="button" className={ yourCardsClass } onClick={ this.switchToYourCards }>Your Cards</button>
              <button type="button" className={ otherCardsClass } onClick={ this.switchToOtherCards }>All Cards</button>
            </div>
          </div>

          { this.state.panel === "my-cards" ?
            <CustomerCardsList />
          : 
            <CardsList />
          }  

        </div>
      </div>
    )
  }

})
