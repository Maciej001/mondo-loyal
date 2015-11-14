CustomerCardsList = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    let customerCardsSub = Meteor.subscribe('customerCards', Meteor.userId() );

    return {
      customerCardsLoaded:  customerCardsSub = customerCardsSub.ready(),
      customerCards:        CustomerCards.find().fetch(),
      ownsCards:            CustomerCards.find().count() >= 1
    }
  },

  render() {
    return (
      <div>
        { this.data.customerCardsLoaded ? 
          <div id="my-cards" className="row">
            <div className="col-xs-12">

              { this.data.ownsCards ?
                <div>
                  { this.data.customerCards.map(( card ) => {
                     return (
                        <div className="col-xs-12 col-md-6">
                          <CustomerCard card={ card } />
                        </div>
                      )
                    })
                  }
                </div>
                :
                <h2>Your wallet is empty. Go to All Cards and add cards.</h2>
              }
              
              
            </div>
          </div>

        : "Loading..." }

      </div>
    )
  }
})
  