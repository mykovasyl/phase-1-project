document.addEventListener('DOMContentLoaded', () => {

  const classDropdown = document.querySelector('#fighter-classes')
  const fighterClass = document.querySelector('#fighter-class')
  const nameDescription = document.querySelector('#name-and-description')
  const nameInput = document.querySelector('#name-fighter')
  const descInput = document.querySelector('#describe-fighter')
  
  //add fighter class, unhide name/description inputs
  classDropdown.addEventListener('change', (e) => {
    fighterClass.textContent = e.target.value
    nameDescription.removeAttribute('hidden')
  })

  document.addEventListener('click', (e) => {
    console.log(e)
  })




})//code ends