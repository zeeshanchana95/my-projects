const myKey = config.MY_API_KEY
 

let ipInput = document.getElementById("ipInput")
let ipAddress = document.getElementById("ipAddress")
let ipLocation = document.getElementById("ipLocation")
let ipTimezone = document.getElementById("ipTimezone")
let ipIsp = document.getElementById("ipIsp")
const searchBtn = document.getElementById("searchBtn")

const map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${myKey}&ip=${ipInput.value}`

function displayResults(data){
    ipAddress.textContent += data.ip

    ipLocation.textContent += `${data.city}, ${data.country_name}, ${data.zipcode}`

    ipTimezone.textContent += data.time_zone.offset

    ipIsp.textContent += data.isp

    let lat = data.latitude
    let lng = data.longitude

    mapLocation(lat, lng)
}

fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${myKey}`)
    .then(res => res.json())
    .then(data => displayResults(data))


searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            if(data.ip !== undefined){  
                displayResults(data)
            }
            else{
                alert("Please enter a valid IP address")
            }
    },
    ipAddress.textContent = "",
    ipLocation.textContent = "",
    ipTimezone.textContent = "",
    ipIsp.textContent = "",
 )
})




const mapLocation = (lat, lng) => {
    const locationIcon = L.icon({
        iconUrl: 'images/icon-location.svg',
        iconSize: [26, 36],
        iconAnchor: [23, 55]
    })
    map.setView([lat, lng], 13)
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z{x}/{y}.png', {
      attribution: false,
    }).addTo(map)
          
    L.marker([lat, lng], { icon: locationIcon }).addTo(map)
    }



