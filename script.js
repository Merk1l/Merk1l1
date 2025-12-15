// Переключение темы
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

themeBtn.addEventListener('click', () => {
  if (body.getAttribute('data-theme') === 'dark') {
    body.removeAttribute('data-theme');
    themeBtn.textContent = '🌙 Тёмная тема';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️ Светлая тема';
    localStorage.setItem('theme', 'dark');
  }
});

// Загрузка темы из localStorage
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️ Светлая тема';
  }
});

// Плавная прокрутка по якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Данные примеров
const examplesData = {
  // Типографика
  'typo-responsive': {
    title: 'Адаптивный текст',
    desc: 'Шрифт изменяется в зависимости от размера экрана.',
    html: '<p class="responsive-text">Этот текст адаптируется под размер экрана</p>',
    css: `.responsive-text {
  font-size: clamp(1rem, 4vw, 2.5rem);
}`
  },
  'typo-gradient': {
    title: 'Градиентный текст',
    desc: 'Текст с градиентом.',
    html: '<h2 class="gradient-text">Градиентный текст</h2>',
    css: `.gradient-text {
  background: linear-gradient(45deg, #ff9a9e, #fad0c4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
}`
  },
  'typo-shadow': {
    title: 'Текст с тенями',
    desc: 'Текст с CSS-тенью.',
    html: '<h2 class="shadow-text">Текст с тенью</h2>',
    css: `.shadow-text {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  font-size: 2rem;
}`
  },
  'typo-change': {
    title: 'Изменение текста',
    desc: 'Изменение текста при клике.',
    html: '<p class="text-change" id="textChange">Кликни меня!</p>',
    js: `document.getElementById('textChange').addEventListener('click', () => {
  document.getElementById('textChange').textContent = 'Текст изменился!';
});`
  },
  'typo-typewriter': {
    title: 'Печатающийся текст',
    desc: 'Текст появляется по буквам.',
    html: '<p class="typewriter-text" id="typewriter"></p>',
    js: `const text = 'Привет, мир!';
let i = 0;
const speed = 100;
function typeWriter() {
  if (i < text.length) {
    document.getElementById('typewriter').innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter();`
  },

  // Кнопки
  'css-basic': {
    title: 'Базовая кнопка на CSS',
    desc: 'Простейшая кнопка с использованием базовых свойств CSS: padding, border-radius, background.',
    html: '<button class="btn-basic">Нажми</button>',
    css: `.btn-basic {
  padding: 12px 24px;
  background: #0d6efd;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-basic:hover {
  background: #0b5ed7;
  transform: scale(1.05);
}`
  },
  'css-gradient': {
    title: 'Кнопка с градиентом',
    desc: 'Использование градиента розового цвета для создания современного вида кнопки.',
    html: '<button class="btn-gradient">Нажми</button>',
    css: `.btn-gradient {
  padding: 12px 24px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  color: #333;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-gradient:hover {
  background: linear-gradient(135deg, #ff7a82, #f8b9b0);
  transform: scale(1.05);
}`
  },
  'css-hover': {
    title: 'Анимация при наведении',
    desc: 'Добавление плавного изменения цвета и масштаба при наведении курсора.',
    html: '<button class="btn-hover">Нажми</button>',
    css: `.btn-hover {
  padding: 12px 24px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}
.btn-hover:hover {
  background: #218838;
  transform: scale(1.05) rotate(2deg);
}`
  },
  'js-alert': {
    title: 'Кнопка с alert()',
    desc: 'Простейший пример взаимодействия: при клике выводится системное всплывающее окно.',
    html: '<button class="btn-js-alert" id="alertBtn">Показать</button>',
    js: `document.getElementById('alertBtn').addEventListener('click', () => {
  alert('Привет из JavaScript!');
});`
  },
  'js-toggle': {
    title: 'Toggle (переключение стиля)',
    desc: 'При каждом клике кнопка переключает дополнительный CSS-класс, меняя внешний вид.',
    html: '<button class="btn-js-toggle" id="toggleBtn">Переключить</button>',
    js: `document.getElementById('toggleBtn').addEventListener('click', () => {
  document.getElementById('toggleBtn').classList.toggle('highlight');
});`
  },
  'js-counter': {
    title: 'Счётчик кликов',
    desc: 'Кнопка отслеживает количество нажатий и обновляет свой текст.',
    html: '<button class="btn-js-counter" id="counterBtn">Кликни!</button>',
    js: `let count = 0;
const btn = document.getElementById('counterBtn');
btn.addEventListener('click', () => {
  count++;
  btn.textContent = \`Кликов: \${count}\`;
});`
  },

  // Формы
  'form-basic': {
    title: 'Простая форма',
    desc: 'Базовая HTML-форма с полями ввода и кнопкой.',
    html: `<form>
  <input type="text" placeholder="Имя" />
  <input type="email" placeholder="Email" />
  <button type="submit">Отправить</button>
</form>`,
    css: `form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input, button {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}`
  },
      'form-styled': {
    title: 'Стилизованная форма',
    desc: 'Форма с улучшенным дизайном, включая тень, плавные переходы и фокус.',
    html: `<form class="styled-form">
  <input type="text" placeholder="Имя" />
  <input type="email" placeholder="Email" />
  <button type="submit">Отправить</button>
</form>`,
    css: `.styled-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: box-shadow 0.3s;
}
.styled-form:hover {
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}
.styled-form input, .styled-form button {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: all 0.2s;
}
.styled-form input:focus {
  outline: none;
  border-color: #0d6efd;
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
}
.styled-form button {
  background: #0d6efd;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}
.styled-form button:hover {
  background: #0b5ed7;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(13, 110, 253, 0.3);
}
.styled-form button:active {
  transform: translateY(0);
}
`
  },  'form-grid': {
    title: 'Форма в сетке',
    desc: 'Форма с элементами в сетке.',
    html: `<form class="grid-form">
  <div class="form-row">
    <input type="text" placeholder="Имя" />
    <input type="email" placeholder="Email" />
  </div>
  <button type="submit">Отправить</button>
</form>`,
    css: `.grid-form .form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.grid-form input, .grid-form button {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.grid-form button {
  grid-column: span 2;
}`
  },
  'form-validation': {
    title: 'Валидация формы',
    desc: 'Простая проверка полей формы.',
    html: `<form class="validated-form">
  <input type="text" placeholder="Имя" required />
  <input type="email" placeholder="Email" required />
  <button type="submit">Отправить</button>
</form>`,
    css: `.validated-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 300px;
  margin: 0 auto;
}
.validated-form input, .validated-form button {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
}
.validated-form button {
  background: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}`,
    js: `document.querySelector('.validated-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Форма отправлена!');
});`
  },
  'form-dynamic': {
    title: 'Динамическое поле',
    desc: 'Поле, которое добавляется по клику.',
    html: `<form class="dynamic-form">
  <div class="fields-container">
    <input type="text" placeholder="Поле 1" />
  </div>
  <button type="button" id="addField">Добавить поле</button>
  <button type="submit">Отправить</button>
</form>`,
    js: `document.getElementById('addField').addEventListener('click', () => {
  const container = document.querySelector('.fields-container');
  const newField = document.createElement('input');
  newField.type = 'text';
  newField.placeholder = 'Поле ' + (container.children.length + 1);
  container.appendChild(newField);
});`
  },

  // Навигация
  'nav-horizontal': {
    title: 'Горизонтальное меню',
    desc: 'Простое меню в строку.',
    html: `<ul class="nav-menu">
  <li><a href="#">Главная</a></li>
  <li><a href="#">О нас</a></li>
  <li><a href="#">Контакты</a></li>
</ul>`,
    css: `.nav-menu {
  display: flex;
  list-style: none;
  gap: 20px;
}
.nav-menu a {
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  background: #e9ecef;
}`
  },
  'nav-dropdown': {
    title: 'Выпадающее меню',
    desc: 'Меню с выпадающим списком.',
    html: `<div class="dropdown">
  <button class="dropdown-btn">Меню</button>
  <ul class="dropdown-content">
    <li><a href="#">Подпункт 1</a></li>
    <li><a href="#">Подпункт 2</a></li>
  </ul>
</div>`,
    css: `.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-btn {
  padding: 10px 20px;
  background: #6c757d;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
}
.dropdown-content {
  display: none;
  position: absolute;
  background: white;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 1;
  list-style: none;
  border-radius: 6px;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown-content a {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover {
  background: #f1f1f1;
}`
  },
  'nav-sticky': {
    title: 'Липкое меню',
    desc: 'Меню, которое остаётся наверху при прокрутке.',
    html: `<nav class="sticky-nav">
  <a href="#">Главная</a>
  <a href="#">О нас</a>
  <a href="#">Контакты</a>
</nav>`,
    css: `.sticky-nav {
  position: sticky;
  top: 0;
  background: #343a40;
  padding: 10px;
  display: flex;
  gap: 20px;
}
.sticky-nav a {
  color: white;
  text-decoration: none;
}`
  },
  'nav-mobile': {
    title: 'Мобильное меню',
    desc: 'Простое мобильное меню.',
    html: `<div class="mobile-menu">
  <button class="menu-toggle">☰</button>
  <ul class="mobile-nav">
    <li><a href="#">Главная</a></li>
    <li><a href="#">О нас</a></li>
    <li><a href="#">Контакты</a></li>
  </ul>
</div>`,
    css: `.mobile-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #343a40;
  color: white;
}
.mobile-nav {
  display: none;
  list-style: none;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background: #343a40;
  flex-direction: column;
  padding: 10px;
}
.mobile-nav.active {
  display: flex;
}
.menu-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}`,
    js: `document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.mobile-nav').classList.toggle('active');
});`
  },
  'nav-active': {
    title: 'Активный пункт',
    desc: 'Подсветка текущего пункта меню.',
    html: `<ul class="active-nav">
  <li><a href="#" class="active">Главная</a></li>
  <li><a href="#">О нас</a></li>
  <li><a href="#">Контакты</a></li>
</ul>`,
    css: `.active-nav {
  display: flex;
  list-style: none;
  gap: 20px;
}
.active-nav a {
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 6px;
}
.active-nav .active {
  background: #0d6efd;
  color: white;
}`,
    js: `document.querySelectorAll('.active-nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.active-nav a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
  });
});`
  },

  // Медиа
  'img-responsive': {
    title: 'Адаптивное изображение',
    desc: 'Изображение, которое подстраивается под размер экрана.',
    html: '<img src="https://placehold.co/600x400" alt="Пример" class="responsive-img" />',
    css: `.responsive-img {
  max-width: 100%;
  height: auto;
}`
  },
 'img-rounded': {
  title: 'Круглое изображение',
  desc: 'Круглое изображение с border-radius.',
  html: '<img src="https://placehold.co/200x200/ff0000/ffffff?text=:)" alt="Красный круг" class="rounded-img" />',
  css: `.rounded-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
}`
},
  'video-embed': {
    title: 'Встраиваемое видео',
    desc: 'Видео из YouTube.',
    html: '<iframe class="video-responsive" src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" frameborder="0" allowfullscreen></iframe>',
    css: `.video-responsive {
  width: 100%;
  height: 300px;
  border-radius: 8px;
}`
  },
 'img-slider': {
  title: 'Слайдер изображений',
  desc: 'Простой слайдер с кнопками и фото Уфы.',
  html: `<div class="image-slider">
  <img src="https://avatars.mds.yandex.net/i?id=5b005837d9293e029784de95caf7d8b02e3184f2-4274925-images-thumbs&n=13" class="slider-img" />
  <button class="slider-btn prev">←</button>
  <button class="slider-btn next">→</button>
</div>`,
  js: `let currentImage = 0;
  const images = [
  'https://avatars.mds.yandex.net/i?id=5b005837d9293e029784de95caf7d8b02e3184f2-4274925-images-thumbs&n=13', // Ваша первая фотография (работает)
  'https://wikiway.com/upload/resize_cache/uf/b60/lyd826s1rnnwzj9gkhb4e2l9bi235zma/720_400_1/Ufimskiy-opernyy-teatr.jpg', // Мост через Белую (проверено)
  'https://wikiway.com/upload/resize_cache/uf/bd2/st17d5g2anrnvv7bz3jp0mex871o19mq/720_400_1/Ufa-2.jpg', // Центр города (проверено)
  'https://avatars.mds.yandex.net/i?id=5123398649895828627681165742988142768543-7659749-images-thumbs&n=13'  // Река Белая (проверено)
];
const imgElement = document.querySelector('.slider-img');
document.querySelector('.next').addEventListener('click', () => {
  currentImage = (currentImage + 1) % images.length;
  imgElement.src = images[currentImage];
});
document.querySelector('.prev').addEventListener('click', () => {
  currentImage = (currentImage - 1 + images.length) % images.length;
  imgElement.src = images[currentImage];
});`
},
  'video-controls': {
    title: 'Управление видео',
    desc: 'Пауза и воспроизведение.',
    html: `<video controls class="video-element" id="videoElement" width="400">
  <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
  Ваш браузер не поддерживает видео.
</video>
<button class="video-play-btn" id="playBtn">▶️</button>`,
    js: `const video = document.getElementById('videoElement');
const playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playBtn.textContent = '⏸️';
  } else {
    video.pause();
    playBtn.textContent = '▶️';
  }
});`
  },

  // Карточки
  'card-basic': {
    title: 'Простая карточка',
    desc: 'Карточка с изображением, заголовком и описанием.',
    html: `<div class="card">
  <img src="https://placehold.co/200x150" alt="Карточка" />
  <h3>Заголовок</h3>
  <p>Описание карточки</p>
</div>`,
    css: `.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  width: 200px;
  text-align: center;
}
.card img {
  width: 100%;
  border-radius: 6px;
}`
  },
  'grid-cards': {
    title: 'Сетка карточек',
    desc: 'Расположение карточек в сетке.',
    html: `<div class="card-grid">
  <div class="card">
    <img src="https://placehold.co/200x150" alt="Карточка" />
    <h3>Заголовок 1</h3>
    <p>Описание 1</p>
  </div>
  <div class="card">
    <img src="https://placehold.co/200x150" alt="Карточка" />
    <h3>Заголовок 2</h3>
    <p>Описание 2</p>
  </div>
</div>`,
    css: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}
.card img {
  width: 100%;
  border-radius: 6px;
}`
  },
  'card-hover': {
    title: 'Карточка с hover',
    desc: 'При наведении карточка поднимается.',
    html: `<div class="card card-hover">
  <img src="https://placehold.co/200x150" alt="Карточка" />
  <h3>Заголовок</h3>
  <p>Описание карточки</p>
</div>`,
    css: `.card-hover {
  transition: transform 0.3s;
}
.card-hover:hover {
  transform: translateY(-10px);
}`
  },
  'card-expand': {
    title: 'Раскрывающаяся карточка',
    desc: 'Карточка, которая раскрывается по клику.',
    html: `<div class="expanding-card">
  <h3>Кликни меня</h3>
  <div class="card-content">
    <p>Секретное содержимое!</p>
  </div>
</div>`,
    css: `.expanding-card .card-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s;
}
.expanding-card.active .card-content {
  max-height: 200px;
}`,
    js: `document.querySelector('.expanding-card').addEventListener('click', function() {
  this.classList.toggle('active');
});`
  },
  'card-drag': {
    title: 'Перетаскивание карточки',
    desc: 'Карточка, которую можно перетащить.',
    html: `<div class="draggable-card" draggable="true" style="position: absolute; top: 100px; left: 100px; width: 150px; height: 100px; background: #0d6efd; color: white; display: flex; align-items: center; justify-content: center;">
  Перетащи меня
