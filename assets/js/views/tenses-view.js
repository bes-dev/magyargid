import BaseView from './base-view.js';
import EventBus from '../utils/event-bus.js';

class TensesView extends BaseView {
    constructor(elementId) {
        super(elementId);
        this.eventBus = EventBus.getInstance();
        this.activeTime = 'verbs';
    }

    processTemplate(data = {}) {
        return `
            <div class="card fade-in">
                <header>
                    <div class="logo-small" id="tenses-logo">Magyar Gid</div>
                </header>

                <div class="nav-tabs">
                    <div class="nav-tab">🇭🇺 Алгоритм</div>
                    <div class="nav-tab active">🏃 Глаголы</div>
                    <div class="nav-tab">📦 Существительные</div>
                    <div class="nav-tab">🔤 Гармония</div>
                    <div class="nav-tab">🔢 Числительные</div>
                </div>

                <div class="card-title">Венгерские глаголы (Igék)</div>
                <div class="card-description">
                    <p>Безобъектное спряжение, инфинитив, типы глаголов и неправильные глаголы.</p>
                </div>

                <div class="timeline fade-in delay-1">
                    <div class="time-point ${this.activeTime === 'verbs' ? 'active' : ''}" data-time="verbs">
                        🔄
                        <div class="time-label">Спряжение</div>
                    </div>
                    <div class="time-point ${this.activeTime === 'infinitive' ? 'active' : ''}" data-time="infinitive">
                        📝
                        <div class="time-label">Инфинитив</div>
                    </div>
                    <div class="time-point ${this.activeTime === 'irregular' ? 'active' : ''}" data-time="irregular">
                        ⭐
                        <div class="time-label">Неправильные</div>
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
                Magyar Gid | Справочник по глаголам
            </div>
        `;
    }

    renderTenseCategory() {
        switch (this.activeTime) {
            case 'verbs':
                return `
                    <div class="tense-category">
                        <div class="category-title">
                            <span class="icon">🔄</span> Безобъектное спряжение (настоящее время)
                        </div>
                        <div class="tense-list">
                            <div class="tense-item" data-id="verb_regular">
                                <div class="tense-name"><span class="icon">📊</span> Обычные глаголы</div>
                                <div class="tense-description">Te: -sz | Ők: -nak/-nek</div>
                            </div>
                            <div class="tense-item" data-id="verb_sibilant">
                                <div class="tense-name"><span class="icon">🐍</span> -s / -z / -sz глаголы</div>
                                <div class="tense-description">Te: -ol/-el/-öl (вместо -sz)</div>
                            </div>
                            <div class="tense-item" data-id="verb_ik">
                                <div class="tense-name"><span class="icon">⭐</span> -ik глаголы</div>
                                <div class="tense-description">Ő: -ik | Én: -om/-em/-öm или -ok/-ek/-ök</div>
                            </div>
                            <div class="tense-item" data-id="verb_linking">
                                <div class="tense-name"><span class="icon">🔗</span> С соединительной гласной</div>
                                <div class="tense-description">Основа на 2 согласные или долгую гласную + t</div>
                            </div>
                        </div>
                    </div>
                `;
            case 'infinitive':
                return `
                    <div class="tense-category">
                        <div class="category-title">
                            <span class="icon">📝</span> Инфинитив (-ni)
                        </div>
                        <div class="tense-list">
                            <div class="tense-item" data-id="infinitive">
                                <div class="tense-name"><span class="icon">📝</span> Правила образования</div>
                                <div class="tense-description">основа + -ni, с соед. гласной, неправильные</div>
                            </div>
                        </div>
                    </div>
                `;
            case 'irregular':
                return `
                    <div class="tense-category">
                        <div class="category-title">
                            <span class="icon">⭐</span> Неправильные глаголы
                        </div>
                        <div class="tense-list">
                            <div class="tense-item">
                                <div class="tense-name">lenni (быть)</div>
                                <div class="tense-description">vagyok, vagy, van, vagyunk, vagytok, vannak</div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">menni (идти)</div>
                                <div class="tense-description">megyek, mész, megy, megyünk, mentek, mennek</div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">jönni (приходить)</div>
                                <div class="tense-description">jövök, jössz, jön, jövünk, jöttök, jönnek</div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">enni (есть)</div>
                                <div class="tense-description">eszem, eszel, eszik, eszünk, esztek, esznek</div>
                            </div>
                            <div class="tense-item">
                                <div class="tense-name">inni (пить)</div>
                                <div class="tense-description">iszom, iszol, iszik, iszunk, isztok, isznak</div>
                            </div>
                        </div>
                    </div>
                `;
            default:
                return '';
        }
    }

