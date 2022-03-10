document.addEventListener('DOMContentLoaded', () => {

  const classDropdown = document.querySelector('#fighter-classes')
  const fighterClass = document.querySelector('#fighter-class')
  const nameDescrForm = document.querySelector('#name-descr-form')
  const fighterName = document.querySelector('#fighter-name')
  const fighterPower = document.querySelector('#power-level')
  const fighterDescription = document.querySelector('#fighter-description')
  const powerLevelBtn = document.querySelector('#power')
  const fighterPowerLevel = document.querySelector('#fighter-power-level')
  const enterArena = document.querySelector('#enter-arena')
  const setUpFighter = document.querySelector('#set-up-fighter')
  const readyForBattle = document.querySelector('#ready-for-battle')


  //add fighter class, unhide name/description inputs
  classDropdown.addEventListener('change', (e) => {
    fighterClass.textContent = e.target.value
    nameDescrForm.removeAttribute('hidden')
  })

  //add name and description, unhide power level buttons
  nameDescrForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fighterName.textContent = e.target[0].value
    fighterDescription.textContent = e.target[1].value
    fighterPower.removeAttribute('hidden')
  })

  powerLevelBtn.addEventListener('click', (e) => {
    fighterPowerLevel.textContent = powerLevelBtn.textContent = getRandomNumber(1, 100)
    powerLevelBtn.disabled = true
    readyForBattle.removeAttribute('hidden')
  })

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  enterArena.addEventListener('click', (e) => {
    setUpFighter.hidden = true
  })



})//code ends