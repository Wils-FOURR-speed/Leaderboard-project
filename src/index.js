import './index.css';

const form = document.getElementById('form');
const list = document.getElementById('ListOfScores');
let allScores = '';

const getReq = async () => {
  await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/5HJH59zlIAiXTsxslStP/scores/')
    .then((scores) => scores.json())
    .then((scores1) => {
      allScores = scores1.result;
      let lists = '';
      allScores.forEach((element) => {
        lists += `<li>name:${element.user} <span>score: ${element.score}</span></li>`;
      });
      list.innerHTML = lists;
    });
};

const click = document.getElementById('click');
click.addEventListener('click', () => {
  getReq();
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const Fdata = new FormData(form);
  const data1 = Object.fromEntries(Fdata);

  await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/5HJH59zlIAiXTsxslStP/scores/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data1),
  }).then((response) => response.json())
    .catch((err) => console.log(err));
});