</div>`,
    js: `let card = document.querySelector('.draggable-card');
let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
card.onmousedown = dragMouseDown;

function dragMouseDown(e) {
  e = e || window.event;
  e.preventDefault();
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmouseup = closeDragElement;
  document.onmousemove = elementDrag;
}

function elementDrag(e) {
  e = e || window.event;
  e.preventDefault();
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  card.style.top = (card.offsetTop - pos2) + "px";
  card.style.left = (card.offsetLeft - pos1) + "px";
}

function closeDragElement() {
  document.onmouseup = null;
  document.onmousemove = null;
}`
  },

  // Анимации
  'transition-fade': {
  title: 'Плавное появление',
  desc: 'Элемент плавно появляется при наведении.',
  html: '<div class="fade-element">Наведи на меня</div>',
  css: `.fade-element {
  opacity: 0.5;
  transition: opacity 0.3s;
}
.fade-element:hover {
  opacity: 1;
}`
},
  'animation-bounce': {
    title: 'Прыжок',
    desc: 'Анимация прыжка при наведении.',
    html: '<div class="bounce-element">Прыгни!</div>',
    css: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
.bounce-element {
  display: inline-block;
  padding: 10px;
  background: #0d6efd;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
.bounce-element:hover {
  animation: bounce 0.5s ease infinite;
}`
  },
  'keyframes-spin': {
    title: 'Вращение',
    desc: 'Элемент вращается по кругу.',
    html: '<div class="spin-element">Крутись!</div>',
    css: `@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.spin-element {
  width: 50px;
  height: 50px;
  background: #0d6efd;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}`
  },
  'js-animate': {
    title: 'JS-анимация',
    desc: 'Анимация с помощью JavaScript.',
    html: '<div class="js-animated-box" id="animatedBox" style="width: 50px; height: 50px; background: #0d6efd;"></div>',
    js: `const box = document.getElementById('animatedBox');
let pos = 0;
const id = setInterval(frame, 5);
function frame() {
  if (pos === 350) {
    clearInterval(id);
  } else {
    pos++;
    box.style.left = pos + 'px';
  }
}`
  },
  'js-tween': {
    title: 'Плавный tween',
    desc: 'Плавное перемещение с помощью JS.',
    html: '<div class="tween-box" id="tweenBox" style="width: 50px; height: 50px; background: #28a745; position: relative;"></div>',
    js: `const box = document.getElementById('tweenBox');
let start = 0;
const duration = 1000;
const startTime = performance.now();

function animate(currentTime) {
  const elapsed = currentTime - startTime;
  const progress = Math.min(elapsed / duration, 1);
  const pos = progress * 350;
  box.style.left = pos + 'px';
  if (progress < 1) {
    requestAnimationFrame(animate);
  }
}
requestAnimationFrame(animate);`
  },

  // Темы
  'theme-variables': {
    title: 'CSS-переменные',
    desc: 'Использование CSS-переменных для темы.',
    html: '<div class="theme-demo">Пример с переменными</div>',
    css: `:root {
  --bg-color: #ffffff;
  --text-color: #333333;
}
[data-theme="dark"] {
  --bg-color: #222222;
  --text-color: #ffffff;
}
.theme-demo {
  background: var(--bg-color);
  color: var(--text-color);
  padding: 20px;
  border-radius: 8px;
}`
  },
  'theme-class': {
    title: 'Переключение класса',
    desc: 'Переключение темы через класс.',
    html: '<div class="theme-class-demo">Тема через класс</div>',
    css: `.theme-class-demo {
  background: #ffffff;
  color: #333333;
  padding: 20px;
  border-radius: 8px;
}
.theme-class-demo.dark {
  background: #222222;
  color: #ffffff;
}`
  },
  'theme-toggle': {
    title: 'Переключение темы',
    desc: 'Изменение темы сайта на светлую/тёмную.',
    html: '<button class="theme-toggle-btn">Сменить тему</button>',
    css: `.theme-toggle-btn {
  padding: 10px 20px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}`,
    js: `document.querySelector('.theme-toggle-btn').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});`
  },
  'theme-storage': {
    title: 'Сохранение темы',
    desc: 'Сохранение темы в localStorage.',
    html: '<button class="theme-storage-btn">Сменить тему</button>',
    js: `const themeBtn = document.querySelector('.theme-storage-btn');
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.add('dark-theme');
}
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});`
  },

  // Модальные окна
  'modal-basic': {
    title: 'Простая модалка',
    desc: 'Модальное окно с CSS-анимацией.',
    html: `<button class="modal-open-btn">Открыть</button>
<div class="modal-overlay" style="display:none;">
  <div class="modal-content">
    <h3>Модальное окно</h3>
    <p>Содержимое модалки</p>
    <button class="modal-close-btn">Закрыть</button>
  </div>
</div>`,
    css: `.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s;
}
.modal-overlay.active {
  opacity: 1;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
}`
  },
  'tooltip-basic': {
    title: 'Подсказка',
    desc: 'Простая подсказка при наведении.',
    html: `<div class="tooltip">Наведи
  <span class="tooltip-text">Подсказка</span>
</div>`,
    css: `.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.tooltip .tooltip-text {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}
.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}`
  },
  'modal-js': {
    title: 'JS-модалка',
    desc: 'Модальное окно с JavaScript.',
    html: `<button class="modal-js-open">Открыть</button>
<div class="modal-js-overlay" style="display:none;">
  <div class="modal-js-content">
    <h3>JS-модалка</h3>
    <p>Содержимое</p>
    <button class="modal-js-close">Закрыть</button>
  </div>
</div>`,
    css: `.modal-js-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-js-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
}`,
    js: `document.querySelector('.modal-js-open').addEventListener('click', () => {
  document.querySelector('.modal-js-overlay').style.display = 'flex';
});
document.querySelector('.modal-js-close').addEventListener('click', () => {
  document.querySelector('.modal-js-overlay').style.display = 'none';
});`
  },
  'tooltip-js': {
    title: 'JS-подсказка',
    desc: 'Подсказка, показываемая по клику.',
    html: `<button class="tooltip-js-btn">Показать подсказку</button>
<div class="tooltip-js-content" style="display:none; background: #555; color: white; padding: 5px; border-radius: 6px; margin-top: 5px;">JS-подсказка</div>`,
    js: `document.querySelector('.tooltip-js-btn').addEventListener('click', () => {
  const tooltip = document.querySelector('.tooltip-js-content');
  tooltip.style.display = tooltip.style.display === 'none' ? 'block' : 'none';
});`
  },

  // Адаптивность
  'responsive-grid': {
    title: 'Адаптивная сетка',
    desc: 'Сетка, которая меняет количество колонок при изменении ширины экрана.',
    html: `<div class="responsive-grid">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>`,
    css: `.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}
.responsive-grid div {
  padding: 15px;
  background: #e9ecef;
  text-align: center;
  border-radius: 6px;
}`
  },
  'media-queries': {
    title: 'Media queries',
    desc: 'Изменение стилей при разных размерах экрана.',
    html: `<div class="mq-demo">Адаптивный текст</div>`,
    css: `.mq-demo {
  font-size: 1rem;
}
@media (min-width: 768px) {
  .mq-demo {
    font-size: 1.5rem;
  }
}
@media (min-width: 1024px) {
  .mq-demo {
    font-size: 2rem;
  }
}`
  },
  'resize-handler': {
    title: 'Обработчик ресайза',
    desc: 'Отслеживание изменения размера окна.',
    html: `<p id="resizeText">Ширина окна: <span id="widthDisplay">0</span>px</p>`,
    js: `function updateWidth() {
  document.getElementById('widthDisplay').textContent = window.innerWidth;
}
updateWidth();
window.addEventListener('resize', updateWidth);`
  },
  'touch-events': {
    title: 'События касания',
    desc: 'Обработка touch-событий.',
    html: `<div class="touch-area" id="touchArea" style="width: 200px; height: 100px; background: #0d6efd; display: flex; align-items: center; justify-content: center; color: white;">Коснись меня</div>`,
    js: `const touchArea = document.getElementById('touchArea');
touchArea.addEventListener('touchstart', () => {
  touchArea.textContent = 'Коснулись!';
  touchArea.style.background = '#28a745';
});
touchArea.addEventListener('touchend', () => {
  setTimeout(() => {
    touchArea.textContent = 'Коснись меня';
    touchArea.style.background = '#0d6efd';
  }, 500);
});`
  },

  // UX
  'ux-scrollbar': {
    title: 'Кастомный скроллбар',
    desc: 'Стилизованный скроллбар.',
    html: `<div class="custom-scrollbar" style="height: 150px; overflow-y: scroll; border: 1px solid #ccc; padding: 10px;">
  <p>Это длинный текст, чтобы появился скролл.</p>
  <p>Это длинный текст, чтобы появился скролл.</p>
  <p>Это длинный текст, чтобы появился скролл.</p>
  <p>Это длинный текст, чтобы появился скролл.</p>
  <p>Это длинный текст, чтобы появился скролл.</p>
  <p>Это длинный текст, чтобы появился скролл.</p>
  <p>Это длинный текст, чтобы появился скролл.</p>
  <p>Это длинный текст, чтобы появился скролл.</p>
  <p>Это длинный текст, чтобы появился скролл.</p>
  <p>Это длинный текст, чтобы появился скролл.</p>
  <p>Это длинный текст, чтобы появился скролл.</p>
  <p>Это длинный текст, чтобы появился скролл.</p>
  <p>Это длинный текст, чтобы появился скролл.</p>
  <p>Это длинный текст, чтобы появился скролл.</p>
  <p>Это длинный текст, чтобы появился скролл.</p>
</div>`,
    css: `.custom-scrollbar::-webkit-scrollbar {
  width: 12px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}`
  },
  'ux-checkbox': {
    title: 'Кастомный чекбокс',
    desc: 'Стилизованный чекбокс.',
    html: `<label class="custom-checkbox-container">
  <input type="checkbox">
  <span class="checkmark"></span>
  Отметь меня
</label>`,
    css: `.custom-checkbox-container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.custom-checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-radius: 4px;
}

.custom-checkbox-container:hover input ~ .checkmark {
  background-color: #ccc;
}

.custom-checkbox-container input:checked ~ .checkmark {
  background-color: #0d6efd;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox-container .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}`
  },
  'ux-slider': {
    title: 'Кастомный слайдер',
    desc: 'Стилизованный слайдер.',
    html: `<input type="range" min="0" max="100" value="50" class="custom-slider" />`,
    css: `.custom-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
}

.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #0d6efd;
  cursor: pointer;
}

.custom-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #0d6efd;
  cursor: pointer;
}`
  },
  'ux-tabs': {
    title: 'Кастомные табы',
    desc: 'Интерактивные табы.',
    html: `<div class="tab-container">
  <button class="tab-btn active" data-tab="tab1">Вкладка 1</button>
  <button class="tab-btn" data-tab="tab2">Вкладка 2</button>
  <div class="tab-content active" id="tab1">
    <p>Содержимое первой вкладки</p>
  </div>
  <div class="tab-content" id="tab2">
    <p>Содержимое второй вкладки</p>
  </div>
</div>`,
    js: `document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});`
  },

  // Виджеты
  'progress-bar': {
  title: 'Циклический прогресс-бар',
  desc: 'Прогресс идёт от 0% до 100%, затем сбрасывается и повторяется.',
  html: `<div class="progress-container">
  <div class="progress-bar" id="progressBar"></div>
</div>`,
  css: `.progress-container {
  width: 100%;
  height: 20px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background: #0d6efd;
  width: 0%;
  transition: width 0.1s linear;
}`,
  js: `let progress = 0;
const bar = document.getElementById('progressBar');
function animateProgress() {
  progress = (progress + 1) % 101;
  bar.style.width = progress + '%';
  setTimeout(animateProgress, 50);
}
animateProgress();`

  },
    'calendar': {
    title: 'Календарь',
    desc: 'Простой календарь.',
    html: `<div class="calendar">
  <h3>Ноябрь 2025</h3>
  <div class="calendar-grid">
    <div class="calendar-day">Пн</div>
    <div class="calendar-day">Вт</div>
    <div class="calendar-day">Ср</div>
    <div class="calendar-day">Чт</div>
    <div class="calendar-day">Пт</div>
    <div class="calendar-day">Сб</div>
    <div class="calendar-day">Вс</div>
    <div class="calendar-date">28</div>
    <div class="calendar-date">29</div>
    <div class="calendar-date">30</div>
    <div class="calendar-date">31</div>
    <div class="calendar-date">1</div>
    <div class="calendar-date">2</div>
    <div class="calendar-date">3</div>
    <div class="calendar-date">4</div>
    <div class="calendar-date">5</div>
    <div class="calendar-date">6</div>
    <div class="calendar-date">7</div>
    <div class="calendar-date">8</div>
    <div class="calendar-date">9</div>
    <div class="calendar-date">10</div>
    <div class="calendar-date">11</div>
    <div class="calendar-date">12</div>
    <div class="calendar-date">13</div>
    <div class="calendar-date today">14</div>
    <div class="calendar-date">15</div>
    <div class="calendar-date">16</div>
    <div class="calendar-date">17</div>
    <div class="calendar-date">18</div>
    <div class="calendar-date">19</div>
    <div class="calendar-date">20</div>
    <div class="calendar-date">21</div>
    <div class="calendar-date">22</div>
    <div class="calendar-date">23</div>
    <div class="calendar-date">24</div>
    <div class="calendar-date">25</div>
    <div class="calendar-date">26</div>
    <div class="calendar-date">27</div>
    <div class="calendar-date">28</div>
    <div class="calendar-date">29</div>
    <div class="calendar-date">30</div>
  </div>
</div>`,
    css: `.calendar {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
}
.calendar h3 {
  margin-bottom: 10px;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* Правильно: 7 колонок */
  gap: 5px;
}
.calendar-day {
  font-weight: bold;
  padding: 5px;
  background: #e9ecef;
  border-radius: 4px;
}
.calendar-date {
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
}
.calendar-date:hover {
  background: #e9ecef;
}
.calendar-date.today {
  background: #0d6efd;
  color: white;
}`
  },
  'tabs': {
    title: 'Табы',
    desc: 'Интерактивные табы.',
    html: `<div class="tabs-container">
  <button class="tab-btn active" data-tab="tab1">Вкладка 1</button>
  <button class="tab-btn" data-tab="tab2">Вкладка 2</button>
  <div class="tab-content active" id="tab1">
    <p>Содержимое первой вкладки</p>
  </div>
  <div class="tab-content" id="tab2">
    <p>Содержимое второй вкладки</p>
  </div>
</div>`,
    js: `document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});`
  },
  'slider': {
    title: 'Слайдер',
    desc: 'Простой слайдер значений.',
    html: `<input type="range" min="0" max="100" value="50" class="slider-js" id="slider" />
<p>Значение: <span id="sliderValue">50</span></p>`,
    js: `const slider = document.getElementById('slider');
const output = document.getElementById('sliderValue');
output.textContent = slider.value;

slider.oninput = function() {
  output.textContent = this.value;
};`
  }
};

