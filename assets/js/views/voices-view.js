import BaseView from './base-view.js';
import EventBus from '../utils/event-bus.js';

/**
 * VoicesView - представление для экрана "Залоги"
 */
class VoicesView extends BaseView {
    /**
     * @param {string} elementId - ID DOM-элемента для рендеринга
     */
    constructor(elementId) {
        super(elementId);
        this.eventBus = EventBus.getInstance();
        this.activeVoice = 'active'; // по умолчанию - активный залог
        this.activeTense = 'all'; // по умолчанию - все времена
    }

    /**
     * Обработка шаблона для экрана "Залоги"
     * @param {object} data - Данные для подстановки в шаблон
     * @returns {string} Обработанный HTML
     */
    processTemplate(data = {}) {
        return `
            <div class="card fade-in">
                <header>
                    <div class="logo-small" id="voices-logo">ВремяГид</div>
                </header>
                
                <div class="nav-tabs">
                    <div class="nav-tab">🧠 ВремяГид</div>
                    <div class="nav-tab">⏰ Времена</div>
                    <div class="nav-tab active">📢 Залоги</div>
                    <div class="nav-tab">🔀 Условные предложения</div>
                </div>

                <div class="card-title">Залоги в английском языке</div>
                <div class="card-description">
                    <p>Изучите активный и пассивный залоги в английском языке, их формулы, правила использования и особенности трансформации между ними.</p>
                </div>
                
                <div class="practice-btn-container">
                    <button class="btn btn-primary practice-btn" id="start-passive-practice-btn">
                        Практика по пассивному залогу
                    </button>
                </div>

                <div class="voices-overview fade-in delay-1">
                    <div class="voice-card">
                        <div class="section-title">
                            <span class="section-icon">📚</span>
                            Что такое залог в английском языке
                        </div>
                        
                        <p class="voice-description">
                            Залог — это грамматическая категория, которая показывает, является ли подлежащее предложения 
                            <strong>исполнителем</strong> или <strong>объектом</strong> действия.
                        </p>
                        
                        <div class="voice-types">
                            <div class="voice-type">
                                <span class="voice-badge active">Активный залог</span>
                                <p>Подлежащее <strong>выполняет</strong> действие.</p>
                                <div class="voice-example-card">
                                    <div class="example-label">The Active Voice</div>
                                    <div class="example-text">John wrote a letter.</div>
                                    <div class="example-translation">Джон написал письмо.</div>
                                </div>
                            </div>
                            
                            <div class="voice-type">
                                <span class="voice-badge passive">Пассивный залог</span>
                                <p>Подлежащее <strong>подвергается</strong> действию.</p>
                                <div class="voice-example-card">
                                    <div class="example-label">The Passive Voice</div>
                                    <div class="example-text">A letter was written by John.</div>
                                    <div class="example-translation">Письмо было написано Джоном.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="voice-card">
                        <div class="section-title">
                            <span class="section-icon">🔧</span>
                            Как преобразовать активный залог в пассивный
                        </div>
                        
                        <div class="transformation-steps">
                            <div class="step-item">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <h4>Определите объект и субъект</h4>
                                    <div class="step-example">
                                        <span class="highlight subject">John</span> wrote 
                                        <span class="highlight object">a letter</span>.
                                    </div>
                                </div>
                            </div>
                            
                            <div class="step-item">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <h4>Переместите объект в начало предложения</h4>
                                    <div class="step-example">
                                        <span class="highlight object">A letter</span> ... by 
                                        <span class="highlight subject">John</span>.
                                    </div>
                                </div>
                            </div>
                            
                            <div class="step-item">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <h4>Измените глагол на форму "be + V3"</h4>
                                    <div class="step-example">
                                        <span class="highlight object">A letter</span> 
                                        <span class="highlight verb">was written</span> by 
                                        <span class="highlight subject">John</span>.
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="formula-box">
                            <div class="formula-title">Формула трансформации:</div>
                            <div class="formula-text">
                                <span class="formula-part">Subject + Verb + Object</span>
                                <span class="formula-arrow">→</span>
                                <span class="formula-part">Object + be + V3 + (by + Subject)</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="voice-card">
                        <div class="section-title">
                            <span class="section-icon">🎯</span>
                            Когда использовать каждый залог
                        </div>
                        
                        <div class="usage-box">
                            <div class="usage-title active">
                                <span class="usage-icon">👤</span>
                                Активный залог используется, когда:
                            </div>
                            <ul class="usage-list">
                                <li>Важно подчеркнуть, <strong>кто</strong> совершает действие</li>
                                <li>Нужно сделать предложение более прямым и динамичным</li>
                                <li>В повседневной речи и неформальном общении</li>
                                <li>Когда действие важнее, чем его исполнитель</li>
                                <li>В новостных заголовках для краткости</li>
                            </ul>
                            <div class="usage-example">
                                <div class="usage-example-item">
                                    <div class="usage-example-text">Students completed the project on time.</div>
                                    <div class="usage-example-note">Акцент на том, что именно студенты выполнили проект</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="usage-box">
                            <div class="usage-title passive">
                                <span class="usage-icon">📦</span>
                                Пассивный залог используется, когда:
                            </div>
                            <ul class="usage-list">
                                <li>Неизвестно или не важно, кто выполняет действие</li>
                                <li>Объект действия важнее, чем исполнитель</li>
                                <li>В научных работах, инструкциях и официальных документах</li>
                                <li>Чтобы избежать обвинений или ответственности</li>
                                <li>Для придания высказыванию формальности и объективности</li>
                            </ul>
                            <div class="usage-example">
                                <div class="usage-example-item">
                                    <div class="usage-example-text">The project was completed on time.</div>
                                    <div class="usage-example-note">Акцент на том, что проект выполнен, а не на том, кто его выполнил</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="voice-card">
                        <div class="section-title">
                            <span class="section-icon">⏱️</span>
                            Примеры пассивного залога в разных временах
                        </div>
                        
                        <div class="tense-examples">
                            <div class="tense-example-item">
                                <div class="tense-badge">Present Simple</div>
                                <div class="tense-formula">Object + am/is/are + V3</div>
                                <div class="tense-example-text">
                                    <div class="tense-active">Active: They clean the room every day.</div>
                                    <div class="tense-passive">Passive: The room is cleaned every day.</div>
                                </div>
                            </div>
                            
                            <div class="tense-example-item">
                                <div class="tense-badge">Past Simple</div>
                                <div class="tense-formula">Object + was/were + V3</div>
                                <div class="tense-example-text">
                                    <div class="tense-active">Active: They cleaned the room yesterday.</div>
                                    <div class="tense-passive">Passive: The room was cleaned yesterday.</div>
                                </div>
                            </div>
                            
                            <div class="tense-example-item">
                                <div class="tense-badge">Future Simple</div>
                                <div class="tense-formula">Object + will be + V3</div>
                                <div class="tense-example-text">
                                    <div class="tense-active">Active: They will clean the room tomorrow.</div>
                                    <div class="tense-passive">Passive: The room will be cleaned tomorrow.</div>
                                </div>
                            </div>
                            
                            <div class="tense-example-item">
                                <div class="tense-badge">Present Perfect</div>
                                <div class="tense-formula">Object + has/have been + V3</div>
                                <div class="tense-example-text">
                                    <div class="tense-active">Active: They have cleaned the room.</div>
                                    <div class="tense-passive">Passive: The room has been cleaned.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="footer">
                © 2025 ВремяГид | Справочник по залогам английского языка
            </div>
        `;
    }


