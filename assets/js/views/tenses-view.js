import BaseView from './base-view.js';
import EventBus from '../utils/event-bus.js';

/**
 * TensesView - представление для экрана "Времена"
 */
class TensesView extends BaseView {
    /**
     * @param {string} elementId - ID DOM-элемента для рендеринга
     */
    constructor(elementId) {
        super(elementId);
        this.eventBus = EventBus.getInstance();
        this.activeTime = 'present'; // по умолчанию - настоящее время
    }

    /**
     * Обработка шаблона для экрана "Времена"
     * @param {object} data - Данные для подстановки в шаблон
     * @returns {string} Обработанный HTML
     */
    processTemplate(data = {}) {
        return `
            <div class="card fade-in">
                <header>
                    <div class="logo-small" id="tenses-logo">ВремяГид</div>
                </header>
                
                <div class="nav-tabs">
                    <div class="nav-tab">🧠 ВремяГид</div>
                    <div class="nav-tab active">⏰ Времена</div>
                    <div class="nav-tab">📢 Залоги</div>
                    <div class="nav-tab">🔀 Условные предложения</div>
                </div>

                <div class="card-title">Времена английского языка</div>
                <div class="card-description">
                    <p>Изучите все времена английского языка, их формулы, примеры использования и особенности. Воспользуйтесь поиском или выберите интересующую вас категорию.</p>
                </div>

                <div class="practice-btn-container">
                    <button class="btn btn-primary practice-btn" id="start-tenses-practice-btn">
                        Практика по временам
                    </button>
                </div>

                <div class="search-box">
                    <input type="text" class="search-input" placeholder="Поиск по временам...">
                    <button class="search-btn">Найти</button>
                </div>

                <div class="timeline fade-in delay-1">
                    <div class="time-point ${this.activeTime === 'past' ? 'active' : ''}" data-time="past">
                        P
                        <div class="time-label">Прошедшее</div>
                    </div>
                    <div class="time-point ${this.activeTime === 'present' ? 'active' : ''}" data-time="present">
                        N
                        <div class="time-label">Настоящее</div>
                    </div>
                    <div class="time-point ${this.activeTime === 'future' ? 'active' : ''}" data-time="future">
                        F
                        <div class="time-label">Будущее</div>
                    </div>
                </div>

                <div class="tense-categories fade-in delay-2">
                    ${this.renderTenseCategory()}
                </div>

                <div class="quick-examples fade-in delay-3">
                    ${this.renderExamples()}
                </div>
            </div>

            <div class="footer">
                © 2025 ВремяГид | Справочник по временам английского языка
            </div>
        `;
    }

