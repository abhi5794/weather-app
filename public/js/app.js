const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault() // this prevents the page from refreshing often
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                messageOne.textContent = data.error
            } 
            else{
                messageOne.textContent = data.forecast 
                messageTwo.textContent = data.address
            }
        })
    })
})