// Переключение вкладок (CSS/JS) в каждом разделе
document.querySelectorAll('.section-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const section = btn.dataset.section;
    const sectionId = btn.closest('section').id;
    const nav = btn.closest('.section-nav');
    const detailBoxId = `${sectionId}-detail`;
    const detailBox = document.getElementById(detailBoxId);

    // Убираем активные классы
    nav.querySelectorAll('.section-btn').forEach(b => b.classList.remove('active'));
    nav.closest('.section-content').querySelectorAll('.examples').forEach(ex => ex.classList.remove('active'));

    // Добавляем активный класс кнопке
    btn.classList.add('active');

    // Показываем нужные примеры
    const examplesId = `${sectionId}-${section}-examples`;
    const examplesEl = document.getElementById(examplesId);
    if (examplesEl) {
      examplesEl.classList.add('active');
      // Показываем первый пример в этой вкладке
      const firstExample = examplesEl.querySelector('.example-card');
      if (firstExample) {
        const exampleId = firstExample.dataset.example;
        if (detailBox) {
          showExample(exampleId, detailBox);
        }
      }
    }
  });
});

// Обработка кликов по примерам
document.querySelectorAll('.example-card').forEach(card => {
  card.addEventListener('click', () => {
    const exampleId = card.dataset.example;
    const sectionId = card.closest('section').id;
    let detailBoxId = `${sectionId}-detail`;
    if (sectionId === 'typography') detailBoxId = 'typo-detail';
    if (sectionId === 'buttons') detailBoxId = 'buttons-detail';
    if (sectionId === 'forms') detailBoxId = 'forms-detail';
    if (sectionId === 'navigation') detailBoxId = 'nav-detail';
    if (sectionId === 'media') detailBoxId = 'media-detail';
    if (sectionId === 'cards') detailBoxId = 'cards-detail';
    if (sectionId === 'animations') detailBoxId = 'anim-detail';
    if (sectionId === 'themes') detailBoxId = 'themes-detail';
    if (sectionId === 'modals') detailBoxId = 'modals-detail';
    if (sectionId === 'responsive') detailBoxId = 'responsive-detail';
    if (sectionId === 'ux') detailBoxId = 'ux-detail';
    if (sectionId === 'widgets') detailBoxId = 'widgets-detail';

    const detailBox = document.getElementById(detailBoxId);
    if (detailBox) {
      showExample(exampleId, detailBox);
    }
  });
});

