import React, { Component } from 'react';
import './MemoryCardGame.css';
import GameCardView from './GameCardView';
import MemoryCard from './MemoryCard';
import Alertmsg from './Alertmsg.js';



class MemoryGameCard extends Component {
  constructor(props) {
    
    super(props);
    this.onCardClicked = this.onCardClicked.bind(this);
    this.memoryCards = new MemoryCard();
  }

  componentWillMount() {

    this.initializeGame();
  }

  initializeGame() {
    this.memoryCards.generateCardSet();
    this.setState({
      turnNo: 1,
      pairsFound: 0,
      numClicksWithinTurn: 0,
      firstId: undefined,
      secondId: undefined
    });
  }

//if more than 2 clicks clear the cards
  clearCards(id1, id2) {
    if (this.state.numClicksWithinTurn !== 2) {
      return;
    }
    this.memoryCards.flipCard(this.state.firstId, false);
    this.memoryCards.flipCard(this.state.secondId, false);
    this.setState({
      firstId: undefined,
      secondId: undefined,
      numClicksWithinTurn: 0,
      turnNo: this.state.turnNo + 1
    });
  }


  //on clicking the card should flip

  onCardClicked(id, image) {
    if(this.pairsFound===9){
      return <Alertmsg />
    }
   
   console.log("inside onclick fuctiion")
    if (this.state.numClicksWithinTurn === 0 || this.state.numClicksWithinTurn===2) {
      if (this.state.numClicksWithinTurn === 2) {
        console.log("thirs click clear the card")
        clearTimeout(this.timeout);
        this.clearCards(this.state.firstId, this.state.secondId);
      }
      console.log("first click")
      this.memoryCards.flipCard(id, true);
      this.setState({
        firstId: id,
        numClicksWithinTurn: 1
      });
    } 
    
    else if (this.state.numClicksWithinTurn === 1) {
      console.log("second click")
      this.memoryCards.flipCard(id, true);
      this.setState({
        secondId: id,
        numClicksWithinTurn: 2
      });
      if (this.memoryCards.cardsHaveIdenticalImages(id, this.state.firstId)) {
        this.memoryCards.setCardAsMatched(this.state.firstId, true);
        this.memoryCards.setCardAsMatched(id, true);
        this.setState({
          pairsFound: this.state.pairsFound+1,
          firstId: undefined,
          secondId: undefined,
          numClicksWithinTurn: 0
        });
      }
    else {
      console.log("setting time");
      this.timeout = setTimeout(() => { 
        this.clearCards(this.state.firstId, this.state.secondId);
      },3000)
    }
  
}
  
}

  getCardViews() {
    console.log("in getting cards");

    let cardViews = [];
    let onClicking = this.onCardClicked;
    console.log(this.memoryCards.cards);
    // this.initializeGame();
    this.memoryCards.cards.forEach(i => {
      let cardView = <GameCardView key={i.id}
        id={i.id}
        image={i.image}
        imageUp={i.imageUp}
        match={i.match}
        onClick={onClicking}
      />;

      cardViews.push(cardView);
    });


    return cardViews;
  }
  
// statusAlert(status){
//   if(status===10){
//          return <Alertmsg />
//   }
// }


  render() {
    console.log("in card views");
    let cardViews = this.getCardViews();
    
    let status=<div>Pairs found: {this.state.pairsFound}</div>
    // let alerting=this.statusAlert(status);
    // let alert=this.statusAlert(this.status);
    return (
      <div className='Game'>
        <header className='header'>
          <div className='title'> Memory game in React js</div>
        </header>
        
      
        <br />
        <br />
        <div >{status}</div>
        
        <div className='CardContainer'>
          {cardViews}
        </div>
      </div>
    );
  }
}

export default MemoryGameCard;
