Card = React.createClass({

  deleteCard() {
    Meteor.call("deleteCard", this.props.card._id);
  },

  render() {

    let stamps = [];
    for(let i = 0; i < this.props.card.stampsNumber; i++) {
      stamps.push(<i className="glyphicon glyphicon-ok card-stamps"></i>);
    }

    return (

        <div className="col-xs-12 card">
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

            <button type="button" className="btn btn-danger btn-lcard" onClick={ this.deleteCard }>Delete Card</button>

          </div>
        </div>  


    )
  }
})
  