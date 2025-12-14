document.addEventListener('DOMContentLoaded', () => {
    // --- Данные примеров ---
    const examplesData = {
        // Типографика
        'typo-responsive': {
            title: 'Адаптивный текст',
            desc: 'Шрифт изменяется в зависимости от размера экрана.',
            html: '<p class="responsive-text">Этот текст адаптируется под размер экрана</p>',
            css: `.responsive-text {font-size: clamp(1rem, 4vw, 2.5rem);}`
        },
        'typo-gradient': {
            title: 'Градиентный текст',
            desc: 'Текст с градиентом.',
            html: '<h2 class="gradient-text">Градиентный текст</h2>',
            css: `.gradient-text {background: linear-gradient(45deg, #ff9a9e, #fad0c4, #a1c4fd, #c2e9fb);-webkit-background-clip: text;-webkit-text-fill-color: transparent;font-size: 2.5rem;font-weight: bold;text-align: center;margin: 20px 0;}`
        },
        'typo-typewriter': {
            title: 'Печатающийся текст',
            desc: 'Текст появляется по буквам.',
            html: '<p class="typewriter-text" id="typewriter"></p>',
            js: `const text = 'Привет, мир!';let i = 0;const speed = 100;function typeWriter() {if (i < text.length) {document.getElementById('typewriter').innerHTML += text.charAt(i);i++;setTimeout(typeWriter, speed);}}typeWriter();`
        },
        // Кнопки
        'css-basic': {
            title: 'Базовая кнопка на CSS',
            desc: 'Простейшая кнопка с использованием базовых свойств CSS: padding, border-radius, background.',
            html: '<button class="btn-basic">Нажми</button>',
            css: `.btn-basic {padding: 12px 24px;background: #0d6efd;color: white;border: none;border-radius: 8px;cursor: pointer;font-weight: 600;transition: all 0.2s;}.btn-basic:hover {background: #0b5ed7;transform: scale(1.05);}`
        },
        'css-gradient': {
            title: 'Кнопка с градиентом',
            desc: 'Использование градиента розового цвета для создания современного вида кнопки.',
            html: '<button class="btn-gradient">Нажми</button>',
            css: `.btn-gradient {padding: 12px 24px;background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);color: #333;border: none;border-radius: 8px;cursor: pointer;font-weight: 600;transition: all 0.2s;}.btn-gradient:hover {background: linear-gradient(135deg, #ff7a82, #f8b9b0);transform: scale(1.05);}`
        },
        'css-hover': {
            title: 'Анимация при наведении',
            desc: 'Добавление плавного изменения цвета и масштаба при наведении курсора.',
            html: '<button class="btn-hover">Нажми</button>',
            css: `.btn-hover {padding: 12px 24px;background: #28a745;color: white;border: none;border-radius: 8px;cursor: pointer;font-weight: 600;transition: all 0.3s;}.btn-hover:hover {background: #218838;transform: scale(1.05) rotate(2deg);}`
        },
        'js-alert': {
            title: 'Кнопка с alert()',
            desc: 'Простейший пример взаимодействия: при клике выводится системное всплывающее окно.',
            html: '<button class="btn-js-alert" id="alertBtn">Показать</button>',
            js: `document.getElementById('alertBtn').addEventListener('click', () => {alert('Привет из JavaScript!');});`
        },
        'js-toggle': {
            title: 'Toggle класса',
            desc: 'Переключение CSS-класса при клике.',
            html: '<button class="btn-js-toggle" id="toggleBtn">Переключить</button>',
            js: `document.getElementById('toggleBtn').addEventListener('click', () => {document.getElementById('toggleBtn').classList.toggle('highlight');});`
        },
        'js-counter': {
            title: 'Счётчик кликов',
            desc: 'Счётчик кликов по кнопке.',
            html: '<button class="btn-js-counter" id="counterBtn">Кликни! (0)</button>',
            js: `let count = 0; const btn = document.getElementById('counterBtn'); btn.addEventListener('click', () => { count++; btn.textContent = 'Кликни! (' + count + ')'; });`
        },
        // Формы
        'form-basic': {
            title: 'Простая форма',
            desc: 'Простая HTML-форма.',
            html: `<form class="basic-form"><label>Имя:</label><input type="text"><label>Email:</label><input type="email"><button type="submit">Отправить</button></form>`,
            css: `.basic-form {max-width: 400px; margin: 0 auto; padding: 20px;}.basic-form input, .basic-form button {width: 100%; padding: 10px; margin-bottom: 10px; border-radius: 4px; border: 1px solid #ccc;}`
        },
        'form-styled': {
            title: 'Стилизованная форма',
            desc: 'Стилизованная HTML-форма.',
            html: `<form class="styled-form"><table><tr><td><label>Имя:</label></td><td><input type="text" required></td></tr><tr><td><label>Email:</label></td><td><input type="email" required></td></tr><tr><td><label>Пол:</label></td><td><select><option>Мужской</option><option>Женский</option></select></td></tr><tr><td colspan="2"><button type="submit">Отправить</button></td></tr></table></form>`,
            css: `.styled-form {max-width: 500px; margin: 0 auto; padding: 20px; background-color: #f0f8ff; border-radius: 10px; border: 2px solid #4682b4; box-shadow: 0 4px 8px rgba(0,0,0,0.1);}.styled-form input, .styled-form select, .styled-form textarea {width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box;}.styled-form label {display: block; margin-bottom: 5px; font-weight: bold; color: #4682b4;}.styled-form table {width: 100%; border-collapse: collapse; margin-top: 10px;}.styled-form th, .styled-form td {border: 1px solid #ccc; padding: 8px; text-align: left;}.styled-form th {background-color: #e6e6fa;}`
        },
        'form-validation': {
            title: 'Валидация формы',
            desc: 'Валидация формы с помощью JavaScript.',
            html: `<form id="validationForm" class="basic-form"><label>Имя:</label><input type="text" name="name" required><label>Email:</label><input type="email" name="email" required><button type="submit">Отправить</button><p id="formMessage"></p></form>`,
            js: `document.getElementById('validationForm').addEventListener('submit', function(e) {e.preventDefault();const messageEl = document.getElementById('formMessage');messageEl.textContent = 'Форма отправлена!';messageEl.style.color = 'green';});`
        },
        'form-dynamic': {
            title: 'Динамическое поле',
            desc: 'Добавление новых полей ввода.',
            html: `<div><button id="addFieldBtn">Добавить поле</button><div id="fieldsContainer"></div></div>`,
            js: `let fieldCount = 0; document.getElementById('addFieldBtn').addEventListener('click', () => {fieldCount++;const container = document.getElementById('fieldsContainer');const newField = document.createElement('input');newField.type = 'text';newField.placeholder = 'Поле ' + fieldCount;newField.style.display = 'block';newField.style.margin = '5px 0';container.appendChild(newField);});`
        },
        // Навигация
        'nav-horizontal': {
            title: 'Горизонтальное меню',
            desc: 'Простое меню в строку.',
            html: `<ul class="nav-menu"><li><a href="#">Главная</a></li><li><a href="#">О нас</a></li><li><a href="#">Контакты</a></li></ul>`,
            css: `.nav-menu {display: flex;list-style: none;gap: 20px;}.nav-menu a {text-decoration: none;padding: 8px 16px;border-radius: 4px;background: #e9ecef;transition: background 0.2s;}.nav-menu a:hover {background: #3498db; color: white;}`
        },
        'nav-dropdown': {
            title: 'Выпадающее меню',
            desc: 'Меню с выпадающим списком.',
            html: `<div class="dropdown"><button class="dropdown-btn">Меню</button><ul class="dropdown-content"><li><a href="#">Подпункт 1</a></li><li><a href="#">Подпункт 2</a></li><li><a href="#">Подпункт 3</a></li></ul></div>`,
            css: `.dropdown {position: relative; display: inline-block;}.dropdown-btn {padding: 12px 20px; background-color: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;}.dropdown-content {display: none; position: absolute; background-color: var(--card-bg); min-width: 160px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1; list-style: none; padding: 0; margin: 0; border-radius: 4px; overflow: hidden;}.dropdown-content a {color: var(--text); padding: 12px 16px; text-decoration: none; display: block; transition: background 0.2s;}.dropdown-content a:hover {background-color: #f1f1f1;}.dropdown:hover .dropdown-content {display: block;}`,
            js: `// Для демонстрации на мобильных или при кликеconst dropdownBtn = document.querySelector('.dropdown-btn');const dropdownContent = document.querySelector('.dropdown-content');dropdownBtn.addEventListener('click', () => {dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';});`
        },
        'nav-sticky': {
            title: 'Липкое меню',
            desc: 'Меню, которое остаётся наверху при прокрутке.',
            html: `<nav class="sticky-nav"><a href="#">Главная</a><a href="#">О нас</a><a href="#">Контакты</a></nav>`,
            css: `.sticky-nav {position: sticky; top: 0; background: #343a40; padding: 10px; display: flex; gap: 20px;}.sticky-nav a {color: white; text-decoration: none;}`
        },
        'nav-mobile': {
            title: 'Мобильное меню',
            desc: 'Простое мобильное меню.',
            html: `<div class="mobile-menu"><button class="menu-toggle">☰</button><ul class="mobile-nav"><li><a href="#">Главная</a></li><li><a href="#">О нас</a></li><li><a href="#">Контакты</a></li></ul></div>`,
            css: `.mobile-menu {position: relative;}.mobile-nav {display: none; list-style: none; position: absolute; top: 100%; left: 0; background: var(--card-bg); padding: 10px; box-shadow: 0 2px 5px var(--shadow);}.mobile-nav.show {display: block;}.menu-toggle {background: none; border: none; font-size: 1.5rem; cursor: pointer;}`
        },
        'nav-active': {
            title: 'Активный пункт',
            desc: 'Выделение активного пункта меню.',
            html: `<ul class="active-nav"><li><a href="#" class="active">Главная</a></li><li><a href="#">О нас</a></li><li><a href="#">Контакты</a></li></ul>`,
            css: `.active-nav {display: flex; gap: 20px; list-style: none;}.active-nav a {text-decoration: none; padding: 8px 16px; border-radius: 4px;}.active-nav a.active {background: #3498db; color: white;}`
        },
        // Медиа
        'img-rounded': {
            title: 'Круглое изображение',
            desc: 'Круглое изображение с border-radius.',
            html: '<img src="https://placehold.co/200x200/ff0000/ffffff?text=:)" alt="Круг" class="rounded-img" />',
            css: `.rounded-img {width: 100px; height: 100px; border-radius: 50%; object-fit: cover; overflow: hidden; display: block; margin: 0 auto;}`
        },
        'video-embed': {
            title: 'Видео',
            desc: 'Встраиваемое видео.',
            html: '<video controls class="video-responsive"><source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">Ваш браузер не поддерживает видео.</video>',
            css: `.video-responsive {width: 100%; height: 300px; border-radius: 8px; border: 1px solid var(--border);}`
        },
        'img-slider': {
            title: 'Слайдер изображений',
            desc: 'Простой слайдер изображений.',
            html: `<div class="img-slider"><img id="slideImage" src="https://placehold.co/400x300/ff0000/ffffff?text=1" alt="Slide"><div><button id="prevSlide">← Назад</button><button id="nextSlide">Вперёд →</button></div></div>`,
            js: `const images = ['https://placehold.co/400x300/ff0000/ffffff?text=1','https://placehold.co/400x300/00ff00/000000?text=2','https://placehold.co/400x300/0000ff/ffffff?text=3'];let currentImageIndex = 0;const imgElement = document.getElementById('slideImage');const prevBtn = document.getElementById('prevSlide');const nextBtn = document.getElementById('nextSlide');function updateImage() {imgElement.src = images[currentImageIndex];}prevBtn.addEventListener('click', () => {currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;updateImage();});nextBtn.addEventListener('click', () => {currentImageIndex = (currentImageIndex + 1) % images.length;updateImage();});`
        },
        'video-controls': {
            title: 'Управление видео',
            desc: 'Кастомное управление воспроизведением.',
            html: `<div><video id="customVideo" width="400" controls style="display: none;"><source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4"></video><button id="playPauseBtn">▶️ Воспроизвести</button></div>`,
            js: `const video = document.getElementById('customVideo');const playPauseBtn = document.getElementById('playPauseBtn');video.style.display = 'block';playPauseBtn.addEventListener('click', () => {if (video.paused) {video.play();playPauseBtn.textContent = '⏸️ Пауза';} else {video.pause();playPauseBtn.textContent = '▶️ Воспроизвести';}});`
        },
        // Карточки
        'card-basic': {
            title: 'Базовая карточка',
            desc: 'Простая карточка.',
            html: `<div class="card"><h3>Заголовок</h3><p>Описание карточки.</p></div>`,
            css: `.card {background: #f8f9fa; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);}`
        },
        'card-hover': {
            title: 'Карточка с hover',
            desc: 'Карточка с эффектом при наведении.',
            html: `<div class="card-hover"><h3>Заголовок</h3><p>Описание карточки.</p></div>`,
            css: `.card-hover {background: #f8f9fa; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: transform 0.3s ease, box-shadow 0.3s ease;}.card-hover:hover {transform: translateY(-5px); box-shadow: 0 4px 8px rgba(0,0,0,0.2);}`
        },
        'card-toggle': {
            title: 'Переключение карточек',
            desc: 'Показ/скрытие карточки по кнопке.',
            html: `<button id="toggleCardBtn">Показать/Скрыть</button><div id="toggleableCard" class="card" style="display: none; margin-top: 10px;"><h3>Скрытая карточка</h3><p>Эта карточка переключается.</p></div>`,
            js: `document.getElementById('toggleCardBtn').addEventListener('click', () => {const card = document.getElementById('toggleableCard');card.style.display = card.style.display === 'none' ? 'block' : 'none';});`
        },
        // Анимации
        'transition-fade': {
            title: 'Плавное появление',
            desc: 'Элемент плавно появляется при наведении.',
            html: '<div class="fade-element">Наведи на меня</div>',
            css: `.fade-element {opacity: 0.5; transition: opacity 0.3s;}.fade-element:hover {opacity: 1;}`
        },
        'animation-bounce': {
            title: 'Прыжок',
            desc: 'Анимация прыжка при наведении.',
            html: '<div class="bounce-element">Прыгни!</div>',
            css: `@keyframes bounce {0%, 100% { transform: translateY(0); }50% { transform: translateY(-20px); }}.bounce-element {display: inline-block;padding: 10px;background: #0d6efd;color: white;border-radius: 6px;cursor: pointer;}.bounce-element:hover {animation: bounce 0.5s ease infinite;}`
        },
        'keyframes-spin': {
            title: 'Вращение',
            desc: 'Элемент вращается по кругу.',
            html: '<div class="spin-element">Крутись!</div>',
            css: `@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}.spin-element {display: inline-block;padding: 10px;background: #28a745;color: white;border-radius: 6px;cursor: pointer;}.spin-element:hover {animation: spin 2s linear infinite;}`
        },
        'js-tween': {
            title: 'Плавный tween',
            desc: 'Плавное перемещение элемента.',
            html: '<div id="tweenBox" style="width: 50px; height: 50px; background: #6f42c1; position: relative; left: 0;"></div>',
            js: `const box = document.getElementById('tweenBox');let start = 0;const end = 300; // pxlet current = start;const duration = 1000; // mslet startTime = null;function animate(time) {if (!startTime) startTime = time;const elapsed = time - startTime;const progress = Math.min(elapsed / duration, 1);current = start + (end - start) * progress;box.style.left = current + 'px';if (progress < 1) {requestAnimationFrame(animate);}}requestAnimationFrame(animate);`
        },
        // Модальные окна
        'modal-basic': {
            title: 'Простая модалка',
            desc: 'Простое CSS-модальное окно.',
            html: `<button class="modal-open-btn">Открыть</button><div class="modal-overlay" id="basicModal"><div class="modal-content"><h3>Модальное окно</h3><p>Содержимое модалки</p><button class="modal-close-btn">Закрыть</button></div></div>`,
            css: `.modal-overlay {display: none;position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.5);z-index: 1000;}.modal-content {position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);background-color: var(--card-bg);padding: 20px;border-radius: 8px;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);width: 80%;max-width: 500px;text-align: center;}.modal-close-btn {margin-top: 15px;padding: 8px 16px;background-color: #dc3545;color: white;border: none;border-radius: 4px;cursor: pointer;}`,
            js: `const openBtn = document.querySelector('.modal-open-btn');const modal = document.getElementById('basicModal');const closeBtn = document.querySelector('.modal-close-btn');openBtn.addEventListener('click', () => { modal.style.display = 'block'; });closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });`
        },
        'modal-js': {
            title: 'JS-модалка',
            desc: 'Модальное окно с JavaScript.',
            html: `<button id="jsModalBtn">Открыть JS-модалку</button><div class="modal-js-overlay" style="display:none;"><div class="modal-js-content"><h3>JS-модалка</h3><p>Содержимое</p><button class="modal-js-close">Закрыть</button></div></div>`,
            css: `.modal-js-overlay {display: none;position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.5);z-index: 1000;}.modal-js-content {position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);background-color: var(--card-bg);padding: 20px;border-radius: 8px;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);width: 80%;max-width: 500px;text-align: center;}.modal-js-close {margin-top: 15px;padding: 8px 16px;background-color: #dc3545;color: white;border: none;border-radius: 4px;cursor: pointer;}`,
            js: `const jsOpenBtn = document.getElementById('jsModalBtn');const jsModal = document.querySelector('.modal-js-overlay');const jsCloseBtn = document.querySelector('.modal-js-close');jsOpenBtn.addEventListener('click', () => { jsModal.style.display = 'block'; });jsCloseBtn.addEventListener('click', () => { jsModal.style.display = 'none'; });window.addEventListener('click', (e) => { if (e.target === jsModal) jsModal.style.display = 'none'; });`
        },
        'tooltip-js': {
            title: 'JS-подсказка',
            desc: 'Подсказка при наведении (реализована через клик для демонстрации).',
            html: '<button id="tooltipBtn">Показать подсказку</button><div id="tooltip" style="display: none; position: absolute; background: black; color: white; padding: 5px; border-radius: 4px; margin-top: 5px;">Это подсказка!</div>',
            js: `const btn = document.getElementById('tooltipBtn');const tooltip = document.getElementById('tooltip');btn.addEventListener('click', (e) => {tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';tooltip.style.left = e.pageX + 'px';tooltip.style.top = (e.pageY + 10) + 'px';});`
        },
        // Адаптивность
        'responsive-grid': {
            title: 'Адаптивная сетка',
            desc: 'Сетка, которая меняет количество колонок при изменении ширины экрана.',
            html: `<div class="responsive-grid"><div>1</div><div>2</div><div>3</div><div>4</div></div>`,
            css: `.responsive-grid {display: grid;grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));gap: 10px;}.responsive-grid div {padding: 15px;background: #e9ecef;text-align: center;border-radius: 6px;}`
        },
        'media-queries': {
            title: 'Media queries',
            desc: 'Изменение стилей при разных размерах экрана.',
            html: `<div class="mq-demo">Адаптивный текст</div>`,
            css: `.mq-demo {font-size: 1rem;}.mq-demo {font-size: 1rem;}@media (min-width: 768px) {.mq-demo {font-size: 1.5rem;}}@media (min-width: 1024px) {.mq-demo {font-size: 2rem;}}`
        },
        'resize-handler': {
            title: 'Обработчик ресайза',
            desc: 'Отслеживание изменения размера окна.',
            html: `<p id="resizeText">Ширина окна: <span id="widthDisplay">0</span>px</p>`,
            js: `function updateWidth() {document.getElementById('widthDisplay').textContent = window.innerWidth;}updateWidth();window.addEventListener('resize', updateWidth);`
        },
        'touch-events': {
            title: 'События касания',
            desc: 'Обработка touch-событий.',
            html: `<div class="touch-area" id="touchArea" style="width: 200px; height: 100px; background: #0d6efd; display: flex; align-items: center; justify-content: center; color: white;">Коснись меня</div>`,
            js: `const touchArea = document.getElementById('touchArea');touchArea.addEventListener('touchstart', () => {touchArea.textContent = 'Коснулись!';touchArea.style.background = '#28a745';});touchArea.addEventListener('touchend', () => {setTimeout(() => {touchArea.textContent = 'Коснись меня';touchArea.style.background = '#0d6efd';}, 500);});`
        },
        // UX
        'ux-scrollbar': {
            title: 'Кастомный скроллбар',
            desc: 'Стилизованный скроллбар.',
            html: `<div class="custom-scrollbar" style="height: 150px; overflow-y: scroll; border: 1px solid #ccc; padding: 10px;"><p>Это длинный текст, чтобы появился скролл.</p><p>Это длинный текст, чтобы появился скролл.</p><p>Это длинный текст, чтобы появился скролл.</p><p>Это длинный текст, чтобы появился скролл.</p><p>Это длинный текст, чтобы появился скролл.</p><p>Это длинный текст, чтобы появился скролл.</p><p>Это длинный текст, чтобы появился скролл.</p><p>Это длинный текст, чтобы появился скролл.</p></div>`,
            css: `.custom-scrollbar::-webkit-scrollbar {width: 12px;}.custom-scrollbar::-webkit-scrollbar-track {background: #f1f1f1;border-radius: 10px;}.custom-scrollbar::-webkit-scrollbar-thumb {background: #888;border-radius: 10px;}.custom-scrollbar::-webkit-scrollbar-thumb:hover {background: #555;}`
        },
        'ux-checkbox': {
            title: 'Кастомный чекбокс',
            desc: 'Стилизованный чекбокс.',
            html: `<label class="custom-checkbox-container"><input type="checkbox"><span class="checkmark"></span>Отметь меня</label>`,
            css: `.custom-checkbox-container {display: block;position: relative;padding-left: 35px;margin-bottom: 12px;cursor: pointer;font-size: 16px;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}.custom-checkbox-container input {position: absolute;opacity: 0;cursor: pointer;height: 0;width: 0;}.checkmark {position: absolute;top: 0;left: 0;height: 20px;width: 20px;background-color: #eee;border-radius: 4px;}.checkmark:after {content: "";position: absolute;display: none;}.custom-checkbox-container input:checked ~ .checkmark {background-color: #0d6efd;}.custom-checkbox-container input:checked ~ .checkmark:after {display: block;}.custom-checkbox-container .checkmark:after {left: 7px;top: 3px;width: 5px;height: 10px;border: solid white;border-width: 0 3px 3px 0;-webkit-transform: rotate(45deg);-ms-transform: rotate(45deg);transform: rotate(45deg);}`
        },
        'ux-slider': {
            title: 'Кастомный слайдер',
            desc: 'Стилизованный слайдер.',
            html: `<input type="range" min="0" max="100" value="50" class="custom-slider" id="slider"/><span id="sliderValue">50</span>`,
            css: `.custom-slider {-webkit-appearance: none;width: 100%;height: 10px;border-radius: 5px;background: #d3d3d3;outline: none;}.custom-slider::-webkit-slider-thumb {-webkit-appearance: none;appearance: none;width: 20px;height: 20px;border-radius: 50%;background: #0d6efd;cursor: pointer;}.custom-slider::-moz-range-thumb {width: 20px;height: 20px;border-radius: 50%;background: #0d6efd;cursor: pointer;}`,
            js: `const slider = document.getElementById('slider');const output = document.getElementById('sliderValue');output.textContent = slider.value;slider.oninput = function() {output.textContent = this.value;};`
        },
        'ux-tabs': {
            title: 'Кастомные табы',
            desc: 'Переключение между вкладками.',
            html: `<div class="ux-tabs"><div class="ux-tab-btns"><button class="ux-tab-btn active" data-tab="tab1">Вкладка 1</button><button class="ux-tab-btn" data-tab="tab2">Вкладка 2</button><button class="ux-tab-btn" data-tab="tab3">Вкладка 3</button></div><div id="tab1" class="ux-tab-content active">Содержимое вкладки 1</div><div id="tab2" class="ux-tab-content">Содержимое вкладки 2</div><div id="tab3" class="ux-tab-content">Содержимое вкладки 3</div></div>`,
            css: `.ux-tabs {display: flex; flex-direction: column; align-items: flex-start; width: 100%;}.ux-tab-btns {display: flex; gap: 10px; margin-bottom: 10px;}.ux-tab-btn {padding: 8px 16px; background-color: #e9ecef; border: 1px solid #ccc; border-bottom: none; border-radius: 6px 6px 0 0; cursor: pointer; transition: background-color 0.2s;}.ux-tab-btn.active {background-color: var(--card-bg); border-bottom: 1px solid var(--card-bg); margin-bottom: -1px; z-index: 1;}.ux-tab-content {display: none; padding: 15px; border: 1px solid #ccc; border-radius: 0 6px 6px 6px; width: 100%; background-color: var(--card-bg);}.ux-tab-content.active {display: block;}`
        },
        // Виджеты
        'progress-bar': {
            title: 'Прогресс-бар',
            desc: 'Индикатор выполнения.',
            html: `<div class="progress-container"><div class="progress-bar" id="progressBar" style="width: 0%; height: 20px; background: #0d6efd;"></div></div><button id="fillProgress">Заполнить</button>`,
            css: `.progress-container {width: 100%;background: #e9ecef;border-radius: 10px;overflow: hidden;height: 20px;margin: 10px 0;}.progress-bar {height: 100%;background: #0d6efd;transition: width 0.3s;}`,
            js: `const fillBtn = document.getElementById('fillProgress');const bar = document.getElementById('progressBar');fillBtn.addEventListener('click', () => {bar.style.width = '100%';});`
        },
        'calendar': {
            title: 'Календарь',
            desc: 'Простой календарь.',
            html: `<div class="calendar"><h3 id="calendarMonth">Ноябрь 2025</h3><div class="calendar-grid" id="calendarGrid"></div></div>`,
            js: `function generateCalendar(year, month) {const date = new Date(year, month);const firstDay = new Date(year, month, 1).getDay();const daysInMonth = new Date(year, month + 1, 0).getDate();const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];document.getElementById('calendarMonth').textContent = monthNames[month] + ' ' + year;const grid = document.getElementById('calendarGrid');grid.innerHTML = '';const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];weekdays.forEach(day => {const dayEl = document.createElement('div');dayEl.className = 'calendar-day';dayEl.textContent = day;grid.appendChild(dayEl);});for (let i = 0; i < firstDay; i++) {const emptyCell = document.createElement('div');emptyCell.className = 'calendar-date';grid.appendChild(emptyCell);}const today = new Date();for (let i = 1; i <= daysInMonth; i++) {const dateEl = document.createElement('div');dateEl.className = 'calendar-date';dateEl.textContent = i;if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {dateEl.classList.add('today');}grid.appendChild(dateEl);}}generateCalendar(2025, 10);`
        },
        'slider': {
            title: 'Слайдер',
            desc: 'Интерактивный слайдер значений.',
            html: `<input type="range" min="0" max="100" value="50" class="custom-slider" id="jsSlider"/><span id="jsSliderValue">50</span>`,
            css: `.custom-slider {-webkit-appearance: none;width: 100%;height: 10px;border-radius: 5px;background: #d3d3d3;outline: none;}.custom-slider::-webkit-slider-thumb {-webkit-appearance: none;appearance: none;width: 20px;height: 20px;border-radius: 50%;background: #0d6efd;cursor: pointer;}.custom-slider::-moz-range-thumb {width: 20px;height: 20px;border-radius: 50%;background: #0d6efd;cursor: pointer;}`,
            js: `const slider = document.getElementById('jsSlider');const output = document.getElementById('jsSliderValue');output.textContent = slider.value;slider.oninput = function() {output.textContent = this.value;};`
        },
        // Медиа (добавлено для полноты, если 'img-responsive' остался где-то в HTML)
        'img-responsive': {
            title: 'Адаптивное изображение',
            desc: 'Изображение, которое подстраивается под размер экрана.',
            html: '<img src="https://placehold.co/600x400" alt="Пример" class="responsive-img" />',
            css: `.responsive-img {max-width: 100%;height: auto;}`
        }
    };

    // --- Переключение вкладок (CSS/JS) в каждом разделе ---
    document.querySelectorAll('.section-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            const sectionId = btn.closest('section').id;
            const nav = btn.closest('.section-nav');
            const detailBoxId = `${sectionId}-detail`;
            const detailBox = document.getElementById(detailBoxId);

            // Убираем активные классы
            nav.querySelectorAll('.section-btn').forEach(b => b.classList.remove('active'));
            const examplesId = `${sectionId}-${section}-examples`;
            document.querySelectorAll('.examples').forEach(ex => ex.classList.remove('active'));
            document.getElementById(examplesId).classList.add('active');

            // Добавляем активный класс кнопке
            btn.classList.add('active');

            // Сбрасываем detail box
            if (detailBox) {
                detailBox.style.display = 'none';
            }
        });
    });

    // --- Обработка кликов по КНОПКАМ внутри примеров ---
    // ВАЖНО: вешаем на кнопку, а не на .example-card
    document.querySelectorAll('.example-card button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Останавливаем всплытие, чтобы клик на кнопке не "срабатывал" как клик на .example-card, если он тоже где-то висит
            e.stopPropagation();

            // Находим родительский .example-card для этой кнопки
            const exampleCard = this.closest('.example-card');
            if (!exampleCard) {
                console.error('Кнопка не находится внутри .example-card');
                return;
            }

            // Получаем ID примера из data-example у .example-card
            const exampleId = exampleCard.dataset.example;
            if (!exampleId) {
                console.error('У .example-card не найден атрибут data-example');
                return;
            }

            // Ищем данные примера
            const ex = examplesData[exampleId];

            if (!ex) {
                console.error(`Пример с ID "${exampleId}" не найден в examplesData.`);
                return; // Не ломаем скрипт, просто выводим ошибку
            }

            // Находим соответствующий detail-box для текущей секции
            const sectionId = exampleCard.closest('section').id;
            const detailBoxId = `${sectionId}-detail`;
            const detailBox = document.getElementById(detailBoxId);

            if (!detailBox) {
                console.error(`detailBox с ID "${detailBoxId}" не найден.`);
                return;
            }

            // Подготавливаем код для отображения
            let codeHtml = ex.html;
            let codeCss = ex.css || '';
            let codeJs = ex.js || '';

            const escapedHtml = escapeHtml(codeHtml);
            const escapedCss = escapeHtml(codeCss);
            const escapedJs = escapeHtml(codeJs);

            // Вставляем содержимое в detail-box
            detailBox.innerHTML = `<h2>${ex.title}</h2><p>${ex.desc}</p><div class="preview-area">${codeHtml}</div><div class="code-block"></div>`;
            detailBox.style.display = 'block'; // Показываем detail box

            // Находим блок кода и вставляем код как текст
            const codeBlock = detailBox.querySelector('.code-block');
            if (codeBlock) {
                let fullCode = escapedHtml + '<style>' + escapedCss + '</style>';
                if (codeJs) {
                    fullCode += '<script>' + escapedJs + '</script>';
                }
                codeBlock.textContent = fullCode;

                // Убираем старые слушатели с кнопок в preview, чтобы избежать дублирования
                removeEventListeners();

                // Выполняем JS для демонстрации (только если он есть)
                if (ex.js) {
                    try {
                        eval(ex.js);
                    } catch (error) {
                        console.error("Ошибка выполнения JS примера:", error);
                    }
                }
            }
        });
    });

    // --- Удаляем все event listeners из preview-кнопок ---
    function removeEventListeners() {
        const previewBtns = document.querySelectorAll('.preview-area button');
        previewBtns.forEach(btn => {
            // Создаём клон кнопки без событий
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
        });
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }

    // --- Плавная прокрутка по якорям ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Инициализация: показываем первый пример в каждом разделе ---
    document.querySelectorAll('.section-btn.active').forEach(btn => {
        const section = btn.dataset.section;
        const sectionId = btn.closest('section').id;
        const examplesId = `${sectionId}-${section}-examples`;
        const examplesEl = document.getElementById(examplesId);
        if (examplesEl) {
            const firstExampleCard = examplesEl.querySelector('.example-card');
            if (firstExampleCard) {
                const firstExampleBtn = firstExampleCard.querySelector('button');
                if (firstExampleBtn) {
                    // Симулируем клик по кнопке первого примера
                    firstExampleBtn.click();
                }
            }
        }
    });

    // --- Тема ---
    const themeBtn = document.getElementById('theme-btn');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        themeBtn.textContent = currentTheme === 'dark' ? '☀️ 1Светлая тема' : '🌙 Тёмная тема';
    }

    themeBtn.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeBtn.textContent = newTheme === 'dark' ? '☀️ 1Светлая тема' : '🌙 Тёмная тема';
    });
});
