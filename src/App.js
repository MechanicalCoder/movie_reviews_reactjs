import React, {Component} from 'react';
import axios from 'axios';
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
      thumbnail:[],
      year:[]
    };
  }

  componentDidMount(){
    axios.get('https://sheet.best/api/sheets/0e6256d0-a83e-4fd1-bf06-02af04872061')
      .then(result => {
        this.setState({
          isLoaded: true,
          items:result.data
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

  handleClick = () => {
    const year_mark = this.innerText;
    console.log(year_mark);
  }

  render(){
    const {error, isLoaded, items, day, title, rating, review, thumbnail, year} = this.state;

    if(error){
      return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded){
      return <div>Loading...</div>;
    } 
    else{
      for(var i=0;i<items.length;i+=1){
        day.push(items[i].Day);
        title.push(items[i].Title);
        rating.push(items[i].Rating);
        review.push(items[i].Review);
        thumbnail.push(items[i].Thumbnail);
        const year_string = items[i].Day.toString().split('/');
        year.push(year_string[2]);
      }
      const uniqueYears = year.filter((x, i, a) => a.indexOf(x) == i);
      console.log(uniqueYears);
      var buttonlist = [];
      for(var j=1; j<uniqueYears.length; j++){
        buttonlist.push(<button className="waves-effect waves-light btn-large" onClick={this.handleClick}>{uniqueYears[j]}</button>)
      }
      return (
        <div className="App">
          <h1> OrangeDurito's Movies List </h1> 
          <div className="buttons">{buttonlist}</div>
          <div className="row">
            {title.map((item,index) =>(
              <div className="col s12 m6 l4" key={index}>
                <div className="card">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" alt="thumbnail" src={thumbnail[index]}/>
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4"><center>{item}</center><i className="material-icons right">more_vert</i></span>
                    <center><p><span className="grey-text text-darken-4">Rating: <b>{rating[index]}</b></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date: <b>{day[index]}</b></p></center>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4"><b>Review</b><i className="material-icons right">close</i></span>
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
