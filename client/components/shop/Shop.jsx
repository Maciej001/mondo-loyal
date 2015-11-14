Shop = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let cardsSub = Meteor.subscribe('cards');

    return {
      cardsLoaded: cardsSub.ready(),
      anyCards: () => Cards.find({ shopId: Meteor.userId() }).count() >= 1,
      cards: () => Cards.find({ shopId: Meteor.userId() }).fetch()
    }
  },

  componentDidMount() {

  },

  getInitialState() {
    return {
      displayNewCardForm: false,
      addingCard: false,
    }
  },

  addNewCard() {
    this.setState({ 
      addingCard: true
    });

  },

  parentStateUpdate(args) {
    this.setState({ 
      addingCard: args.addingCard
    });
  },

  render() {

    return (
      <div className="container shop-panel">
        
        <div className="row shop-buttons">
          <div className="col-xs-12">
            <button className="btn btn-primary btn-lg" role="button" onClick={ this.addNewCard }>
              <i className="glyphicon glyphicon-plus"></i>
              New Card
            </button>
          </div>
        </div>

        { this.state.addingCard ?
          <NewCardForm parentStateUpdate={ this.parentStateUpdate }/>
          : ""
        }

        <div id="cards-list" className="row">
          <div className="col-xs-12">

          { this.data.anyCards() && this.data.cardsLoaded ?

            { this.data.cards().map( function(card) {
                return <Card card={ card } key={ card._id }/>
              })

            }                

            : <h4>Let's add New Card!</h4>

          }

          </div>
        </div>
        
      </div>
    )
  }
})
