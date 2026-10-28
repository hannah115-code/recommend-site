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

// 2. Show Color 버튼 — 흑백 세상에 색이 돌아오는 효과
const colorBtn = document.getElementById('colorBtn');
const colorLabel = colorBtn.querySelector('.label');

function setColor(on) {
  document.body.classList.toggle('color-on', on);
  colorLabel.textContent = on ? 'Back to Gray' : 'Show Color';
  colorBtn.setAttribute('aria-pressed', on);
  try { localStorage.setItem('colorOn', on ? '1' : '0'); } catch (e) {}
}

// 다른 페이지로 이동해도 마지막 선택(컬러/흑백)을 기억
let savedOn = false;
try { savedOn = localStorage.getItem('colorOn') === '1'; } catch (e) {}
if (savedOn) {
  document.body.classList.add('no-anim');      // 페이지를 열 때는 효과 없이 바로 컬러
  setColor(true);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { document.body.classList.remove('no-anim'); });
  });
}

colorBtn.addEventListener('click', function () {
  const on = !document.body.classList.contains('color-on');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 효과를 지원하지 않는 브라우저는 천천히 색이 번지는 기본 효과(CSS transition)만 사용
  if (!document.startViewTransition || reduceMotion) {
    setColor(on);
    return;
  }

  // 버튼 위치에서 원이 커지며 화면 전체로 색이 퍼져 나감
  const r = colorBtn.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  document.body.classList.add('no-anim');
  const transition = document.startViewTransition(function () { setColor(on); });
  transition.ready.then(function () {
    document.documentElement.animate(
      { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'] },
      { duration: 1400, easing: 'cubic-bezier(0.7, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
    );
  }).catch(function () {});   // 탭이 가려져 효과가 생략돼도 색 전환은 그대로 적용됨
  transition.finished.finally(function () { document.body.classList.remove('no-anim'); });
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
  '도시 하와이 — 산과 바다를 한 번에',
  '앱 구글 캘린더'
];

if (button) {
  button.addEventListener('click', function () {
    const i = Math.floor(Math.random() * picks.length);
    text.textContent = picks[i];
  });
}
