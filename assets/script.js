  // var picture = document.getElementById("picture")
  var searchButton = document.getElementById("searchButton");
  var cardTitle = document.getElementById("card-title-1");
  var contentTitle = document.getElementById("content-title-1");
  var wikiInfo = document.getElementById("wiki-info");

  function getApi(event) {
      event.preventDefault()
      var searchTerms = document.getElementById("searchTerms").value
      var requestApi = "https://api.themoviedb.org/3/search/movie?api_key=e9edbb7e687ae04d372f978edb104c8b&query=" + searchTerms + "&format=json"
  
  
      fetch(requestApi)
          .then(function (response){
              return response.json();
          })
          .then(function(data){
  
              
              var horrorMovies = data.results.filter(function(result){
                  if(result.genre_ids.includes(27)){                        //id for horror is 27, ||result.genre_ids.includes(18)
                      return result
                  }
              })
              cardTitle.textContent = horrorMovies[0].original_title;
              contentTitle.textContent = horrorMovies[0].overview;
              
              /* var listItemTwo = document.createElement('li');
              listItemTwo.textContent = horrorMovies[0].overview;
              list.appendChild(listItemTwo);
              var picture = document.createElement("li");
              picture.innerHTML = "<img src="+"https://image.tmdb.org/t/p/w500"+ horrorMovies[0].poster_path +">";
              list.appendChild(picture); */
          })
          .then (function getWikiApi() {
            //create variable to collect the user input
            var term = document.getElementById("searchTerms").value;
            //generate the search url using the search term
            searchUrl = "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + term + "&gsrlimit=1&prop=pageimages|extracts&exchars=5000&exintro&explaintext&exlimit=max&format=json&origin=*";
            //make a fetch call to that endpoint
            fetch(searchUrl)
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                console.log(data);
                //create an array to store the data in
                const resultArray = [];
                //loop through every key in the pages object (will only be 1 as declared in the search url with &gsrlimit=1)
                Object.keys(data.query.pages).forEach(key => {
                  //create variables for the wiki article title and extract
                  const title = data.query.pages[key].title;
                  const text = data.query.pages[key].extract;
                  //place both of these items into an object
                  const item = {
                    title: title,
                    text: text
                  };
                  //put that object into the results array
                  resultArray.push(item);
                });
                // update/display the text content of the wikipedia section
                wikiInfo.textContent = resultArray[0].text;
              })})
  }  
  
  function getWikiApi() {
    //create variable to collect the user input
    var term = document.getElementById("card-title-1").value;
    //generate the search url using the search term
    searchUrl = "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + term + "&gsrlimit=1&prop=pageimages|extracts&exchars=5000&exintro&explaintext&exlimit=max&format=json&origin=*";
    //make a fetch call to that endpoint
    fetch(searchUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        //create an array to store the data in
        const resultArray = [];
        //loop through every key in the pages object (will only be 1 as declared in the search url with &gsrlimit=1)
        Object.keys(data.query.pages).forEach(key => {
          //create variables for the wiki article title and extract
          const title = data.query.pages[key].title;
          const text = data.query.pages[key].extract;
          //place both of these items into an object
          const item = {
            title: title,
            text: text
          };
          //put that object into the results array
          resultArray.push(item);
        });
        // update/display the text content of the wikipedia section
        wikiInfo.textContent = resultArray[0].text;
      })
  }
  
  searchButton.addEventListener("click", getApi)