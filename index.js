document.addEventListener('DOMContentLoaded', () => {

  let enemies = []
  let wins = 0;
  let fighterImages = [{id: "Eren Yeager", img: "https://static.miraheze.org/greatcharacterswiki/thumb/3/3d/Eren_Paths.jpg/330px-Eren_Paths.jpg"}, {id: "Naruto Uzumaki", img: "https://p325k7wa.twic.pics/high/naruto/naruto-suns-revolution/00-page-setup/nsr_game-thumbnail.jpg"}, {id: "Natsu Dragneel", img: "https://w0.peakpx.com/wallpaper/349/181/HD-wallpaper-natsu-dragneel-fairytail.jpg"}, {id: "Goku", img: "https://i1.sndcdn.com/artworks-5TvjsM9DIvjX0vLJ-LSadoQ-t500x500.jpg"}]
  const classDropdown = document.querySelector('#fighter-classes')
  const nameDescrForm = document.querySelector('#name-descr-form')
  const fighterName = document.querySelector('#fighter-name')
  const fighterPower = document.querySelector('#power-level')
  const fighterDescription = document.querySelector('#fighter-description')
  const powerLevelBtn = document.querySelector('#power')
  const fighterPowerLevel = document.querySelector('#fighter-power-level')
  const enterArena = document.querySelector('#enter-arena')
  const setUpFighter = document.querySelector('#set-up-fighter')
  const readyForBattle = document.querySelector('#ready-for-battle')
  const arena = document.querySelector('#arena')
  const enemyInfo = document.querySelector('#enemy')
  const winCounter = document.querySelector('#win-counter')
  const fightBtn = document.querySelector('#fight')
  const fighterImageRendered = document.querySelector('#fighter-image')
  const enemyPowerLevel = document.querySelector('#enemy-power-level')
  const noWins = document.querySelector('#no-wins')
  const someWins = document.querySelector('#some-wins')
  const allWins = document.querySelector('#all-wins')
  const winsSpan = document.querySelector('#wins')
  const championImage = document.querySelector('#champion-image') 
  const fighterDescriptionInArena = document.querySelector('#fighter-description-in-arena')

  function fetchEnemies() {
    fetch('http://localhost:3000/fighters')
      .then(resp => resp.json())
      .then(data => {
        enemies = data
        //enemies - an array of objects
      })
  }
  fetchEnemies()

  //add fighter class, unhide name/description inputs
  classDropdown.addEventListener('change', (e) => {
    fighterName.textContent = e.target.value
    let fighterImage = fighterImages.find(image => image.id === e.target.value)
    fighterImageRendered.src = championImage.src = fighterImage.img
    nameDescrForm.removeAttribute('hidden')
  })

  //add description, unhide power level buttons
  nameDescrForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fighterDescription.textContent = fighterDescriptionInArena.textContent = e.target.elements.description.value
    fighterPower.removeAttribute('hidden')
  })

  //assign power level, unhide ready for battle
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

  //enter the arena 
  enterArena.addEventListener('click', (e) => {
    setUpFighter.hidden = true
    arena.removeAttribute('hidden')
    populateEnemy(0)
  })

  //fight enemies and compare power levels to determine winner and generate next enemey or ending
  fightBtn.addEventListener('click', (e) => {
    if(parseInt(fighterPowerLevel.textContent) > parseInt(document.querySelector('#enemy-power-level').textContent)) {
      wins += 1
      if(wins === 5) {
        renderEnding(wins)
      } else {
      winCounter.textContent = wins
      populateEnemy(wins)
      }
    } else  {
      renderEnding(wins)
    }
  })

  //hide arena, unhide ending = to wins
  function renderEnding(wins) {
    arena.hidden = true
    if(wins === 0) {
      noWins.removeAttribute('hidden')
    } else if(wins >= 1 && wins < 5) {
      winsSpan.textContent = wins
      someWins.removeAttribute('hidden')
    } else {
      allWins.removeAttribute('hidden')
    }
  }

  //grab enemy from json and populate to arena
  function populateEnemy(index) {
    enemyInfo.innerHTML = renderEnemy(index)
  }

  function renderEnemy(index) {
    return `
      <p id="enemy-name">${enemies[index].name}</p>
      <p id="enemy-power-level">${enemies[index].power}</p>
      <p id="enemy-description">${enemies[index].description}</p>
      <img src="${enemies[index].image}">
    `
  }

  document.addEventListener('click', (e) => {
    if(e.target.className === "try-again") {
      resetArena()
    }
  })

  function resetArena() {
    setUpFighter.removeAttribute('hidden')
    powerLevelBtn.disabled = false
    powerLevelBtn.textContent = "Random Power!"
    classDropdown.selectedIndex = 0
    nameDescrForm.reset()
    nameDescrForm.hidden = true
    fighterPower.hidden = true
    readyForBattle.hidden = true
    arena.hidden = true
    noWins.hidden = true
    someWins.hidden = true
    winCounter.textContent = 0
    winsSpan.textContent = ''
    wins = 0;
  }
})//code ends