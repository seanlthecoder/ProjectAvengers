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


  function getApi(event) {
      event.preventDefault()
      var searchTerms = document.getElementById("searchTerms").value
      var tmdbApi = "https://api.themoviedb.org/3/search/movie?api_key=e9edbb7e687ae04d372f978edb104c8b&query=" + searchTerms + "&format=json"
      fetch(tmdbApi)
          .then(function (response){
              return response.json();
          })
          .then(function(data){
              var horrorMovies = data.results.filter(function(result){
                  if(result.genre_ids.includes(27)){
                      return result
                  }
              })
              cardTitle.textContent = horrorMovies[0].original_title;
              contentTitle.textContent = horrorMovies[0].overview;
             pictures.innerHTML = "<img src="+"https://image.tmdb.org/t/p/w500"+ horrorMovies[0].poster_path+">";

      var wikiApi = "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + horrorMovies[0].original_title + "&gsrlimit=1&prop=pageimages|extracts&exchars=5000&exintro&explaintext&exlimit=max&format=json&origin=*";
            fetch(wikiApi)
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                console.log(data);
                const resultArray = [];
                Object.keys(data.query.pages).forEach(key => {
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
  
  searchButton.addEventListener("click", getApi)