function showExample(id, detailBox) {
  const ex = examplesData[id];
  if (!ex) return;

  let codeHtml = ex.html;
  let codeCss = ex.css || '';
  let codeJs = ex.js || '';

  // Экранируем HTML/JS для безопасного отображения
  const escapedHtml = escapeHtml(codeHtml);
  const escapedCss = escapeHtml(codeCss);
  const escapedJs = escapeHtml(codeJs);

  // Выводим описание и превью
  detailBox.innerHTML = `
    <h2>${ex.title}</h2>
    <p>${ex.desc}</p>
    <div class="preview-area">${codeHtml}</div>
    <div class="code-block"></div>
  `;

  // Находим блок кода и безопасно вставляем содержимое
  const codeBlock = detailBox.querySelector('.code-block');
  let fullCode = escapedHtml + '\n\n<style>\n' + escapedCss + '\n</style>';
  if (codeJs) {
    fullCode += '\n\n<script>\n' + escapedJs + '\n</script>';
  }

  codeBlock.textContent = fullCode; // <-- используем textContent, чтобы код отображался как текст

  // Убираем старые слушатели (если есть)
  removeEventListeners();

  // Добавляем функциональность только для JS-примеров (в preview)
  if (id === 'js-alert') {
    const btn = document.getElementById('alertBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        alert('Привет из JavaScript!');
      });
    }
  } else if (id === 'js-toggle') {
    const btn = document.getElementById('toggleBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        btn.classList.toggle('highlight');
      });
    }
  } else if (id === 'js-counter') {
    const btn = document.getElementById('counterBtn');
    if (btn) {
      let count = 0;
      btn.addEventListener('click', () => {
        count++;
        btn.textContent = `Кликов: ${count}`;
      });
    }
  } else if (id === 'typo-change') {
    const p = document.getElementById('textChange');
    if (p) {
      p.addEventListener('click', () => {
        p.textContent = 'Текст изменился!';
      });
    }
  } else if (id === 'typo-typewriter') {
    const text = 'Привет, мир!';
    let i = 0;
    const speed = 100;
    function typeWriter() {
      if (i < text.length) {
        document.getElementById('typewriter').innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    typeWriter();
  } else if (id === 'form-validation') {
    const form = document.querySelector('.validated-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Форма отправлена!');
      });
    }
  } else if (id === 'form-dynamic') {
    const btn = document.getElementById('addField');
    if (btn) {
      btn.addEventListener('click', () => {
        const container = document.querySelector('.fields-container');
        const newField = document.createElement('input');
        newField.type = 'text';
        newField.placeholder = 'Поле ' + (container.children.length + 1);
        container.appendChild(newField);
      });
    }
  } else if (id === 'nav-mobile') {
    const toggle = document.querySelector('.menu-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        document.querySelector('.mobile-nav').classList.toggle('active');
      });
    }
  } else if (id === 'nav-active') {
    document.querySelectorAll('.active-nav a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.active-nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
      });
    });
  } else if (id === 'img-slider') {
    let currentImage = 0;
    const images = [
      'https://placehold.co/400x300',
      'https://placehold.co/400x300/ff0000',
      'https://placehold.co/400x300/00ff00'
    ];
    const imgElement = document.querySelector('.slider-img');
    document.querySelector('.next').addEventListener('click', () => {
      currentImage = (currentImage + 1) % images.length;
      imgElement.src = images[currentImage];
    });
    document.querySelector('.prev').addEventListener('click', () => {
      currentImage = (currentImage - 1 + images.length) % images.length;
      imgElement.src = images[currentImage];
    });
  } else if (id === 'video-controls') {
    const video = document.getElementById('videoElement');
    const playBtn = document.getElementById('playBtn');
    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playBtn.textContent = '⏸️';
      } else {
        video.pause();
        playBtn.textContent = '▶️';
      }
    });
  } else if (id === 'card-expand') {
    document.querySelector('.expanding-card').addEventListener('click', function() {
      this.classList.toggle('active');
    });
  } else if (id === 'card-drag') {
    let card = document.querySelector('.draggable-card');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    card.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      card.style.top = (card.offsetTop - pos2) + "px";
      card.style.left = (card.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  } else if (id === 'theme-storage') {
    const themeBtn = document.querySelector('.theme-storage-btn');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  } else if (id === 'modal-js') {
    document.querySelector('.modal-js-open').addEventListener('click', () => {
      document.querySelector('.modal-js-overlay').style.display = 'flex';
    });
    document.querySelector('.modal-js-close').addEventListener('click', () => {
      document.querySelector('.modal-js-overlay').style.display = 'none';
    });
  } else if (id === 'resize-handler') {
    function updateWidth() {
      document.getElementById('widthDisplay').textContent = window.innerWidth;
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
  } else if (id === 'touch-events') {
    const touchArea = document.getElementById('touchArea');
    touchArea.addEventListener('touchstart', () => {
      touchArea.textContent = 'Коснулись!';
      touchArea.style.background = '#28a745';
    });
    touchArea.addEventListener('touchend', () => {
      setTimeout(() => {
        touchArea.textContent = 'Коснись меня';
        touchArea.style.background = '#0d6efd';
      }, 500);
    });
  } else if (id === 'tooltip-js') {
    document.querySelector('.tooltip-js-btn').addEventListener('click', () => {
      const tooltip = document.querySelector('.tooltip-js-content');
      tooltip.style.display = tooltip.style.display === 'none' ? 'block' : 'none';
    });
  } else if (id === 'ux-tabs' || id === 'tabs') {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  } else if (id === 'slider') {
    const slider = document.getElementById('slider');
    const output = document.getElementById('sliderValue');
    output.textContent = slider.value;
    } else if (id === 'progress-bar') {
  // Запускаем анимацию через небольшую задержку, чтобы элемент успел отрисоваться
  setTimeout(() => {
    let progress = 0;
    const bar = document.querySelector('.progress-bar');
    if (!bar) return; // если элемент не найден — выходим
    function animate() {
      progress = (progress + 1) % 101;
      bar.style.width = progress + '%';
      setTimeout(animate, 50);
    }
    animate();
  }, 100); // задержка 100 мс — обычно достаточно
}

    slider.oninput = function() {
      output.textContent = this.value;
    };
  }


function removeEventListeners() {
  // Удаляем все event listeners из preview-кнопок
  const previewBtns = document.querySelectorAll('.preview-area button');
  previewBtns.forEach(btn => {
    // Создаём клон кнопки без событий
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Инициализация: показываем первый пример в каждом разделе
document.querySelectorAll('.section-btn.active').forEach(btn => {
  const section = btn.dataset.section;
  const sectionId = btn.closest('section').id;
  const examplesId = `${sectionId}-${section}-examples`;
  const examplesEl = document.getElementById(examplesId);
  if (examplesEl) {
    const firstExample = examplesEl.querySelector('.example-card');
    if (firstExample) {
      const exampleId = firstExample.dataset.example;
      let detailBoxId = `${sectionId}-detail`;
      if (sectionId === 'typography') detailBoxId = 'typo-detail';
      if (sectionId === 'buttons') detailBoxId = 'buttons-detail';
      if (sectionId === 'forms') detailBoxId = 'forms-detail';
      if (sectionId === 'navigation') detailBoxId = 'nav-detail';
      if (sectionId === 'media') detailBoxId = 'media-detail';
      if (sectionId === 'cards') detailBoxId = 'cards-detail';
      if (sectionId === 'animations') detailBoxId = 'anim-detail';
      if (sectionId === 'themes') detailBoxId = 'themes-detail';
      if (sectionId === 'modals') detailBoxId = 'modals-detail';
      if (sectionId === 'responsive') detailBoxId = 'responsive-detail';
      if (sectionId === 'ux') detailBoxId = 'ux-detail';
      if (sectionId === 'widgets') detailBoxId = 'widgets-detail';

      const detailBox = document.getElementById(detailBoxId);
      if (detailBox) {
        showExample(exampleId, detailBox);
      }
    }
  }
});
