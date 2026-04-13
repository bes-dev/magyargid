import BaseView from './base-view.js';
import EventBus from '../utils/event-bus.js';
import Store from '../store.js';

/**
 * MainView - представление главной страницы
 */
class MainView extends BaseView {
    constructor() {
        super('main-container');
        this.eventBus = EventBus.getInstance();
        this.store = Store.getInstance();
        this.tabContents = {
            'algorithm': `
                <div class="tab-content">
                    <h3>🇭🇺 Magyar Gid</h3>
                    <p>Пошаговый процесс определения правильного суффикса в венгерском языке:</p>
                    <ul>
                        <li><strong>Шаг 1:</strong> Выбор части речи (глагол, существительное, прилагательное)</li>
                        <li><strong>Шаг 2:</strong> Что нужно сделать (спряжение, падеж, мн. число...)</li>
                        <li><strong>Шаг 3:</strong> Уточнение типа слова (гармония гласных, тип окончания)</li>
                    </ul>
                    <p>Алгоритм проведет вас через серию простых вопросов и покажет нужные суффиксы.</p>
                    <div class="action-buttons">
                        <button class="btn primary-btn start-btn">Начать подбор суффикса</button>
                        <button class="btn secondary-btn carousel-btn" data-tab="tenses">Открыть справочник</button>
                    </div>
                </div>
            `,
            'tenses': `
                <div class="tab-content">
                    <h3>🏃 Глаголы (Igék)</h3>
                    <p>Безобъектное спряжение венгерских глаголов:</p>
                    <div class="tenses-grid">
                        <div class="tense-group">
                            <h4>Типы глаголов</h4>
                            <ul>
                                <li>Обычные глаголы</li>
                                <li>-s / -z / -sz глаголы</li>
                                <li>-ik глаголы</li>
                                <li>С соединительной гласной</li>
                            </ul>
                        </div>
                        <div class="tense-group">
                            <h4>Инфинитив</h4>
                            <ul>
                                <li>Суффикс -ni</li>
                                <li>С соединительной гласной</li>
                                <li>Неправильные глаголы</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            'passive': `
                <div class="tab-content">
                    <h3>📦 Существительные (Főnevek)</h3>
                    <div class="passive-grid">
                        <div class="passive-group">
                            <h4>Множественное число (-k)</h4>
                            <ul>
                                <li>Задние гласные → -ok</li>
                                <li>Передние → -ek / -ök</li>
                                <li>На гласную → -k</li>
                            </ul>
                        </div>
                        <div class="passive-group">
                            <h4>Винительный падеж (-t)</h4>
                            <ul>
                                <li>На гласную → -t</li>
                                <li>Спец. согласные → -t</li>
                                <li>Другие → -ot/-et/-öt</li>
                            </ul>
                        </div>
                        <div class="passive-group">
                            <h4>Местонахождение (Hol?)</h4>
                            <ul>
                                <li>-ban / -ben (в)</li>
                                <li>-on / -en / -ön (на)</li>
                                <li>-nál / -nél (у)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            'conditionals': `
                <div class="tab-content">
                    <h3>🔤 Гармония гласных</h3>
                    <p>Ключевой принцип венгерского языка — суффиксы подстраиваются под гласные в слове:</p>
                    <div class="conditionals-list">
                        <div class="conditional-item">
                            <h4>Задние гласные</h4>
                            <p>a, á, o, ó, u, ú → суффиксы с a/o (ban, ok, nak, nál...)</p>
                        </div>
                        <div class="conditional-item">
                            <h4>Передние нелабиализованные</h4>
                            <p>e, é, i, í → суффиксы с e (ben, ek, nek, nél...)</p>
                        </div>
                        <div class="conditional-item">
                            <h4>Передние лабиализованные (округлённые)</h4>
                            <p>ö, ő, ü, ű → суффиксы с ö (ök, öt, ön...)</p>
                        </div>
                        <div class="conditional-item">
                            <h4>Удлинение -a/-e</h4>
                            <p>Перед суффиксами -a → -á, -e → -é: alma → almák, körte → körték</p>
                        </div>
                    </div>
                </div>
            `,
        };
    }

