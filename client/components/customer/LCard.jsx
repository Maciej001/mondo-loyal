LCard = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    let customerCardsSub = Meteor.subscribe('customerCards', Meteor.userId() );

    return {
      customerCardsLoaded:    customerCardsSub.ready(),
      customerCards:          CustomerCards.find().fetch(),
      ownsCards:              CustomerCards.find({ customerId: Meteor.userId(), cardId: this.props.card._id }).count() >= 1,
    }
  },

  addCard() { 

    if (Meteor.user()) {
      let customerCard = {
        customerId: Meteor.userId(),
        cardId: this.props.card._id,
        stampsNumber: this.props.card.stampsNumber,
        stampsCurrent: 0
      }

      if (this.data.ownsCard) {
        Bert.alert({
          title: 'You have already this card in your wallet.',
          type: 'danger',
          icon: 'fa-credit-card'
        });     
      } else {
        Meteor.call("addCardToCustomer", customerCard, (error, result) => {
          if (error) {
            console.log("Error when adding New Card.");
          } else {
            Bert.alert({
              title: 'New Card Added',
              message: 'Thanks from ' + this.props.card.cardHeader + '',
              type: 'success',
              icon: 'fa-credit-card'
            });
          }
        });
      }


    }
  },

  render() {
    let hasCard = false;

    let stamps = [];
    for(let i = 0; i < this.props.card.stampsNumber; i++) {
      stamps.push(<i className="glyphicon glyphicon-ok card-stamps"></i>);
    }

    return (
      <div>
        { this.data.customerCardsLoaded ?
          <div className="single-card">
            <div className="card-header">

              <div className="card-logo-wrapper">
                <img src={ this.props.card.logoUrl} alt="" className="card-logo" />
              </div>

              <div className="card-header-wrapper">
                <h3>{ this.props.card.cardHeader }</h3>
                <h5>{ this.props.card.cardDescription }</h5>
              </div>
            </div>

            <div className="card-info">
              <h5>{ this.props.card.cardSlogan }</h5>
              <div className="card-stamps-wrapper">
                { stamps.map(( stamp ) => {
                    return stamp;
                  })
                }
              </div>
              
              

              { this.data.ownsCards ?
                <button type="button" className="btn btn-success btn-lcard">In your Wallet</button>
                : 
                <button type="button" className="btn btn-danger btn-lcard" onClick={ this.addCard }>Add Card To Wallet</button>
              }

            </div>
          </div>

        : "" }
      </div>

    )
  }
})
  