    /**
     * Привязка обработчиков событий
     */
    bindEvents() {
        // Обработчик для логотипа
        const logo = this.element.querySelector('#voices-logo');
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
                if (index === 0) { // Если вкладка "ВремяГид"
                    this.eventBus.emit('navigate:home');
                } else if (index !== 2) { // Если не текущая вкладка (Залоги)
                    const tabNames = ['algorithm', 'tenses', 'voices', 'conditionals'];
                    this.eventBus.emit('carousel:change', { tab: tabNames[index] });
                }
            });
        });

        // Обработчик кнопки "Практика по пассивному залогу"
        const practiceBtn = this.element.querySelector('#start-passive-practice-btn');
        if (practiceBtn) {
            practiceBtn.addEventListener('click', () => {
                // Навигация к практике с предустановленными параметрами для пассивного залога
                const config = {
                    tenses: ['all'],
                    active: false,  // Отключаем активный залог
                    passive: true,  // Включаем только пассивный залог
                    conditionals: false
                };
                // Перенаправление на страницу практики с параметрами
                window.location.href = 'practice.html';
                // Передача параметров через событие
                this.eventBus.emit('practice:setup', config);
            });
        }

        // Кнопка возврата на главную через нажатие на пункт ВремяГид
        // обрабатывается в событиях выше
    }

}

export default VoicesView;