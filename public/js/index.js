console.log("Js file loaded successfully");

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
let message = document.getElementById("message");

weatherForm.addEventListener("submit", (e) => {
  const { value } = input;
  e.preventDefault();
  console.log(value);
  message.textContent = "Loading";

  fetch(`http://localhost:8080/about?search=${value}`)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      if (responseData.error) {
        message.textContent = responseData.error;
      } else {
        message.textContent = `${responseData.data.city} temperature is ${responseData.data.temperature}`;
      }
    });
});
