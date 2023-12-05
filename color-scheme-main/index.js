const colorArr = ["#F55A5A", "#2B283A", "#FBF3AB", "#AAD186", "#A626D3"]

const colorInput = document.getElementById('color-input')
const select = document.getElementById('select')
const containerColor = document.getElementById('container-color')
const containerP = document.getElementById('container-p')

function render() {
  colorArr.forEach(colors => {
    const div1 = document.createElement("div")
    div1.className = "colors"
    div1.style.backgroundColor = `${colors}`
    containerColor.appendChild(div1)
    containerP.innerHTML += `<p>${colors}</p>`
  })
}
render()

document.getElementById('btn-get-clr').addEventListener('click', e => {
  e.preventDefault()
  containerColor.innerHTML = ''
  containerP.innerHTML = ''
  let coloring = colorInput.value
  let str = select.value

  fetch(`https://www.thecolorapi.com/scheme?hex=${coloring.substring(1)}&mode=${str.toLowerCase()}&count=6`)
    .then(response => response.json())
    .then(data => data.colors.forEach(color => {
      const div = document.createElement("div")
      div.className = "colors"
      div.style.backgroundColor = `${color.hex.value}`
      containerColor.appendChild(div)
      containerP.innerHTML += `<p>${color.hex.value}</p>`
    }))
})


