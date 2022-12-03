// script for carousel
$('.autoplay').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });
          

  var searchButton = document.getElementById("searchButton");
  var cardTitle = document.getElementById("movie-title-1");
  var contentTitle = document.getElementById("movie-description-1");
  var wikiInfo = document.getElementById("wiki-info");
  var pictures = document.getElementById("poster")

// function for pulling info from our two APIs
  function getApi(event) {
      event.preventDefault()
      var searchTerms = document.getElementById("searchTerms").value
      // API URL for movie database
      var tmdbApi = "https://api.themoviedb.org/3/search/movie?api_key=e9edbb7e687ae04d372f978edb104c8b&query=" + searchTerms + "&format=json"
      // fetch request for URL
      fetch(tmdbApi)
          .then(function (response){
              return response.json();
          })
          .then(function(data){
            // filters results from fetch to only include movies with the genre ID of 27 (horror)
              var horrorMovies = data.results.filter(function(result){
                  if(result.genre_ids.includes(27)){
                      return result
                  }
              })
              // replaces text content in html tags to contain the title and overview of movie
              cardTitle.textContent = horrorMovies[0].original_title;
              contentTitle.textContent = horrorMovies[0].overview;
              // adds first poster listed for movie to the inner html of div
             pictures.innerHTML = "<img src="+"https://image.tmdb.org/t/p/w500"+ horrorMovies[0].poster_path+">";
              // API URL for Wikipedia
      var wikiApi = "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + horrorMovies[0].original_title + "&gsrlimit=1&prop=pageimages|extracts&exchars=5000&exintro&explaintext&exlimit=max&format=json&origin=*";
            fetch(wikiApi)
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                console.log(data);
                // turns data result into an array
                const resultArray = [];
                Object.keys(data.query.pages).forEach(key => {
                  // creates variables for specific items in array
                  const title = data.query.pages[key].title;
                  const text = data.query.pages[key].extract;
                  const item = {
                    title: title,
                    text: text
                  };
                  resultArray.push(item);
                });
                wikiInfo.textContent = resultArray[0].text;
              })})
  }  
  // clicking search button begins the entire function for pulling info from APIs
  searchButton.addEventListener("click", getApi)