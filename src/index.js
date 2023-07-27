import './index.css';

const form = document.getElementById('form')
const list = document.getElementById('ListOfScores')
const refreshs = document.getElementById('restart-btn')
let id = ''
let allScores = ''

const addGame = async ()=> {
     const data = {name: 'fruitninja'}

    await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
      .then(result =>{
        id=result.result.split(' ')[3]
        console.log(id)
      })
      .catch(err=>console.log(err))
}

addGame()

const getReq = async () => {
  await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores/`)
      .then(scores => scores.json())
      .then(scores1 =>{
        allScores = scores1.result;
        console.log(allScores)
        let lists =''
        allScores.forEach(element => {
          
          lists +=`<li>name:${element.user} <span>score: ${element.score}</span></li>` 
        });
        list.innerHTML= lists
      })
}

form.addEventListener('submit', async (e)=> {
  e.preventDefault()
 
  const Fdata = new FormData(form)
  const data1 = Object.fromEntries(Fdata)
  console.log(data1);

  await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores/`, {
      method: 'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify(data1)
  }).then(response => response.json())
    .then(result =>{
      console.log(result)
    })
    .catch(err=>console.log(err))

     getReq()
})

refreshs.addEventListener('onclick', () => getReq());