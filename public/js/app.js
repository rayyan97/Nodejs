const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const temp = document.querySelector('#temp')
const min = document.querySelector('#min')
const max = document.querySelector('#max')
const desc = document.querySelector('#desc')
const humidity = document.querySelector('#humidity')
const city = document.querySelector('#city')
temp.textContent = ''
min.textContent =''
max.textContent =''
desc.textContent =''
humidity.textContent=''
city.textContent=''
weatherForm.addEventListener('submit', (e) => {
 e.preventDefault()
 const location = search.value
 fetch('http://localhost:3000/weather?address='+location).then((response) => {
 response.json().then((data) => {
 if (data.message) {
 temp.textContent = data.message
 } else {
 temp.textContent="Current Temperature of your City "+ data.main.temp +" degree celcius"
 min.textContent="Minimum Temperature "+data.main.temp_min+" degree celcius"
max.textContent ="Maximum Temperature "+data.main.temp_max+" degree celcius"
desc.textContent =data.weather[0]. description
humidity.textContent="Humidity: "+data.main.humidity
city.textContent="Your City: "+data.name
 
 }
 })
 })
})
