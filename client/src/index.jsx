import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//import { threadId } from 'worker_threads';

class TestComp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      shoes: [],
      forceRerender: 0
    }
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:1128/shoes',
      success: (data) => {
        console.log('data:', data);
        this.setState({
          shoes: data
        }, () => {
          let shoeIdArr = [];
           for (let i = 0; i < this.state.shoes.length; i ++) {
             shoeIdArr.push(this.state.shoes[i].id)
           }
           $.ajax({
             url: 'http://localhost:1121/api/recommendedImage',
             data: {shoesArr: [0,1,2,3,4,5,6,7,8,9]},
             success: (bata) => {
               for (let i = 0; i < bata.length; i ++) {
                 this.state.shoes[i].image = bata[i];
               }
               this.setState({
                 forceRerender: this.state.forceRerender + 1
               }, () => {
                 console.log('shoe state:', this.state.shoes)
               })
             }
           })
        })
      },
      error: (err) => {
        console.log('please just work already, i actually dont like programming', err);
      }
    })
  }

  render() {
    if (this.state.shoes.length > 0) {
    var items = this.state.shoes.map((elem, i) => {
      return (
        <div key = {i}>
          {elem.name}
          {elem.price}
          {elem.type}
          
        </div>
      )
    })
   }
    return (
      <div>
        {items}
      </div>
    )
  }
}

ReactDOM.render(<TestComp />, document.getElementById('youMayLike'));