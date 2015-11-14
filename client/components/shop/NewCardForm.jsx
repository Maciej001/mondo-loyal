NewCardForm = React.createClass({
  propTypes: {
    parentStateUpdate: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      logo: "",
      cardHeader: "Card Header",
      cardDescription: "Card Description",
      cardSlogan: "Another tiny slogan or description",
      stampsNumber: 8,
      stamps: [],
      error: false
    }
  },

  componentDidMount() {
    self = this;
    // Slider 
    let stampsSlider = ReactDOM.findDOMNode( this.refs.slider );

    noUiSlider.create(stampsSlider, {
      start: 6,
      step: 1,
      animate: true,
      connect: 'lower',
      range: {
        'min': [1],
        'max': [12]
      }
    });

    // initial call to display stamps;
    this.changeStampsNumber();

    stampsSlider.noUiSlider .on('slide', (e, val) => {
      this.changeStampsNumber();
    });

    stampsSlider.noUiSlider .on('change', (e, val) => {
      this.changeStampsNumber();
    });

  },

  changeLogo(e) {
    let logoURL = this.refs.logo.value;
    this.setState({ logo: logoURL });
  },

  changeCardHeader() {
    let cardHeader = this.refs.cardHeader.value;
    this.setState({ cardHeader: cardHeader });
  },

  changeCardDescription() {
    let cardDescription = this.refs.cardDescription.value;
    this.setState({ cardDescription: cardDescription });
  },

  changeCardSlogan() {
    let cardSlogan = this.refs.cardSlogan.value;
    this.setState({ cardSlogan: cardSlogan });
  },

  changeStampsNumber() {
    let stampsSlider = ReactDOM.findDOMNode( this.refs.slider );
    let stampsNumber = Math.round( stampsSlider.noUiSlider.get() );
    this.setState({ stampsNumber: stampsNumber });
    
    let stamps = [];
    for(i = 0; i < this.state.stampsNumber; i++) {
      stamps.push(<i className="glyphicon glyphicon-ok card-stamps"></i>);
    }

    this.setState({ stamps: stamps }); 
  },


  createCard(e) {
    e.preventDefault(); 

    let newCard = {
      shopId:           Meteor.userId(),
      logoUrl:          ReactDOM.findDOMNode( this.refs.logoUrl ).value.trim(),
      cardHeader:       ReactDOM.findDOMNode( this.refs.cardHeader ).value.trim(),
      cardDescription:  ReactDOM.findDOMNode( this.refs.cardDescription ).value.trim(),
      cardSlogan:       ReactDOM.findDOMNode( this.refs.cardSlogan ).value.trim(),
      stampsNumber:     this.state.stampsNumber
    }

    console.log(newCard);

    let error = "";

    if (newCard.logoUrl == "") {
      error += "Logo URL is missing.\n";
    }
    if (newCard.cardHeader == "") {
      error += "Card Header is missing.\n";
    }
    if (newCard.cardDescription == "") {
      error += "Card Description is missing.\n";
    }
    if (newCard.cardSlogan == "") {
      error += "Card Slogan is missing.\n";
    }

    this.setState({ error: error });
    console.log("error var : ", error);
    console.log("any errors" + this.state.error );

    if ( !error ) {
      this.setState({ error: false });
      Meteor.call("createNewCard", newCard);
    }

  },

  cancel(e) {
    e.preventDefault();

    args = {
      addingCard: false
    }

    this.props.parentStateUpdate(args);
  },

  render() {

    return (
      <div id="new-card">
        
        <h1 className="header-grey">New Card</h1>   
        
        <div className="row">
          <div className="col-xs-12 col-md-6">

            <form id="new-card-form" role="form" onSubmit={ this.createCard }>
              
              { this.state.error ?
                <h4 className="error-msg">{ this.state.error }</h4>
                : ""
              }

              <div className="form-group">
                <input type="text" ref="logoUrl" className="form-control" id="logo" placeholder={ this.state.logo } onChange={ this.changeLogo }/>
              </div>
              <div className="form-group">
                <input type="text" ref="cardHeader"  className="form-control" id="card-header" placeholder={ this.state.cardHeader } onChange={ this.changeCardHeader }/>
              </div>

              <div className="form-group">
                <input type="text" ref="cardDescription"  className="form-control" id="card-description" placeholder={ this.state.cardDescription } onChange={ this.changeCardDescription }/>
              </div>

              <div className="form-group">
                <input type="text" ref="cardSlogan"  className="form-control" id="card-slogan" placeholder={ this.state.cardSlogan } onChange={ this.changeCardSlogan }/>
              </div>

              <div id="stamps-slider-group" className="form-group">
                <label>Number of stamps { this.state.stampsNumber }</label>              
                <div id="stamps-slider" ref="slider"></div>
              </div>

              <button id="card-save" type="submit" className="btn btn-submit">Save</button>
              <button id="card-cancel" className="btn btn-cancel" onClick={ this.cancel }>Cancel</button>
            </form>

          </div>

          <div id="card" className="col-xs-12 col-md-5 col-md-offset-1">
            <div className="card-header">
              <div className="card-logo-wrapper">
                { this.state.logo ? 
                  <img src={ this.state.logo } alt="" className="card-logo" />
                : "" }
              </div>
              <div className="card-header-wrapper">
                <h3>{ this.state.cardHeader }</h3>
                <h5>{ this.state.cardDescription }</h5>
              </div>
            </div>

            <div className="card-info">
              <h5>{ this.state.cardSlogan }</h5>
              <div className="card-stamps-wrapper">
                { this.state.stamps.map(( stamp ) => {
                    return stamp; // each stamp is an icon
                  })
                }
              </div>

            </div>

          </div>
        </div>  

      </div>
    )
  }
})
  