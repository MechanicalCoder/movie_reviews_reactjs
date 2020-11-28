import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      day:[],
      title:[],
      rating:[],
      review:[],
      thumbnail:[]
    };
  }

  componentDidMount(){
    const url = 'https://spreadsheets.google.com/feeds/cells/1oLYphfH_bGeqWSxqysMjBD2me27L6YdNk9wQwjOfQMc/1/public/full?alt=json'

    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          items: result.feed.entry
        });
      },

      (error) => {
        this.setState({
          isLoaded:false,
          error
        });
      }
    )
  }

  render(){
    const {error, isLoaded, items, day, title, rating, review, thumbnail} = this.state;

    if(error){
      return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded){
      return <div>Loading...</div>;
    } 
    else{
      for(var i=5;i<items.length;i+=5){
        day.push(items[i].content.$t);
        title.push(items[i+1].content.$t);
        rating.push(items[i+2].content.$t);
        review.push(items[i+3].content.$t);
        thumbnail.push(items[i+4].content.$t);
     }
      return (
        <div className="App">
          <h1> Movies List </h1>
          <h2> 2020 </h2>
          <div class="row">
            {title.map((item,index) =>(
              <div class="col s12 m6 l4">
                <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src={thumbnail[index]}/>
                  </div>
                  <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4"><center>{item}</center><i class="material-icons right">more_vert</i></span>
                    <center><p><span class="grey-text text-darken-4">Rating: <b>{rating[index]}</b></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date: <b>{day[index]}</b></p></center>
                  </div>
                  <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4"><b>Review</b><i class="material-icons right">close</i></span>
                    <p>{review[index]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default App;
