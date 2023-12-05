let convertBtn = document.getElementById("convert-btn")
let inputEl = document.getElementById("input")
let lengthEl = document.getElementById("length-el")
let volumeEl = document.getElementById("volume-el")
let massEl = document.getElementById("mass-el")

const meterToFeet =  3.281
const literToGallon =  0.264
const kiloToPound =  2.204

convertBtn.addEventListener("click", function() {
    let baseValue = inputEl.value
    
    
    lengthEl.innerHTML = `${baseValue} Meter = ${(baseValue * meterToFeet).toFixed(3)} Feet` 
    volumeEl.innerHTML = `${baseValue} Liters = ${(baseValue * literToGallon).toFixed(3)} Gallons`
    massEl.innerHTML = `${baseValue} Kilograms= ${(baseValue * kiloToPound).toFixed(3)} Pounds`
})

