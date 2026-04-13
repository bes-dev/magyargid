import BaseView from './base-view.js';
import EventBus from '../utils/event-bus.js';

/**
 * ConditionalsView - представление для экрана "Условные предложения"
 */
class ConditionalsView extends BaseView {
    /**
     * @param {string} elementId - ID DOM-элемента для рендеринга
     */
    constructor(elementId) {
        super(elementId);
        this.eventBus = EventBus.getInstance();
        this.activeConditional = 'zero'; // по умолчанию - zero conditional
    }

    /**
     * Обработка шаблона для экрана "Условные предложения"
     * @param {object} data - Данные для подстановки в шаблон
     * @returns {string} Обработанный HTML
     */
    processTemplate(data = {}) {
        return `
            <div class="card fade-in">
                <header>
                    <div class="logo-small" id="conditionals-logo">ВремяГид</div>
                </header>
                
                <div class="nav-tabs">
                    <div class="nav-tab">🧠 ВремяГид</div>
                    <div class="nav-tab">⏰ Времена</div>
                    <div class="nav-tab">📢 Залоги</div>
                    <div class="nav-tab active">🔀 Условные предложения</div>
                </div>

                <div class="card-title">Условные предложения</div>
                <div class="card-description">
                    <p>Изучите все типы условных предложений в английском языке, их структуру, примеры использования и особенности.</p>
                </div>
                
                <div class="practice-btn-container">
                    <button class="btn btn-primary practice-btn" id="start-conditionals-practice-btn">
                        Практика по условным предложениям
                    </button>
                </div>

                <div class="conditional-tabs fade-in delay-1">
                    <div class="conditional-tab ${this.activeConditional === 'zero' ? 'active' : ''}" data-type="zero">
                        <span class="conditional-tab-icon">0️⃣</span>
                        Zero
                    </div>
                    <div class="conditional-tab ${this.activeConditional === 'first' ? 'active' : ''}" data-type="first">
                        <span class="conditional-tab-icon">1️⃣</span>
                        First
                    </div>
                    <div class="conditional-tab ${this.activeConditional === 'second' ? 'active' : ''}" data-type="second">
                        <span class="conditional-tab-icon">2️⃣</span>
                        Second
                    </div>
                    <div class="conditional-tab ${this.activeConditional === 'third' ? 'active' : ''}" data-type="third">
                        <span class="conditional-tab-icon">3️⃣</span>
                        Third
                    </div>
                    <div class="conditional-tab ${this.activeConditional === 'mixed' ? 'active' : ''}" data-type="mixed">
                        <span class="conditional-tab-icon">🔄</span>
                        Mixed
                    </div>
                </div>

                <div class="conditional-preview fade-in delay-2">
                    ${this.renderConditionalScenario()}
                </div>

                <div class="fade-in delay-3">
                    ${this.renderConditionalDetails()}
                </div>
            </div>

            <div class="footer">
                © 2025 ВремяГид | Справочник по условным предложениям
            </div>
        `;
    }

