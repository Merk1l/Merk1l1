document.addEventListener('DOMContentLoaded', () => {
    // Примеры и их содержимое
    const examples = {
        // Типографика
        'typo-responsive': {
            title: 'Адаптивный текст',
            desc: 'Размер шрифта автоматически подстраивается под ширину экрана.',
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
            desc: 'Текст появляется по одной букве с задержкой.',
            html: '<p id="typewriter-text"></p>',
            js: `
                const text = 'Привет, это печатающийся текст!';
                const element = document.getElementById('typewriter-text');
                let i = 0;
                function typeWriter() {
                    if (i < text.length) {
                        element.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    }
                }
                typeWriter();
            `
        },
        // Кнопки
        'css-basic': {
            title: 'Базовая CSS-кнопка',
            desc: 'Простая кнопка с hover-эффектом.',
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
            desc: 'Кнопка увеличивается и поворачивается при наведении.',
            html: '<button class="btn-hover">Нажми</button>',
            css: `.btn-hover {padding: 12px 24px;background: #28a745;color: white;border: none;border-radius: 8px;cursor: pointer;font-weight: 600;transition: all 0.3s;}.btn-hover:hover {background: #218838;transform: scale(1.05) rotate(2deg);}`
        },
        'js-alert': {
            title: 'alert()',
            desc: 'Простое всплывающее окно.',
            html: '<button class="btn-basic" id="alertBtn">Показать alert</button>', // Используем btn-basic
            js: `document.getElementById('alertBtn').addEventListener('click', () => {alert('Привет из JavaScript!');});`
        },
        'js-toggle': {
            title: 'Toggle (переключение стиля)',
            desc: 'При каждом клике кнопка переключает дополнительный CSS-класс, меняя внешний вид.',
            html: '<button class="btn-js-toggle" id="toggleBtn">Переключить</button>',
            js: `document.getElementById('toggleBtn').addEventListener('click', () => {document.getElementById('toggleBtn').classList.toggle('highlight');});`
        },
        'js-counter': {
            title: 'Счётчик кликов',
            desc: 'Кнопка отслеживает количество нажатий и обновляет свой текст.',
            html: '<button class="btn-js-counter" id="counterBtn">Кликни! (0)</button>',
            js: `
                let count = 0;
                const btn = document.getElementById('counterBtn');
                btn.addEventListener('click', () => {
                    count++;
                    btn.textContent = \`Кликни! (\${count})\`;
                });
            `
        },
        // Формы
        'form-basic': {
            title: 'Простая форма',
            desc: 'Базовая HTML-форма.',
            html: `
                <form class="basic-form">
                    <label>Имя:</label>
                    <input type="text"> <!-- Убран required -->
                    <label>Email:</label>
                    <input type="email"> <!-- Убран required -->
                    <button type="submit">Отправить</button>
                </form>
            `,
            css: `.basic-form {max-width: 400px; margin: 0 auto; padding: 20px;}.basic-form input, .basic-form button {width: 100%; padding: 10px; margin-bottom: 10px; border-radius: 4px; border: 1px solid #ccc;}`
        },
        'form-styled': {
            title: 'Стилизованная форма',
            desc: 'Форма с цветами, таблицей и оформлением.',
            html: `
                <form class="styled-form">
                    <table>
                        <tr><td><label>Имя:</label></td><td><input type="text" required></td></tr>
                        <tr><td><label>Email:</label></td><td><input type="email" required></td></tr>
                        <tr><td><label>Пол:</label></td><td><select><option>Мужской</option><option>Женский</option></select></td></tr>
                        <tr><td colspan="2"><button type="submit">Отправить</button></td></tr>
                    </table>
                </form>
            `
        },
        'form-validation': {
            title: 'Валидация формы',
            desc: 'Проверка обязательных полей и предотвращение отправки.',
            html: `
                <form id="validationForm" class="basic-form">
                    <label>Имя:</label>
                    <input type="text" name="name" required>
                    <label>Email:</label>
                    <input type="email" name="email" required>
                    <button type="submit">Отправить</button>
                    <p id="formMessage"></p>
                </form>
            `,
            js: `
                document.getElementById('validationForm').addEventListener('submit', function(e) {
                    e.preventDefault();
                    const messageEl = document.getElementById('formMessage');
                    messageEl.textContent = 'Форма отправлена!';
                    messageEl.style.color = 'green';
                });
            `
        },
        'form-dynamic': {
            title: 'Динамическое поле',
            desc: 'Добавление новых полей ввода.',
            html: `
                <div>
                    <button id="addFieldBtn">Добавить поле</button>
                    <div id="fieldsContainer"></div>
                </div>
            `,
            js: `
                let fieldCount = 0;
                document.getElementById('addFieldBtn').addEventListener('click', () => {
                    fieldCount++;
                    const container = document.getElementById('fieldsContainer');
                    const newField = document.createElement('input');
                    newField.type = 'text';
                    newField.placeholder = 'Поле ' + fieldCount;
                    newField.style.display = 'block';
                    newField.style.margin = '5px 0';
                    container.appendChild(newField);
                });
            `
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
            desc: 'Меню с выпадающим списком по клику.',
            html: `
                <div class="dropdown">
                    <button class="dropdown-btn">Меню</button>
                    <ul class="dropdown-content">
                        <li><a href="#">Подпункт 1</a></li>
                        <li><a href="#">Подпункт 2</a></li>
                        <li><a href="#">Подпункт 3</a></li>
                    </ul>
                </div>
            `,
            js: `
                const dropdownBtn = document.querySelector('.dropdown-btn');
                const dropdownContent = document.querySelector('.dropdown-content');
                dropdownBtn.addEventListener('click', () => {
                    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
                });
                // Закрытие меню при клике вне его
                window.addEventListener('click', (e) => {
                    if (!e.target.matches('.dropdown-btn')) {
                        const openDropdown = document.querySelector('.dropdown-content');
                        if (openDropdown.style.display === 'block') {
                            openDropdown.style.display = 'none';
                        }
                    }
                });
            `
        },
        'nav-sticky': {
            title: 'Липкое меню',
            desc: 'Меню, которое остаётся наверху при прокрутке.',
            html: `<nav class="sticky-nav"><a href="#">Главная</a><a href="#">О нас</a><a href="#">Контакты</a></nav>`,
            css: `.sticky-nav {position: sticky;top: 0;background: #343a40;padding: 10px;display: flex;gap: 20px;}.sticky-nav a {color: white;text-decoration: none;}`
        },
        'nav-mobile': {
            title: 'Мобильное меню',
            desc: 'Простое мобильное меню.',
            html: `
                <div class="mobile-menu">
                    <button class="menu-toggle">☰</button>
                    <ul class="mobile-nav">
                        <li><a href="#">Главная</a></li>
                        <li><a href="#">О нас</a></li>
                        <li><a href="#">Контакты</a></li>
                    </ul>
                </div>
            `,
            css: `.mobile-menu {position: relative;}.mobile-nav {display: none;list-style: none;position: absolute;top: 100%;left: 0;background: var(--card-bg);padding: 10px;box-shadow: 0 2px 5px var(--shadow);}.mobile-nav.show {display: block;}.menu-toggle {background: none;border: none;font-size: 1.5rem;cursor: pointer;}`
        },
        'nav-active': {
            title: 'Активный пункт',
            desc: 'Выделение активного пункта меню.',
            html: `
                <ul class="active-nav">
                    <li><a href="#" class="active">Главная</a></li>
                    <li><a href="#">О нас</a></li>
                    <li><a href="#">Контакты</a></li>
                </ul>
            `,
            css: `.active-nav {display: flex;gap: 20px;list-style: none;}.active-nav a {text-decoration: none;padding: 8px 16px;border-radius: 4px;}.active-nav a.active {background: #3498db;color: white;}`,
            js: `
                document.querySelectorAll('.active-nav a').forEach(anchor => {
                    anchor.addEventListener('click', function (e) {
                        e.preventDefault();
                        document.querySelectorAll('.active-nav a').forEach(a => a.classList.remove('active'));
                        this.classList.add('active');
                    });
                });
            `
        },
        // Медиа
        'img-responsive': {
            title: 'Адаптивное изображение',
            desc: 'Изображение, которое подстраивается под размер экрана.',
            html: '<img src="https://placehold.co/600x400" alt="Пример" class="responsive-img" />',
            css: `.responsive-img {max-width: 100%;height: auto;}`
        },
        'img-rounded': {
            title: 'Круглое изображение',
            desc: 'Круглое изображение с border-radius.',
            html: '<img src="https://placehold.co/200x200/ff0000/ffffff?text=:)" alt="Круг" class="rounded-img" />',
            css: `.rounded-img {width: 100px;height: 100px;border-radius: 50%;object-fit: cover;overflow: hidden; display: block; margin: 0 auto;}`
        },
        'video-embed': {
            title: 'Видео',
            desc: 'Встраиваемое видео.',
            html: '<video controls class="video-responsive"><source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">Ваш браузер не поддерживает видео.</video>',
            css: `.video-responsive {width: 100%;height: 300px;border-radius: 8px;border: 1px solid var(--border);}`
        },
        'img-slider': {
            title: 'Слайдер изображений',
            desc: 'Переключение между изображениями.',
            html: `
                <div class="img-slider">
                    <img id="slideImage" src="https://placehold.co/400x300/ff0000/ffffff?text=1" alt="Slide">
                    <div>
                        <button id="prevSlide">← Назад</button>
                        <button id="nextSlide">Вперёд →</button>
                    </div>
                </div>
            `,
            js: `
                const images = [
                    'https://placehold.co/400x300/ff0000/ffffff?text=1',
                    'https://placehold.co/400x300/00ff00/000000?text=2',
                    'https://placehold.co/400x300/0000ff/ffffff?text=3'
                ];
                let currentImageIndex = 0;
                const imgElement = document.getElementById('slideImage');
                const prevBtn = document.getElementById('prevSlide');
                const nextBtn = document.getElementById('nextSlide');

                function updateImage() {
                    imgElement.src = images[currentImageIndex];
                }

                prevBtn.addEventListener('click', () => {
                    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                    updateImage();
                });

                nextBtn.addEventListener('click', () => {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    updateImage();
                });
            `
        },
        'video-controls': {
            title: 'Управление видео',
            desc: 'Кастомное управление воспроизведением.',
            html: `
                <div>
                    <video id="customVideo" width="400" controls style="display: none;">
                        <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
                    </video>
                    <button id="playPauseBtn">▶️ Воспроизвести</button>
                </div>
            `,
            js: `
                const video = document.getElementById('customVideo');
                const playPauseBtn = document.getElementById('playPauseBtn');
                video.style.display = 'block';

                playPauseBtn.addEventListener('click', () => {
                    if (video.paused) {
                        video.play();
                        playPauseBtn.textContent = '⏸️ Пауза';
                    } else {
                        video.pause();
                        playPauseBtn.textContent = '▶️ Воспроизвести';
                    }
                });
            `
        },
        // Карточки
        'card-basic': {
            title: 'Базовая карточка',
            desc: 'Простая карточка с изображением и текстом.',
            html: `
                <div class="card">
                    <h3>Заголовок</h3>
                    <p>Описание карточки.</p>
                </div>
            `,
            css: `.card {background: #f8f9fa;padding: 15px;border-radius: 8px;box-shadow: 0 2px 4px rgba(0,0,0,0.1);}`
        },
        'card-hover': {
            title: 'Карточка с hover',
            desc: 'Карточка с эффектом при наведении.',
            html: `
                <div class="card-hover">
                    <h3>Заголовок</h3>
                    <p>Описание карточки.</p>
                </div>
            `,
            css: `.card-hover {background: #f8f9fa;padding: 15px;border-radius: 8px;box-shadow: 0 2px 4px rgba(0,0,0,0.1);transition: transform 0.3s ease, box-shadow 0.3s ease;}.card-hover:hover {transform: translateY(-5px);box-shadow: 0 4px 8px rgba(0,0,0,0.2);}`
        },
        'card-toggle': {
            title: 'Переключение карточек',
            desc: 'Показ/скрытие карточки по кнопке.',
            html: `
                <button id="toggleCardBtn">Показать/Скрыть</button>
                <div id="toggleableCard" class="card" style="display: none; margin-top: 10px;">
                    <h3>Скрытая карточка</h3>
                    <p>Эта карточка переключается.</p>
                </div>
            `,
            js: `
                document.getElementById('toggleCardBtn').addEventListener('click', () => {
                    const card = document.getElementById('toggleableCard');
                    card.style.display = card.style.display === 'none' ? 'block' : 'none';
                });
            `
        },
        // Анимации
        'transition-fade': {
            title: 'Плавное появление',
            desc: 'Элемент плавно появляется при наведении.',
            html: '<div class="fade-element">Наведи сюда</div>',
            css: `.fade-element {opacity: 0;transition: opacity 0.5s ease-in-out; padding: 10px; background: #0d6efd; color: white; border-radius: 6px; cursor: pointer;}.fade-element.show {opacity: 1;}`
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
            desc: 'Плавное перемещение элемента с использованием requestAnimationFrame.',
            html: '<div id="tweenBox" style="width: 50px; height: 50px; background: #6f42c1; position: relative; left: 0;"></div>',
            js: `
                const box = document.getElementById('tweenBox');
                let start = 0;
                const end = 300; // px
                let current = start;
                const duration = 1000; // ms
                let startTime = null;

                function animate(time) {
                    if (!startTime) startTime = time;
                    const elapsed = time - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Линейная интерполяция
                    current = start + (end - start) * progress;
                    box.style.left = current + 'px';

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                }
                requestAnimationFrame(animate);
            `
        },
        // Модальные окна
        'modal-basic': {
            title: 'Простая модалка',
            desc: 'Модальное окно с CSS-анимацией.',
            html: `
                <button class="modal-open-btn">Открыть</button>
                <div class="modal-overlay" id="basicModal">
                    <div class="modal-content">
                        <h3>Модальное окно</h3>
                        <p>Содержимое модалки</p>
                        <button class="modal-close-btn">Закрыть</button>
                    </div>
                </div>
            `,
            css: `.modal-overlay {display: none;position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.5);z-index: 1000;}.modal-content {position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);background-color: var(--card-bg);padding: 20px;border-radius: 8px;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);width: 80%;max-width: 500px;text-align: center;}.modal-close-btn {margin-top: 15px;padding: 8px 16px;background-color: #dc3545;color: white;border: none;border-radius: 4px;cursor: pointer;}`,
            js: `
                const openBtn = document.querySelector('.modal-open-btn');
                const modal = document.getElementById('basicModal');
                const closeBtn = document.querySelector('.modal-close-btn');

                openBtn.addEventListener('click', () => { modal.style.display = 'block'; });
                closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
                window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
            `
        },
        'modal-js': {
            title: 'JS-модалка',
            desc: 'Модальное окно, показываемое через JavaScript.',
            html: `
                <button id="jsModalBtn">Открыть JS-модалку</button>
                <div class="modal-overlay" id="jsModal">
                    <div class="modal-content">
                        <h3>JS Модалка</h3>
                        <p>Это окно открыто через JavaScript.</p>
                        <button id="jsModalCloseBtn">Закрыть</button>
                    </div>
                </div>
            `,
            css: `.modal-overlay {display: none;position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.5);z-index: 1000;}.modal-content {position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);background-color: var(--card-bg);padding: 20px;border-radius: 8px;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);width: 80%;max-width: 500px;text-align: center;}.modal-close-btn {margin-top: 15px;padding: 8px 16px;background-color: #dc3545;color: white;border: none;border-radius: 4px;cursor: pointer;}`,
            js: `
                const jsOpenBtn = document.getElementById('jsModalBtn');
                const jsModal = document.getElementById('jsModal');
                const jsCloseBtn = document.getElementById('jsModalCloseBtn');

                jsOpenBtn.addEventListener('click', () => { jsModal.style.display = 'block'; });
                jsCloseBtn.addEventListener('click', () => { jsModal.style.display = 'none'; });
                window.addEventListener('click', (e) => { if (e.target === jsModal) jsModal.style.display = 'none'; });
            `
        },
        'tooltip-js': {
            title: 'JS-подсказка',
            desc: 'Показывает подсказку при клике.',
            html: '<button id="tooltipBtn">Показать подсказку</button><div id="tooltip" style="display: none; position: absolute; background: black; color: white; padding: 5px; border-radius: 4px; margin-top: 5px;">Это подсказка!</div>',
            js: `
                const btn = document.getElementById('tooltipBtn');
                const tooltip = document.getElementById('tooltip');

                btn.addEventListener('click', (e) => {
                    tooltip.style.display = tooltip.style.display === 'none' ? 'block' : 'none';
                    tooltip.style.left = e.pageX + 'px';
                    tooltip.style.top = (e.pageY + 10) + 'px';
                });
            `
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
            js: `
                function updateWidth() {document.getElementById('widthDisplay').textContent = window.innerWidth;}
                updateWidth();
                window.addEventListener('resize', updateWidth);
            `
        },
        'touch-events': {
            title: 'События касания',
            desc: 'Отслеживание touch-событий на мобильных устройствах.',
            html: `<div id="touchArea" style="padding: 20px; background: #e9ecef; text-align: center; border: 1px solid #ccc;">Коснитесь здесь</div>`,
            js: `
                const touchArea = document.getElementById('touchArea');
                touchArea.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    touchArea.textContent = 'Коснулись!';
                    setTimeout(() => { touchArea.textContent = 'Коснитесь здесь'; }, 1000);
                });
            `
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
        'ux-tabs': {
            title: 'Кастомные табы',
            desc: 'Переключение между вкладками.',
            html: `
                <div class="ux-tabs">
                    <div class="ux-tab-btns">
                        <button class="ux-tab-btn active" data-tab="tab1">Вкладка 1</button>
                        <button class="ux-tab-btn" data-tab="tab2">Вкладка 2</button>
                        <button class="ux-tab-btn" data-tab="tab3">Вкладка 3</button>
                    </div>
                    <div id="tab1" class="ux-tab-content active">Содержимое вкладки 1</div>
                    <div id="tab2" class="ux-tab-content">Содержимое вкладки 2</div>
                    <div id="tab3" class="ux-tab-content">Содержимое вкладки 3</div>
                </div>
            `,
            js: `
                document.querySelectorAll('.ux-tab-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        document.querySelectorAll('.ux-tab-btn').forEach(b => b.classList.remove('active'));
                        document.querySelectorAll('.ux-tab-content').forEach(c => c.classList.remove('active'));
                        btn.classList.add('active');
                        const tabId = btn.getAttribute('data-tab');
                        document.getElementById(tabId).classList.add('active');
                    });
                });
            `
        },
        'ux-slider': {
            title: 'Кастомный слайдер',
            desc: 'Интерактивный слайдер значений.',
            html: `<input type="range" min="0" max="100" value="50" class="custom-slider" id="uxSlider"/><span id="uxSliderValue">50</span>`,
            css: `.custom-slider {-webkit-appearance: none;width: 100%;height: 10px;border-radius: 5px;background: #d3d3d3;outline: none;}.custom-slider::-webkit-slider-thumb {-webkit-appearance: none;appearance: none;width: 20px;height: 20px;border-radius: 50%;background: #0d6efd;cursor: pointer;}.custom-slider::-moz-range-thumb {width: 20px;height: 20px;border-radius: 50%;background: #0d6efd;cursor: pointer;}`,
            js: `
                const slider = document.getElementById('uxSlider');
                const output = document.getElementById('uxSliderValue');
                output.textContent = slider.value;
                slider.oninput = function() {output.textContent = this.value;};
            `
        },
        // Виджеты
        'progress-bar': {
            title: 'Прогресс-бар',
            desc: 'Индикатор выполнения.',
            html: `<div class="progress-container"><div class="progress-bar" id="progressBar" style="width: 0%; height: 20px; background: #0d6efd;"></div></div><button id="fillProgress">Заполнить</button>`,
            css: `.progress-container {width: 100%;background: #e9ecef;border-radius: 10px;overflow: hidden;height: 20px;margin: 10px 0;}.progress-bar {height: 100%;background: #0d6efd;transition: width 0.3s;}`,
            js: `
                const fillBtn = document.getElementById('fillProgress');
                const bar = document.getElementById('progressBar');
                fillBtn.addEventListener('click', () => {
                    bar.style.width = '100%';
                });
            `
        },
        'calendar': {
            title: 'Календарь',
            desc: 'Простой календарь.',
            html: `<div class="calendar"><h3 id="calendarMonth">Ноябрь 2025</h3><div class="calendar-grid" id="calendarGrid"></div></div>`,
            js: `
                function generateCalendar(year, month) {
                    const date = new Date(year, month);
                    const firstDay = new Date(year, month, 1).getDay();
                    const daysInMonth = new Date(year, month + 1, 0).getDate();

                    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
                    document.getElementById('calendarMonth').textContent = monthNames[month] + ' ' + year;

                    const grid = document.getElementById('calendarGrid');
                    grid.innerHTML = ''; // Очищаем сетку

                    // Дни недели
                    const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
                    weekdays.forEach(day => {
                        const dayEl = document.createElement('div');
                        dayEl.className = 'calendar-day';
                        dayEl.textContent = day;
                        grid.appendChild(dayEl);
                    });

                    // Пустые ячейки до первого дня
                    for (let i = 0; i < firstDay; i++) {
                        const emptyCell = document.createElement('div');
                        emptyCell.className = 'calendar-date';
                        grid.appendChild(emptyCell);
                    }

                    // Дни месяца
                    const today = new Date();
                    for (let i = 1; i <= daysInMonth; i++) {
                        const dateEl = document.createElement('div');
                        dateEl.className = 'calendar-date';
                        dateEl.textContent = i;
                        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
                            dateEl.classList.add('today');
                        }
                        grid.appendChild(dateEl);
                    }
                }

                generateCalendar(2025, 10); // Ноябрь 2025
            `
        },
        'slider': {
            title: 'Слайдер',
            desc: 'Интерактивный слайдер значений.',
            html: `<input type="range" min="0" max="100" value="50" class="custom-slider" id="jsSlider"/><span id="jsSliderValue">50</span>`,
            css: `.custom-slider {-webkit-appearance: none;width: 100%;height: 10px;border-radius: 5px;background: #d3d3d3;outline: none;}.custom-slider::-webkit-slider-thumb {-webkit-appearance: none;appearance: none;width: 20px;height: 20px;border-radius: 50%;background: #0d6efd;cursor: pointer;}.custom-slider::-moz-range-thumb {width: 20px;height: 20px;border-radius: 50%;background: #0d6efd;cursor: pointer;}`,
            js: `
                const slider = document.getElementById('jsSlider');
                const output = document.getElementById('jsSliderValue');
                output.textContent = slider.value;
                slider.oninput = function() {output.textContent = this.value;};
            `
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
            const examplesId = `${sectionId}-${section}-examples`;
            document.querySelectorAll('.examples').forEach(ex => ex.classList.remove('active'));
            document.getElementById(examplesId).classList.add('active');

            // Добавляем активный класс кнопке
            btn.classList.add('active');

            // Сбрасываем detail box
            detailBox.style.display = 'none';
        });
    });

    // Обработчик клика по примерам
    document.querySelectorAll('.example-card button').forEach(button => {
        button.addEventListener('click', function() {
            const exampleId = this.closest('.example-card').dataset.example;
            const ex = examples[exampleId];
            if (!ex) return;

            const sectionId = this.closest('section').id;
            const detailBoxId = `${sectionId}-detail`;
            const detailBox = document.getElementById(detailBoxId);

            let codeHtml = ex.html;
            let codeCss = ex.css || '';
            let codeJs = ex.js || '';

            // Экранируем HTML/JS для безопасного отображения
            const escapedHtml = escapeHtml(codeHtml);
            const escapedCss = escapeHtml(codeCss);
            const escapedJs = escapeHtml(codeJs);

            // Выводим описание и превью
            detailBox.innerHTML = `<h2>${ex.title}</h2><p>${ex.desc}</p><div class="preview-area">${codeHtml}</div><div class="code-block"></div>`;
            detailBox.style.display = 'block'; // Показываем detail box

            // Находим блок кода и безопасно вставляем содержимое
            const codeBlock = detailBox.querySelector('.code-block');
            let fullCode = escapedHtml + '<style>' + escapedCss + '</style>';
            if (codeJs) {
                fullCode += '<script>' + escapedJs + '</script>';
            }
            codeBlock.textContent = fullCode; // <-- используем textContent, чтобы код отображался как текст

            // Убираем старые слушатели (если есть)
            removeEventListeners();

            // Добавляем функциональность только для JS-примеров (в preview)
            if (ex.js) {
                try {
                    eval(ex.js);
                } catch (e) {
                    console.error("Ошибка выполнения JS примера:", e);
                }
            }
        });
    });

    // Удаляем все event listeners из preview-кнопок
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

    // Инициализация: показываем первый пример в каждом разделе
    document.querySelectorAll('.section-btn.active').forEach(btn => {
        const section = btn.dataset.section;
        const sectionId = btn.closest('section').id;
        const examplesId = `${sectionId}-${section}-examples`;
        const firstExampleBtn = document.querySelector(`#${examplesId} .example-card button`);
        if (firstExampleBtn) {
            firstExampleBtn.click();
        }
    });

    // --- Тема ---
    const themeBtn = document.getElementById('theme-btn');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        themeBtn.textContent = currentTheme === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема';
    }

    themeBtn.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeBtn.textContent = newTheme === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема';
    });
});
