CustomerCard = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    let fullCardSub = Meteor.subscribe('cards');

    return {
      fullCardLoaded:    fullCardSub.ready(),
      fullCard:          Cards.findOne({ _id: this.props.card.cardId })
    }
  },

  deleteCard() {
    if (Meteor.userId() === this.props.card.customerId ) {

      Meteor.call("removeCardFromWallet", this.props.card._id, (error, result) => {
          if (error) {
            console.log("Error when deleting Existing Customer Card.");
          } else {
            Bert.alert({
              title: 'Card removed from Your Wallet!',
              type: 'warning',
              icon: 'fa-credit-card'
            });
          }
      });
    }
  },

  render() {
    let hasCard = false;

    let stamps = [];
    // Add actual stamps
    for(let i = 0; i < this.props.card.stampsCurrent; i++) {
      stamps.push(<i className="glyphicon glyphicon-ok card-stamps"></i>);
    }

    // Add stamps
    for(let i = this.props.card.stampsCurrent; i < this.props.card.stampsNumber; i++) {
      stamps.push(<i className="glyphicon glyphicon-ok card-stamps card-stamps-empty"></i>);
    }

    return (
      <div>
        { this.data.fullCardLoaded?
          <div className="single-card">
            <div className="card-header">

              <div className="card-logo-wrapper">
                <img src={ this.data.fullCard.logoUrl} alt="" className="card-logo" />
              </div>

              <div className="card-header-wrapper">
                <h3>{ this.data.fullCard.cardHeader }</h3>
                <h5>{ this.data.fullCard.cardDescription }</h5>
              </div>
            </div>

            <div className="card-info">
              <h5>{ this.data.fullCard.cardSlogan }</h5>
              <div className="card-stamps-wrapper">
                { stamps.map(( stamp ) => {
                    return stamp;
                  })
                }
              </div>

              <button type="button" className="btn btn-danger btn-lcard" onClick={ this.deleteCard }>Remove Card from Your Wallet</button>
            </div>

          </div>

        : "" }
      </div>

    )
  }
})
  