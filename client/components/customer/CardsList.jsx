CardsList = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    let cardsSub = Meteor.subscribe('cards');

    return {
      cardsLoaded:  cardsSub.ready(),
      cards:        Cards.find().fetch()
    }
  },

  render() {
    let self = this;

    return (


        <div className="container">
          <div className="row cards-list-row">

            { this.data.cards.map( function( card ) {       

                return (
                  <div className="col-xs-12 col-md-6">
                    <LCard card={ card } key={ card._id } />
                  </div>
                )

              })
            }

          </div>
        </div>

      
    )
  }
})
  