    /**
     * Рендеринг сценария условного предложения
     * @returns {string} HTML-код сценария
     */
    renderConditionalScenario() {
        // Определяем сценарии для каждого типа условного предложения
        const scenarios = {
            'zero': {
                if: 'If you heat water to 100°C,',
                then: 'it boils.',
                description: 'Описывает общие истины и закономерности. Результат всегда следует за условием.'
            },
            'first': {
                if: 'If it rains tomorrow,',
                then: 'I will stay at home.',
                description: 'Описывает реальные ситуации в будущем. Условие вполне вероятно.'
            },
            'second': {
                if: 'If I had more time,',
                then: 'I would learn French.',
                description: 'Описывает маловероятные или воображаемые ситуации в настоящем/будущем.'
            },
            'third': {
                if: 'If I had studied harder,',
                then: 'I would have passed the exam.',
                description: 'Описывает нереальные ситуации в прошлом. Условие не осуществилось.'
            },
            'mixed': {
                if: 'If I had studied medicine,',
                then: 'I would be a doctor now.',
                description: 'Смешивает времена: условие в прошлом, результат в настоящем/будущем (или наоборот).'
            }
        };

        // Рендерим все сценарии, активный будет показан через CSS
        return Object.keys(scenarios).map(type => {
            const scenario = scenarios[type];
            return `
                <div class="conditional-scenario ${type === this.activeConditional ? 'active' : ''}" data-type="${type}">
                    <div class="scenario-bubble">
                        <div class="scenario-text">
                            <span class="if-part">${scenario.if}</span> <span class="then-part">${scenario.then}</span>
                        </div>
                        <div class="scenario-description">
                            ${scenario.description}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Рендеринг детальной информации об условном предложении
     * @returns {string} HTML-код деталей условного предложения
     */
    renderConditionalDetails() {
        // Определяем детали для каждого типа условного предложения
        const details = {
            'zero': {
                title: 'Zero Conditional',
                probability: 'Вероятность: 100% (общие истины)',
                formula: 'If + Present Simple, Present Simple',
                cssClass: 'zero-conditional',
                icon: '0',
                examples: [
                    {
                        text: 'If you heat water to 100°C, it boils.',
                        translation: 'Если нагреть воду до 100°C, она закипает.'
                    },
                    {
                        text: 'If I eat chocolate, I get headaches.',
                        translation: 'Если я ем шоколад, у меня болит голова.'
                    },
                    {
                        text: 'Plants die if they don\'t get water.',
                        translation: 'Растения умирают, если не получают воду.'
                    }
                ],
                usage: [
                    'Для выражения общих истин и законов природы',
                    'Для описания того, что происходит всегда при определенных условиях',
                    'Для научных фактов и закономерностей',
                    'Для описания привычек и повторяющихся действий'
                ]
            },
            'first': {
                title: 'First Conditional',
                probability: 'Вероятность: 50-90% (реальная возможность)',
                formula: 'If + Present Simple, will + verb',
                cssClass: 'first-conditional',
                icon: '1',
                examples: [
                    {
                        text: 'If it rains tomorrow, I will stay at home.',
                        translation: 'Если завтра пойдет дождь, я останусь дома.'
                    },
                    {
                        text: 'If you study hard, you will pass your exams.',
                        translation: 'Если ты будешь усердно учиться, ты сдашь экзамены.'
                    },
                    {
                        text: 'I will help you if I have time.',
                        translation: 'Я помогу тебе, если у меня будет время.'
                    }
                ],
                usage: [
                    'Для выражения реальных, возможных ситуаций в будущем',
                    'Для обещаний, угроз, предупреждений о будущих последствиях',
                    'Для причинно-следственных связей с реальной вероятностью'
                ]
            },
            'second': {
                title: 'Second Conditional',
                probability: 'Вероятность: 10-40% (малореально или гипотетично)',
                formula: 'If + Past Simple, would + verb',
                cssClass: 'second-conditional',
                icon: '2',
                examples: [
                    {
                        text: 'If I had more time, I would learn French.',
                        translation: 'Если бы у меня было больше времени, я бы выучил французский.'
                    },
                    {
                        text: 'If I were you, I would accept the offer.',
                        translation: 'Если бы я был на твоем месте, я бы принял предложение.'
                    },
                    {
                        text: 'She would travel around the world if she had enough money.',
                        translation: 'Она бы путешествовала по миру, если бы у нее было достаточно денег.'
                    }
                ],
                usage: [
                    'Для воображаемых ситуаций в настоящем или будущем',
                    'Для выражения маловероятных или нереальных ситуаций',
                    'Для советов и рекомендаций ("Если бы я был на твоем месте...")',
                    'Для вежливых просьб и предложений'
                ]
            },
            'third': {
                title: 'Third Conditional',
                probability: 'Вероятность: 0% (невозможно, т.к. в прошлом)',
                formula: 'If + Past Perfect, would have + V3',
                cssClass: 'third-conditional',
                icon: '3',
                examples: [
                    {
                        text: 'If I had studied harder, I would have passed the exam.',
                        translation: 'Если бы я учился усерднее, я бы сдал экзамен.'
                    },
                    {
                        text: 'She would have accepted the job if they had offered more money.',
                        translation: 'Она бы приняла работу, если бы они предложили больше денег.'
                    },
                    {
                        text: 'If the weather hadn\'t been so bad, we would have gone to the beach.',
                        translation: 'Если бы погода не была такой плохой, мы бы поехали на пляж.'
                    }
                ],
                usage: [
                    'Для выражения сожаления о прошлом',
                    'Для ситуаций, которые не произошли в прошлом',
                    'Для обсуждения гипотетических результатов прошлых событий',
                    'Для размышлений "что было бы, если бы..."'
                ]
            },
            'mixed': {
                title: 'Mixed Conditional',
                probability: 'Смешанная вероятность',
                formula: 'If + Past Perfect, would + verb (или другие комбинации)',
                cssClass: 'mixed-conditional',
                icon: '🔄',
                examples: [
                    {
                        text: 'If I had studied medicine, I would be a doctor now.',
                        translation: 'Если бы я изучал медицину, я был бы сейчас врачом.'
                    },
                    {
                        text: 'If I weren\'t so tired, I would have gone to the party last night.',
                        translation: 'Если бы я не был таким уставшим, я бы пошел на вечеринку вчера вечером.'
                    },
                    {
                        text: 'If I liked coffee, I would have accepted your invitation to the café.',
                        translation: 'Если бы я любил кофе, я бы принял твое приглашение в кафе.'
                    }
                ],
                usage: [
                    'Для связи прошлого условия с настоящим результатом',
                    'Для связи настоящего условия с прошлым результатом',
                    'Для сложных ситуаций, где время условия и результата не совпадают'
                ]
            }
        };

        return `
            <div class="condition-card ${details[this.activeConditional].cssClass}">
                <div class="condition-header">
                    <div class="condition-icon">${details[this.activeConditional].icon}</div>
                    <div>
                        <div class="condition-title">${details[this.activeConditional].title}</div>
                        <div class="condition-probability">${details[this.activeConditional].probability}</div>
                    </div>
                </div>

                <div class="condition-formula">
                    ${details[this.activeConditional].formula}
                </div>

                <div class="examples-list">
                    ${details[this.activeConditional].examples.map(example => `
                        <div class="example-item">
                            <div class="example-text">${example.text}</div>
                            <div class="example-translation">${example.translation}</div>
                        </div>
                    `).join('')}
                </div>

                <ul class="usage-list">
                    ${details[this.activeConditional].usage.map(usage => `
                        <li>${usage}</li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    /**
     * Привязка обработчиков событий
     */
    bindEvents() {
        // Обработчик для логотипа
        const logo = this.element.querySelector('#conditionals-logo');
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
                } else if (index !== 3) { // Если не текущая вкладка (Условные предл.)
                    const tabNames = ['algorithm', 'tenses', 'voices', 'conditionals'];
                    this.eventBus.emit('carousel:change', { tab: tabNames[index] });
                }
            });
        });

        // Обработчик кнопки "Практика по условным предложениям"
        const practiceBtn = this.element.querySelector('#start-conditionals-practice-btn');
        if (practiceBtn) {
            practiceBtn.addEventListener('click', () => {
                // Навигация к практике с предустановленными параметрами для условных предложений
                const config = {
                    tenses: ['all'],
                    active: false,  // Отключаем активный залог
                    passive: false,
                    conditionals: true,  // Включаем только условные предложения
                    conditionalType: this.activeConditional // Передаем текущий выбранный тип условного предложения
                };
                // Перенаправление на страницу практики с параметрами
                window.location.href = 'practice.html';
                // Передача параметров через событие
                this.eventBus.emit('practice:setup', config);
            });
        }

        // Обработка переключения вкладок условных предложений
        const conditionalTabs = this.element.querySelectorAll('.conditional-tab');
        conditionalTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                conditionalTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                this.activeConditional = tab.getAttribute('data-type');
                this.updateContent();
            });
        });

        // Кнопка возврата на главную через нажатие на пункт ВремяГид
        // обрабатывается в событиях выше
    }

    /**
     * Обновление контента при переключении типа условного предложения
     */
    updateContent() {
        // Обновление сценария
        const scenarioContainer = this.element.querySelector('.conditional-preview');
        if (scenarioContainer) {
            const scenarios = scenarioContainer.querySelectorAll('.conditional-scenario');
            scenarios.forEach(scenario => {
                scenario.classList.toggle('active', scenario.getAttribute('data-type') === this.activeConditional);
            });
        }

        // Обновление детальной информации
        const detailsContainer = this.element.querySelector('.fade-in.delay-3');
        if (detailsContainer) {
            detailsContainer.innerHTML = this.renderConditionalDetails();
        }
    }

    /**
     * Установка активного типа условного предложения
     * @param {string} type - Тип условного предложения (zero, first, second, third, mixed)
     */
    setActiveConditional(type) {
        this.activeConditional = type;
        
        // Если представление уже отрендерено, обновляем UI
        if (this.element.querySelector('.conditional-tab')) {
            const conditionalTabs = this.element.querySelectorAll('.conditional-tab');
            conditionalTabs.forEach(tab => {
                tab.classList.toggle('active', tab.getAttribute('data-type') === type);
            });
            
            this.updateContent();
        }
    }
}

export default ConditionalsView;