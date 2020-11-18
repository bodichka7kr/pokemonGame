const ourObject = b => {
  return document.getElementById(b);
}
const valuesRandom = themaximumValue => {
  return Math.floor(Math.random()*themaximumValue);
}
  
let needle =  ourObject('turn-arrow');
let doDisplay = true;
let timesOfvpliv = 500;
  
const theFirstPlayer = {
  name: 'Conor McGregor',
  startLive: 150,
  nowLive: 150,
  textHP: ourObject('health-character'),
  barHP: ourObject('progressbar-character'),
  container: document.getElementsByClassName('character')[0]
}
  
const theSecondPlayer = {
  name: 'Khabib Hurmahomedov',
  startLive: 150,
  realHP: 150,
  textHP: ourObject('health-enemy'),
  barHP: ourObject('progressbar-enemy'),
  container: document.getElementsByClassName('enemy')[0]
}
  
const updateHP = player => {
  player.textHP.innerText = player.realHP + ' / ' + player.baseHP;
  player.barHP.style.width = player.realHP + '%';
  player.container.prepend(needle);
}
  
const winnerIs = () => {
  let pl;
  if (!doDisplay) pl = theFirstPlayer;
  else pl = theSecondPlayer;
  ourObject('victory-screen').style.display = 'flex';
  ourObject('victory-text').innerText = 'Переміг ' + pl.name;
  ourObject('victory-image').src = pl.container.getElementsByClassName('sprite')[0].src;
}
  
const dealDamage = player => {
  turn = !doDisplay;

  let damage = valuesRandom(50);
  player.realHP -= damage;
  player.container.style.animation = "shake "+(timesOfvpliv/1000)+"s linear";
  let dmgEl = document.createElement('span');

  dmgEl.innerText = '-' + damage;
  dmgEl.classList.add('damage');
  player.container.parentElement.appendChild(dmgEl);

  setTimeout(function(){
    player.container.style.animation = "";
    dmgEl.remove();
  }, timesOfvpliv);

  if (player.realHP < 0) {
    player.nowLive = 0;
    winnerIs();
  }
  updateHP(player);
}
  
ourObject('character-btn-kick').addEventListener('click', function() {
  if (doDisplay) {
    dealDamage(theSecondPlayer);
  } else {
    alert('Next is ' + theSecondPlayer.name);
  }
});
  
ourObject('enemy-btn-kick').addEventListener('click', function() {
  if (!doDisplay) {
    dealDamage(theFirstPlayer);
  } else {
     alert('Next is ' + theFirstPlayer.name);
  }
});
  
ourObject('restart').addEventListener('click', function() {
  doDisplay = true;
  theFirstPlayer.nowLive = theFirstPlayer.startLive;
  theSecondPlayer.realHP = theSecondPlayer.startLive;
  updateHP(theSecondPlayer); updateHP(pikachu);
  ourObject('victory-screen').style.display = 'none';
});