// [script.js] 페이지를 움직이게 하는 JavaScript (강의 슬라이드 64)

// 1. 서울 현재 시각 표시 — class="clock" 인 곳에 시간을 넣어 줌
const clocks = document.querySelectorAll('.clock');
function tick() {
  const time = new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit'
  });
  clocks.forEach(function (c) { c.textContent = time + ' (KST)'; });
}
tick();
setInterval(tick, 10000);

// 2. Show Grid 버튼 — 페이지 뒤의 12칸 그리드를 보여주거나 숨김
const frame = document.querySelector('.frame');
const overlay = document.createElement('div');
overlay.className = 'overlay';
for (let i = 0; i < 12; i++) {
  overlay.appendChild(document.createElement('span'));
}
frame.appendChild(overlay);

const gridBtn = document.getElementById('gridBtn');
gridBtn.addEventListener('click', function () {
  document.body.classList.toggle('show-grid');
  gridBtn.textContent = document.body.classList.contains('show-grid') ? 'Hide Grid' : 'Show Grid';
});

// 3. 오늘의 추천 뽑기 (홈 화면에만 있는 버튼)
const button = document.getElementById('myBtn');
const text = document.getElementById('text');

const picks = [
  '영화 〈애프터썬〉 — 아빠와 보낸 어느 여름의 기억',
  '영화 〈컨택트〉 — 끝을 알면서도 선택할 수 있을까',
  '영화 〈먼 훗날 우리〉 — 10년 뒤 다시 만난 연인',
  '노래 Tate McRae & Khalid, working',
  '노래 백예린, Antifreeze',
  '책 〈오만과 편견〉 — 첫인상이 전부는 아니다',
  '도시 제주',
  '앱 구글 캘린더'
];

if (button) {
  button.addEventListener('click', function () {
    const i = Math.floor(Math.random() * picks.length);
    text.textContent = picks[i];
  });
}