    /**
     * Обработка шаблона главной страницы
     * @returns {string} HTML главной страницы
     */
    processTemplate() {
        // Получаем текущую активную вкладку из хранилища
        const activeTab = this.store.getActiveTab();

        return `
            <header>
                <div class="logo" id="main-logo">Magyar Gid</div>
                <div class="tagline">Интерактивная шпаргалка по венгерской грамматике</div>
            </header>

            <div class="card fade-in">
                <div class="card-title">Szia! Добро пожаловать!</div>
                <div class="card-description">
                    <p>Magyar Gid — интерактивный алгоритм-шпаргалка по венгерской грамматике. Поможет подобрать правильный суффикс для спряжения глаголов, образования падежей, множественного числа и притяжательных конструкций.</p>
                    <p style="margin-top: 10px;">Ответьте на несколько вопросов о слове и о том, что вы хотите выразить — алгоритм покажет правила, формулы и примеры.</p>
                </div>
                <div class="action-buttons">
                    <button class="btn primary-btn start-btn">Начать подбор суффикса</button>
                </div>
            </div>

            <div class="card fade-in delay-1">
                <div class="nav-tabs">
                    <div class="nav-tab ${activeTab === 'algorithm' ? 'active' : ''}" data-tab="algorithm">🇭🇺 Алгоритм</div>
                    <div class="nav-tab ${activeTab === 'tenses' ? 'active' : ''}" data-tab="tenses">🏃 Глаголы</div>
                    <div class="nav-tab ${activeTab === 'passive' ? 'active' : ''}" data-tab="passive">📦 Существительные</div>
                    <div class="nav-tab ${activeTab === 'conditionals' ? 'active' : ''}" data-tab="conditionals">🔤 Гармония гласных</div>
                </div>
                <div class="card-description" style="margin-top: 15px;">
                    <p>Выберите раздел для быстрого доступа к справочной информации. Алгоритм проведёт через вопросы, справочники содержат таблицы спряжений и склонений.</p>
                </div>
            </div>

            <div class="footer">
                Magyar Gid | Шпаргалка по венгерской грамматике
            </div>
        `;
    }

    /**
     * Привязка обработчиков событий
     */
    bindEvents() {
        // Обработчик для логотипа
        const logo = this.element.querySelector('#main-logo');
        if (logo) {
            logo.style.cursor = 'pointer';
            logo.addEventListener('click', () => {
                this.eventBus.emit('navigate:home');
            });
        }

        // Обработчик для кнопки "Начать"
        const startButtons = this.element.querySelectorAll('.start-btn');
        startButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.eventBus.emit('start:algorithm', { id: 'hungarian-guide' });
            });
        });

        // Обработчик для кнопки "Открыть справочник"
        const carouselButtons = this.element.querySelectorAll('.carousel-btn');
        carouselButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tab = button.getAttribute('data-tab') || 'tenses';
                this.eventBus.emit('navigate:carousel', { tab });
            });
        });

        // Обработчик для кнопки "Перейти к практикуму"
        const practiceButtons = this.element.querySelectorAll('.practice-btn');
        practiceButtons.forEach(button => {
            button.addEventListener('click', () => {
                window.location.href = '/practice.html';
            });
        });

        // Обработчики для навигационных вкладок
        const navTabs = this.element.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.addEventListener('click', (event) => {
                // Удаляем класс active у всех вкладок
                navTabs.forEach(t => {
                    t.classList.remove('active');
                });

                // Добавляем класс active к текущей вкладке
                event.currentTarget.classList.add('active');

                // Получаем идентификатор вкладки из атрибута data-tab
                const tabId = event.currentTarget.getAttribute('data-tab');

                // Сохраняем активную вкладку в хранилище
                this.store.setActiveTab(tabId);

                // На главной странице кнопка "ВремяГид" (algorithm) ничего не делает
                // Для остальных табов открываем соответствующую карусель
                if (tabId !== 'algorithm') {
                    const carouselTabMapping = {
                        'tenses': 'tenses',
                        'passive': 'voices',
                        'conditionals': 'conditionals'
                    };
                    this.eventBus.emit('navigate:carousel', { tab: carouselTabMapping[tabId] });
                }
            });
        });
    }
}

export default MainView;
