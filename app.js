let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let result = document.querySelector(".result");
let sound = document.querySelector("#sound");
let button = document.querySelector("#search-button");
let input = document.querySelector("#inp-word");
button.addEventListener("click", function () {
  let inpWord = input.value;
  console.log(inpWord);
  fetch(`${url}${inpWord}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      result.innerHTML = ` <div class="word">
      <h3>${inpWord}</h3>
      <button onclick="playSound()">
          <i class="fa-solid fa-volume-high"></i>
      </button>
  </div>
  <div class="details">
      <p>${data[0].meanings[0].partOfSpeech}</p>
      <p>${data[0].phonetic || ""}</p>
  </div>
  <p class="word-meaning">${
    data[0].meanings[0].definitions[0].definition || ""
  }</p>
  <p class="word-example">${
    data[0].meanings[0].definitions[0].example || ""
  }</p>`;
      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch(function () {
      result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });
  input.value = "";
});

function playSound() {
  sound.play();
}
