import shuffle from 'shuffle-array';

class MemoryCard {
  constructor() {
    // this.cards = [];
    console.log("in memeory card"+this.cards);
    this.noImg = 10;
  }

  flipCard(id, imageUp) {
    this.getCard(id).imageUp = imageUp;
  }

  getCard(id) {
    for(let i=0; i < 2*this.noImg; i++) {
      if (this.cards[i].id === id) {
        return this.cards[i];
      }
    };
  }
  cardsHaveIdenticalImages(id1, id2) {
    if (this.getCard(id1).image === this.getCard(id2).image) {
      return true;
    } else {
      return false;
    }
  }
  setCardAsMatched(id,match){
      this.getCard(id).match=match;
  }


  generateCardSet() {
      console.log("in mem generate card set");

    this.cards = [];
    //initially id will be 1
    let id=1;

    for(let i=1; i <= this.noImg; i++) {
      
        let card1 = {
        id: id,
        image : i,
        imageUp: false,
        match: false
      };

      console.log(card1);
      id++;
      
      let card2 = {
        id: id,
        image : i,//same image twice
        imageUp: false,
        match: false
      };

      id++;
    //   let card3 = {
    //     id: id,
    //     image : i,
    //     imageUp: false,
    //     match: false
    //   };
      this.cards.push(card1);
      this.cards.push(card2);
    //   this.cards.push(card3);
      
      id++;
    }

   
    shuffle(this.cards);  
  }

};

export default MemoryCard;
