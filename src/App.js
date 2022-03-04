import './App.css';
import {useEffect, useState} from 'react';

function App() {

  let searchdata="today";

  let [articles,setArticles]=useState([]);


  function readValue(value){

      searchdata=value;

  }

  useEffect(()=>{

    getNews();


  },[])

  function getNews(){

      fetch(`https://newsapi.org/v2/everything?q=${searchdata}&apiKey=76d16bb43faa4c359068a68bde67fa43`)
      .then((response)=>response.json())
      .then((news)=>{
        console.log(news.articles)
        setArticles(news.articles);
      })
      .catch((err)=>{
        console.log(err);
      })
      



  }



  return (
    <div className="App">

      <div className="search">

          <input placeholder="Search News" className="search-input" 
          onChange={(event)=>{readValue(event.target.value)}}/>

          <button className="search-btn" onClick={getNews}>Search</button>
      </div>

      <div className="articles">

        {
          articles.map((article,index)=>{
            return (

              <div key={index} className="article">

                <img className="news-img" src={article.urlToImage}/>

                <div className="news-details">

                    <h3 className="title">{article.title}</h3>
                    <h4 className="author">{article.author} </h4>

                    <h4 className="author">Published At : {article.publishedAt.split("T")[0]}</h4>

                    <a href={article.url} target={"_blank"}>
                    <button className="btn">Read More</button>
                    </a>
                   

                </div>

              </div>

            )
          })
        }

      </div>

     
    </div>
  );
}

export default App;