$('.autoplay').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });
          

  var movie = document.getElementById("movie");
var searchBtn = document.getElementById("search-btn");
var wikiInfo = document.getElementById("wiki-info");
function getWikiApi() {
  //create variable to collect the user input
  var term = document.getElementById("movie").value;
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
searchBtn.addEventListener('click', getWikiApi);
movie.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        searchBtn.click();
    }
});