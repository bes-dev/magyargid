import BaseView from './base-view.js';
import EventBus from '../utils/event-bus.js';

class HelpView extends BaseView {
    constructor(elementId) {
        super(elementId);
        this.eventBus = EventBus.getInstance();
    }

    processTemplate(data = {}) {
        return `
            <div class="card fade-in">
                <header>
                    <div class="logo-small">Magyar Gid</div>
                </header>

                <div class="nav-tabs">
                    <div class="nav-tab">🇭🇺 Алгоритм</div>
                    <div class="nav-tab">🏃 Глаголы</div>
                    <div class="nav-tab">📦 Существительные</div>
                    <div class="nav-tab">🔤 Гармония гласных</div>
                </div>

                <div class="card-title">Справка</div>
                <div class="card-description">
                    <p>Magyar Gid — интерактивная шпаргалка по венгерской грамматике. Ответьте на вопросы алгоритма, и он покажет нужные суффиксы, правила и примеры.</p>
                </div>

                <div class="card fade-in delay-1">
                    <div class="card-title">Как пользоваться</div>
                    <div class="card-description">
                        <ol>
                            <li>Нажмите «Начать подбор суффикса»</li>
                            <li>Выберите часть речи (глагол, существительное, прилагательное)</li>
                            <li>Укажите, что хотите сделать (спряжение, падеж, мн.число...)</li>
                            <li>Уточните тип слова (гармония гласных, окончание)</li>
                            <li>Получите результат с правилами и примерами</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div class="footer">
                Magyar Gid | Справка
            </div>
        `;
    }

    bindEvents() {
        const logo = this.element.querySelector('.logo-small');
        if (logo) { logo.style.cursor = 'pointer'; logo.addEventListener('click', () => this.eventBus.emit('navigate:home')); }
        const navTabs = this.element.querySelectorAll('.nav-tab');
        navTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                if (index === 0) this.eventBus.emit('navigate:home');
                else { const t = ['algorithm','tenses','voices','conditionals']; this.eventBus.emit('carousel:change', { tab: t[index] }); }
            });
        });
    }
}

export default HelpView;
