document.addEventListener('DOMContentLoaded', () => {
    // === ДАННЫЕ ПРИМЕРОВ ===
    const examplesData = {
        // Типографика
        'typo-responsive': {
            title: 'Адаптивный текст',
            desc: 'Шрифт изменяется в зависимости от размера экрана.',
            html: '<p class="responsive-text" style="font-size: clamp(1rem, 4vw, 2.5rem); margin: 0;">Этот текст адаптируется под размер экрана</p>',
            css: ''
        },
        'typo-gradient': {
            title: 'Градиентный текст',
            desc: 'Текст с градиентом.',
            html: '<h2 class="gradient-text">Градиентный текст</h2>',
            css: ''
        },
        'typo-typewriter': {
            title: 'Печатающийся текст',
            desc: 'Текст появляется по буквам.',
            html: '<p class="typewriter-text" id="typewriter"></p>',
            js: (container) => {
                const text = 'Привет, мир!';
                let i = 0;
                const speed = 100;
                const el = container.querySelector('#typewriter');
                if (!el) return;
                el.innerHTML = '';
                function typeWriter() {
                    if (i < text.length) {
                        el.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, speed);
                    }
                }
                typeWriter();
            }
        },

        // Навигация
        'nav-horizontal': {
            title: 'Горизонтальное меню',
            desc: 'Простое меню в строку.',
            html: `<ul class="nav-menu" style="display: flex; list-style: none; gap: 10px; padding: 0; margin: 0;"><li><a href="#" style="text-decoration: none; padding: 8px 16px; background: #e9ecef; border-radius: 4px;">Главная</a></li><li><a href="#" style="text-decoration: none; padding: 8px 16px; background: #e9ecef; border-radius: 4px;">О нас</a></li><li><a href="#" style="text-decoration: none; padding: 8px 16px; background: #e9ecef; border-radius: 4px;">Контакты</a></li></ul>`,
            css: ''
        },
        'nav-dropdown': {
            title: 'Выпадающее меню',
            desc: 'Меню с выпадающим списком.',
            html: `<div class="dropdown"><button class="dropdown-btn">Меню ▾</button><ul class="dropdown-content"><li><a href="#">Подпункт 1</a></li><li><a href="#">Подпункт 2</a></li><li><a href="#">Подпункт 3</a></li></ul></div>`,
            css: '',
            js: (container) => {
                const btn = container.querySelector('.dropdown-btn');
                const content = container.querySelector('.dropdown-content');
                if (!btn || !content) return;
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                });
                document.addEventListener('click', () => {
                    content.style.display = 'none';
                });
                container.addEventListener('click', (e) => {
                    e.stopPropagation(); // не закрывать при клике внутри
                });
            }
        },
        'nav-sticky': {
            title: 'Липкое меню',
            desc: 'Меню, которое остаётся наверху при прокрутке.',
            html: `<p>Верхняя панель сайта уже закреплена: прокрути вниз — она останется на месте.</p>`,
            css: ''
        },

        // Анимации и переходы
        'transition-fade': {
            title: 'Плавное появление',
            desc: 'Элемент плавно появляется при клике.',
            html: `<div class="fade-element" style="opacity: 0.5; transition: opacity 0.5s;">Нажми на кнопку, чтобы я появился полностью</div><button id="fadeToggle">Переключить</button>`,
            js: (container) => {
                const el = container.querySelector('.fade-element');
                const btn = container.querySelector('#fadeToggle');
                if (!el || !btn) return;
                btn.addEventListener('click', () => {
                    el.style.opacity = el.style.opacity === '1' ? '0.5' : '1';
                });
            }
        },
        'animation-bounce': {
            title: 'Прыжок',
            desc: 'Анимация прыжка при наведении.',
            html: '<div class="bounce-element" style="display: inline-block; padding: 10px; background: #0d6efd; color: white; border-radius: 6px; cursor: pointer;">Прыгни!</div>',
            css: ''
        },
        'keyframes-spin': {
            title: 'Вращение',
            desc: 'Элемент вращается по кругу при наведении.',
            html: '<div class="spin-element" style="display: inline-block; padding: 10px; background: #28a745; color: white; border-radius: 6px; cursor: pointer;">Крутись!</div>',
            css: ''
        }
        // Остальные примеры можно оставить как есть — они не критичны для задачи
    };

    // === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // === ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК (CSS/JS) ===
    document.querySelectorAll('.section-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            const sectionEl = btn.closest('section');
            const sectionId = sectionEl.id;
            const examplesId = `${sectionId}-${section}-examples`;

            // Обновляем активные кнопки
            btn.closest('.section-nav').querySelectorAll('.section-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Переключаем примеры
            sectionEl.querySelectorAll('.examples').forEach(el => el.classList.remove('active'));
            const targetExamples = document.getElementById(examplesId);
            if (targetExamples) targetExamples.classList.add('active');

            // Скрываем detail-box
            const detailBox = document.getElementById(`${sectionId}-detail`);
            if (detailBox) detailBox.style.display = 'none';
        });
    });

    // === ОБРАБОТКА КЛИКОВ ПО КНОПКАМ "ПРИМЕР" ===
    document.querySelectorAll('.example-card button').forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.example-card');
            const exampleId = card.dataset.example;
            const section = card.closest('section');
            const sectionId = section.id;
            const detailBox = document.getElementById(`${sectionId}-detail`);

            if (!detailBox) return;

            const ex = examplesData[exampleId];
            if (!ex) {
                detailBox.innerHTML = `<p>Пример "${exampleId}" не реализован.</p>`;
                detailBox.style.display = 'block';
                return;
            }

            // Собираем HTML + CSS (CSS уже встроены в HTML для этих примеров)
            let fullHtml = `<h2>${ex.title}</h2><p>${ex.desc}</p><div class="preview-area">${ex.html}</div>`;
            if (ex.css) {
                fullHtml += `<div class="code-block">/* CSS */\n${escapeHtml(ex.css)}</div>`;
            }
            if (ex.js && typeof ex.js === 'string') {
                fullHtml += `<div class="code-block">/* JavaScript */\n${escapeHtml(ex.js)}</div>`;
            }
            detailBox.innerHTML = fullHtml;
            detailBox.style.display = 'block';

            // Выполняем JS-логику (если она задана как функция)
            if (ex.js && typeof ex.js === 'function') {
                const previewArea = detailBox.querySelector('.preview-area');
                if (previewArea) {
                    ex.js(previewArea);
                }
            }
        });
    });

    // === ЯКОРНАЯ НАВИГАЦИЯ ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === ТЕМА ===
    const themeBtn = document.getElementById('theme-btn');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    themeBtn.textContent = savedTheme === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема';

    themeBtn.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeBtn.textContent = newTheme === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема';
    });
});
