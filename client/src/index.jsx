import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import '../../public/styles.css';

class TestComp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      shoes: [],
      forceRerender: 0
    }
  }

  componentDidMount() {
    $.ajax('http://you-may-like-dev.us-west-2.elasticbeanstalk.com/shoes', {      
      success: (data) => {
        console.log('data:', data);
        this.setState({
          shoes: data
        }, () => {
          let shoeIdArr = [];
          for (let i = 0; i < this.state.shoes.length; i++) {
            shoeIdArr.push(this.state.shoes[i].id)
          }
          $.ajax({
            url: 'http://localhost:1121/api/recommendedImage',
            data: { shoesArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
            success: (bata) => {
              for (let i = 0; i < bata.length; i++) {

                this.state.shoes[i].image = bata[i];
              }
              this.setState({
                forceRerender: this.state.forceRerender + 1
              }, () => {
                console.log('shoe state:', this.state.shoes)
              })
            },
            error: (err) => {
              console.log('inner ajax err', err);
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
          <div className='item' key={i}>
            <img className='image' src={elem.image}></img>
            <span className='elemName'>{elem.name}</span>
            <span className='elemPrice'>{'$' + elem.price}</span>
            <span className='elemType'>{elem.type + ' Shoe'}</span>
          </div>
        )
      })
    }
    return (
 
        <div className='flexContainer'>
          <p className='boldText'>YOU MIGHT ALSO LIKE</p>
          {items}
        </div>

    )
  }
}

ReactDOM.render(<TestComp />, document.getElementById('youMayLike'));