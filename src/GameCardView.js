import React, { Component } from 'react';
import './GameCardView.css';

class GameCardView extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

 
  onClick() {
    console.log(this.props.match)
    if (!this.props.match && !this.props.imageUp) {
      this.props.onClick(this.props.id,this.props.image);      
    }
  }

  render() {
    let imagePath = './images/';
    if (this.props.imageUp) {
      imagePath = imagePath + this.props.image + '.jpg';
    } else {
      imagePath = imagePath + 'back.jpg';
    }

    let className='Card';
    if (this.props.match) {
      className = className + ' Matched';
    }

    return (
      <img className={className} src={imagePath} alt='' onClick={this.onClick} />
      );      
  };
};

export default GameCardView;