    /**
     * Рендеринг категории времен в зависимости от выбранного времени
     * @returns {string} HTML-код категории времен
     */
    renderTenseCategory() {
        switch (this.activeTime) {
            case 'past':
                return `
                    <div class="tense-category">
                        <div class="category-title">
                            <span class="icon">⏮️</span> Прошедшее время
                        </div>
                        <div class="tense-list">
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">📅</span> Past Simple
                                </div>
                                <div class="tense-description">
                                    Однократное завершенное действие
                                </div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">⏳</span> Past Continuous
                                </div>
                                <div class="tense-description">
                                    Действие в процессе в прошлом
                                </div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">✅</span> Past Perfect
                                </div>
                                <div class="tense-description">
                                    Действие до другого в прошлом
                                </div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">⏱️</span> Past Perfect Continuous
                                </div>
                                <div class="tense-description">
                                    Длительное действие до момента в прошлом
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            case 'present':
                return `
                    <div class="tense-category">
                        <div class="category-title">
                            <span class="icon">⏯️</span> Настоящее время
                        </div>
                        <div class="tense-list">
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">📊</span> Present Simple
                                </div>
                                <div class="tense-description">
                                    Регулярные действия и общие истины
                                </div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">⏳</span> Present Continuous
                                </div>
                                <div class="tense-description">
                                    Действие происходит сейчас
                                </div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">✅</span> Present Perfect
                                </div>
                                <div class="tense-description">
                                    Действие с результатом в настоящем
                                </div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">⏱️</span> Present Perfect Continuous
                                </div>
                                <div class="tense-description">
                                    Длительное действие до настоящего момента
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            case 'future':
                return `
                    <div class="tense-category">
                        <div class="category-title">
                            <span class="icon">⏭️</span> Будущее время
                        </div>
                        <div class="tense-list">
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">🔮</span> Future Simple
                                </div>
                                <div class="tense-description">
                                    Предсказания, спонтанные решения
                                </div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">🎯</span> Be going to
                                </div>
                                <div class="tense-description">
                                    Намерения и планы
                                </div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">📅</span> Present Continuous (Future)
                                </div>
                                <div class="tense-description">
                                    Запланированные договоренности
                                </div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">🕒</span> Present Simple (Future)
                                </div>
                                <div class="tense-description">
                                    Расписания и графики
                                </div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">⏳</span> Future Continuous
                                </div>
                                <div class="tense-description">
                                    Процесс в конкретный момент будущего
                                </div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">✅</span> Future Perfect
                                </div>
                                <div class="tense-description">
                                    Действие, завершённое к определённому моменту
                                </div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">
                                    <span class="icon">⏱️</span> Future Perfect Continuous
                                </div>
                                <div class="tense-description">
                                    Длительное действие до момента в будущем
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            default:
                return '';
        }
    }

    /**
     * Рендеринг примеров использования времен
     * @returns {string} HTML-код примеров
     */
    renderExamples() {
        switch (this.activeTime) {
            case 'past':
                return `
                    <div class="example-header">
                        <div class="example-icon">💡</div>
                        <div class="example-title">Примеры использования</div>
                    </div>
                    <ul class="example-list">
                        <li>
                            <div class="english">I lived in London for five years. (Past Simple)</div>
                            <div class="translation">Я жил в Лондоне пять лет.</div>
                        </li>
                        <li>
                            <div class="english">I was watching TV when she called. (Past Continuous)</div>
                            <div class="translation">Я смотрел телевизор, когда она позвонила.</div>
                        </li>
                        <li>
                            <div class="english">I had already finished my work when he arrived. (Past Perfect)</div>
                            <div class="translation">Я уже закончил свою работу, когда он приехал.</div>
                        </li>
                        <li>
                            <div class="english">I had been working for three hours before I took a break. (Past Perfect Continuous)</div>
                            <div class="translation">Я работал три часа, прежде чем сделал перерыв.</div>
                        </li>
                    </ul>
                `;
            case 'present':
                return `
                    <div class="example-header">
                        <div class="example-icon">💡</div>
                        <div class="example-title">Примеры использования</div>
                    </div>
                    <ul class="example-list">
                        <li>
                            <div class="english">I work in an office. (Present Simple)</div>
                            <div class="translation">Я работаю в офисе.</div>
                        </li>
                        <li>
                            <div class="english">I am working on a project now. (Present Continuous)</div>
                            <div class="translation">Я сейчас работаю над проектом.</div>
                        </li>
                        <li>
                            <div class="english">I have worked here for 5 years. (Present Perfect)</div>
                            <div class="translation">Я работаю здесь 5 лет.</div>
                        </li>
                        <li>
                            <div class="english">I have been working on this since morning. (Present Perfect Continuous)</div>
                            <div class="translation">Я работаю над этим с утра.</div>
                        </li>
                    </ul>
                `;
            case 'future':
                return `
                    <div class="example-header">
                        <div class="example-icon">💡</div>
                        <div class="example-title">Примеры использования</div>
                    </div>
                    <ul class="example-list">
                        <li>
                            <div class="english">I will help you with this project. (Future Simple)</div>
                            <div class="translation">Я помогу тебе с этим проектом.</div>
                        </li>
                        <li>
                            <div class="english">I am going to study tonight. (Be going to)</div>
                            <div class="translation">Я собираюсь заниматься сегодня вечером.</div>
                        </li>
                        <li>
                            <div class="english">I am meeting my friends at 6 PM. (Present Continuous for Future)</div>
                            <div class="translation">Я встречаюсь с друзьями в 6 вечера.</div>
                        </li>
                        <li>
                            <div class="english">The train leaves at 5 PM tomorrow. (Present Simple for Future)</div>
                            <div class="translation">Поезд отправляется завтра в 5 вечера.</div>
                        </li>
                    </ul>
                `;
            default:
                return '';
        }
    }

    /**
     * Привязка обработчиков событий
     */
    bindEvents() {
        // Обработчик для логотипа
        const logo = this.element.querySelector('#tenses-logo');
        if (logo) {
            logo.style.cursor = 'pointer';
            logo.addEventListener('click', () => {
                this.eventBus.emit('navigate:home');
            });
        }
        
        // Привязка событий навигации
        const navTabs = this.element.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const index = Array.from(navTabs).indexOf(tab);
                if (index === 0) { // Если вкладка "ВремяГид" - возвращаемся на главную
                    this.eventBus.emit('navigate:home');
                } else if (index !== 1) { // Если не текущая вкладка (Таблица времен)
                    const tabNames = ['algorithm', 'tenses', 'voices', 'conditionals'];
                    this.eventBus.emit('carousel:change', { tab: tabNames[index] });
                }
            });
        });

        // Обработчик кнопки "Практика по временам"
        const practiceBtn = this.element.querySelector('#start-tenses-practice-btn');
        if (practiceBtn) {
            practiceBtn.addEventListener('click', () => {
                // Навигация к практике с предустановленными параметрами для тренировки времен
                const config = {
                    tenses: this.activeTime === 'all' ? ['all'] : this.getTensesForActiveTime(),
                    active: true,
                    passive: false, 
                    conditionals: false
                };
                // Перенаправление на страницу практики с параметрами
                window.location.href = 'practice.html';
                // Передача параметров через store или sessionStorage будет выполнена в контроллере
                this.eventBus.emit('practice:setup', config);
            });
        }

        // Обработка переключения временной линии
        const timePoints = this.element.querySelectorAll('.time-point');
        timePoints.forEach(point => {
            point.addEventListener('click', () => {
                timePoints.forEach(p => p.classList.remove('active'));
                point.classList.add('active');
                
                this.activeTime = point.getAttribute('data-time');
                this.updateTenseCategory();
            });
        });

        // Обработка клика по категории времени
        const tenseItems = this.element.querySelectorAll('.tense-item');
        tenseItems.forEach(item => {
            item.addEventListener('click', () => {
                const tenseName = item.querySelector('.tense-name').textContent.trim();
                const tenseId = this.getTenseIdFromName(tenseName);
                if (tenseId) {
                    this.eventBus.emit('navigate:tense-detail', { id: tenseId });
                } else {
                    console.error(`Не удалось определить идентификатор для времени "${tenseName}"`);
                }
            });
        });

        // Кнопка возврата на главную через нажатие на пункт ВремяГид
        // обрабатывается в событиях выше
    }

    /**
     * Обновление категории времен при переключении временной линии
     */
    updateTenseCategory() {
        const categoryContainer = this.element.querySelector('.tense-categories');
        if (categoryContainer) {
            categoryContainer.innerHTML = this.renderTenseCategory();
        }

        const examplesContainer = this.element.querySelector('.quick-examples');
        if (examplesContainer) {
            examplesContainer.innerHTML = this.renderExamples();
        }

        // Повторно привязываем события для новых элементов
        this.bindEvents();
    }

    /**
     * Установка активного времени
     * @param {string} time - Имя времени (past, present, future)
     */
    setActiveTime(time) {
        this.activeTime = time;
        
        // Если представление уже отрендерено, обновляем UI
        if (this.element.querySelector('.time-point')) {
            const timePoints = this.element.querySelectorAll('.time-point');
            timePoints.forEach(point => {
                point.classList.toggle('active', point.getAttribute('data-time') === time);
            });
            
            this.updateTenseCategory();
        }
    }

    /**
     * Получение идентификатора времени по его названию
     * @param {string} tenseName - Название времени (например, "Present Simple")
     * @returns {string|null} - Идентификатор времени или null, если не найден
     */
    getTenseIdFromName(tenseName) {
        // Удаляем иконку и лишние пробелы из названия
        tenseName = tenseName.replace(/^[^a-zA-Z]+/, '').trim();
        
        // Карта соответствия названий времен их идентификаторам
        const tenseMap = {
            'Present Simple': 'present_simple',
            'Present Continuous': 'present_continuous',
            'Present Perfect': 'present_perfect',
            'Present Perfect Continuous': 'present_perfect_continuous',
            'Past Simple': 'past_simple',
            'Past Continuous': 'past_continuous',
            'Past Perfect': 'past_perfect',
            'Past Perfect Continuous': 'past_perfect_continuous',
            'Future Simple': 'future_simple',
            'Be going to': 'be_going_to',
            'Present Continuous (Future)': 'present_continuous_future',
            'Present Simple (Future)': 'present_simple_future',
            'Future Continuous': 'future_continuous',
            'Future Perfect': 'future_perfect',
            'Future Perfect Continuous': 'future_perfect_continuous'
        };
        
        return tenseMap[tenseName] || null;
    }
    
    /**
     * Получение списка времен для активной временной категории (прошедшее/настоящее/будущее)
     * @returns {Array} Массив идентификаторов времен для выбранной категории
     */
    getTensesForActiveTime() {
        // Создаем карту для каждой временной категории
        const timeMap = {
            'past': ['past_simple', 'past_continuous', 'past_perfect', 'past_perfect_continuous'],
            'present': ['present_simple', 'present_continuous', 'present_perfect', 'present_perfect_continuous'],
            'future': ['future_simple', 'be_going_to', 'present_continuous_future', 
                      'present_simple_future', 'future_continuous', 'future_perfect', 
                      'future_perfect_continuous']
        };
        
        // Возвращаем времена для активной категории или ["all"], если категория не определена
        return timeMap[this.activeTime] || ['all'];
    }

}

export default TensesView;