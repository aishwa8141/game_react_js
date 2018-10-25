import React, { Component } from 'react';

import './App.css';

import MemoryGame from './MemoryGameCard.jsx';

class App extends Component {
   
  
  render() {
    // console.log(this.state.images);
    return (
      <div>
        <MemoryGame />
               
      </div>
    );
  }
}

export default App;
