const formTag = document.querySelector("form");
const inputTag = formTag.querySelector("input");
const resultsTag = document.querySelector("section.results");

const accessKey =
  "731490e0bf13686559ffe45d801847869356e6938c6d0f12aac77e5bbc55c113";

const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query=";

const searchUnsplash = term => {
  return fetch(apiUrl + term, {
    method: "GET",
    headers: {
      // prettier-ignore
      "Authorization": "Client-ID " + accessKey
    }
  }).then(response =>
    response.json().then(data => {
      // to prevent getting data we don't need
      // map over each object and pull out
      // only the attributes we need
      return data.results.map(result => {
        return {
          imageSrc: result.urls.regular,
          title: result.description || "Untitled",
          name: result.user.name,
          width: result.width,
          height: result.height,
          backgroundColor: (result.color || "#cccccc") + "cc"
        };
      });
    })
  );
};

const addResults = results => {
  resultsTag.innerHTML = "";

  results.forEach(result => {
    resultsTag.innerHTML =
      resultsTag.innerHTML +
      `<div class="single-result" >
        <div class="image" style="background-color:${result.backgroundColor}">
            <img src="${result.imageSrc}">
         </div>
         <h2>${result.title}</h2>
         <p> by ${result.name} - ${result.width} x ${result.height}</p>
        </div>
    `;
  });
};

// when we submit info, get the info from the form
formTag.addEventListener("submit", e => {
  const searchTerm = inputTag.value;

  searchUnsplash(searchTerm).then(results => {
    addResults(results);
  });
  e.preventDefault();
});