    renderExamples() {
        switch (this.activeTime) {
            case 'verbs':
                return `
                    <div class="example-header">
                        <div class="example-icon">💡</div>
                        <div class="example-title">Сводная таблица окончаний</div>
                    </div>
                    <ul class="example-list">
                        <li><div class="tense-name">Én:</div> <div class="translation">-ok / -ek / -ök</div></li>
                        <li><div class="tense-name">Te:</div> <div class="translation">-sz (обычные) | -ol/-el/-öl (шипящие)</div></li>
                        <li><div class="tense-name">Ő/Ön:</div> <div class="translation">— (без окончания) | -ik (для -ik глаголов)</div></li>
                        <li><div class="tense-name">Mi:</div> <div class="translation">-unk / -ünk</div></li>
                        <li><div class="tense-name">Ti:</div> <div class="translation">-tok / -tek / -tök</div></li>
                        <li><div class="tense-name">Ők/Önök:</div> <div class="translation">-nak / -nek</div></li>
                    </ul>
                `;
            case 'infinitive':
                return `
                    <div class="example-header">
                        <div class="example-icon">💡</div>
                        <div class="example-title">Примеры инфинитива</div>
                    </div>
                    <ul class="example-list">
                        <li><div class="tense-name">rajzol → rajzolni</div> <div class="translation">рисовать</div></li>
                        <li><div class="tense-name">hall → hallani</div> <div class="translation">слышать (2 согл. → +a+ni)</div></li>
                        <li><div class="tense-name">eszik → enni</div> <div class="translation">есть (неправильный)</div></li>
                        <li><div class="tense-name">dolgozik → dolgozni</div> <div class="translation">работать (-ik → убрать -ik)</div></li>
                    </ul>
                `;
            case 'irregular':
                return `
                    <div class="example-header">
                        <div class="example-icon">💡</div>
                        <div class="example-title">Глагол lenni (быть) — особенности</div>
                    </div>
                    <ul class="example-list">
                        <li><div class="tense-name">3-е лицо: van/vannak опускается</div> <div class="translation">если ответ на Какой?/Кто?/Что?</div></li>
                        <li><div class="tense-name">Ő szép. (без van!)</div> <div class="translation">Она красивая.</div></li>
                        <li><div class="tense-name">Ő otthon van.</div> <div class="translation">Он дома. (van нужен — ответ на Где?)</div></li>
                        <li><div class="tense-name">nem + van = nincs</div> <div class="translation">nem + vannak = nincsenek</div></li>
                    </ul>
                `;
            default:
                return '';
        }
    }

    bindEvents() {
        const logo = this.element.querySelector('#tenses-logo');
        if (logo) {
            logo.style.cursor = 'pointer';
            logo.addEventListener('click', () => this.eventBus.emit('navigate:home'));
        }

        const navTabs = this.element.querySelectorAll('.nav-tab');
        navTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                if (index === 0) {
                    this.eventBus.emit('navigate:home');
                } else if (index !== 1) {
                    const tabNames = ['algorithm', 'tenses', 'voices', 'conditionals', 'numerals'];
                    this.eventBus.emit('carousel:change', { tab: tabNames[index] });
                }
            });
        });

        const timePoints = this.element.querySelectorAll('.time-point');
        timePoints.forEach(point => {
            point.addEventListener('click', () => {
                timePoints.forEach(p => p.classList.remove('active'));
                point.classList.add('active');
                this.activeTime = point.getAttribute('data-time');
                this.updateTenseCategory();
            });
        });

        const tenseItems = this.element.querySelectorAll('.tense-item[data-id]');
        tenseItems.forEach(item => {
            item.addEventListener('click', () => {
                const tenseId = item.getAttribute('data-id');
                if (tenseId) {
                    this.eventBus.emit('navigate:tense-detail', { id: tenseId });
                }
            });
        });
    }

    updateTenseCategory() {
        const categoryContainer = this.element.querySelector('.tense-categories');
        if (categoryContainer) categoryContainer.innerHTML = this.renderTenseCategory();
        const examplesContainer = this.element.querySelector('.quick-examples');
        if (examplesContainer) examplesContainer.innerHTML = this.renderExamples();
        this.bindEvents();
    }

    setActiveTime(time) {
        this.activeTime = time;
        if (this.element.querySelector('.time-point')) {
            const timePoints = this.element.querySelectorAll('.time-point');
            timePoints.forEach(point => {
                point.classList.toggle('active', point.getAttribute('data-time') === time);
            });
            this.updateTenseCategory();
        }
    }
}

export default TensesView;
