import BaseView from './base-view.js';
import EventBus from '../utils/event-bus.js';

class VoicesView extends BaseView {
    constructor(elementId) {
        super(elementId);
        this.eventBus = EventBus.getInstance();
        this.activeSection = 'plural';
    }

    processTemplate(data = {}) {
        return `
            <div class="card fade-in">
                <header>
                    <div class="logo-small" id="voices-logo">Magyar Gid</div>
                </header>

                <div class="nav-tabs">
                    <div class="nav-tab">🇭🇺 Алгоритм</div>
                    <div class="nav-tab">🏃 Глаголы</div>
                    <div class="nav-tab active">📦 Существительные</div>
                    <div class="nav-tab">🔤 Гармония</div>
                    <div class="nav-tab">🔢 Числительные</div>
                </div>

                <div class="card-title">Существительные (Főnevek)</div>
                <div class="card-description">
                    <p>Множественное число, падежи и притяжательные суффиксы.</p>
                </div>

                <div class="timeline fade-in delay-1">
                    <div class="time-point ${this.activeSection === 'plural' ? 'active' : ''}" data-time="plural">
                        👥
                        <div class="time-label">Мн. число</div>
                    </div>
                    <div class="time-point ${this.activeSection === 'accusative' ? 'active' : ''}" data-time="accusative">
                        🎯
                        <div class="time-label">Вин. падеж</div>
                    </div>
                    <div class="time-point ${this.activeSection === 'locative' ? 'active' : ''}" data-time="locative">
                        📍
                        <div class="time-label">Где? (Hol?)</div>
                    </div>
                    <div class="time-point ${this.activeSection === 'possessive' ? 'active' : ''}" data-time="possessive">
                        👤
                        <div class="time-label">Притяж.</div>
                    </div>
                </div>

                <div class="tense-categories fade-in delay-2">
                    ${this.renderSection()}
                </div>

                <div class="quick-examples fade-in delay-3">
                    ${this.renderExamples()}
                </div>
            </div>

            <div class="footer">
                Magyar Gid | Справочник по существительным
            </div>
        `;
    }

    renderSection() {
        switch (this.activeSection) {
            case 'plural':
                return `<div class="tense-category"><div class="category-title"><span class="icon">👥</span> Множественное число (-k)</div><div class="tense-list">
                    <div class="tense-item" data-id="noun_plural_vowel"><div class="tense-name"><span class="icon">🔵</span> На гласную</div><div class="tense-description">+ k (a→ák, e→ék)</div></div>
                    <div class="tense-item" data-id="noun_plural_back"><div class="tense-name"><span class="icon">🟠</span> Задние + согл.</div><div class="tense-description">+ ok (искл: + ak)</div></div>
                    <div class="tense-item" data-id="noun_plural_front"><div class="tense-name"><span class="icon">🟢</span> Передние (e,é,i,í) + согл.</div><div class="tense-description">+ ek</div></div>
                    <div class="tense-item" data-id="noun_plural_front_round"><div class="tense-name"><span class="icon">🟣</span> Округлённые (ö,ő,ü,ű) + согл.</div><div class="tense-description">+ ök</div></div>
                </div></div>`;
            case 'accusative':
                return `<div class="tense-category"><div class="category-title"><span class="icon">🎯</span> Винительный падеж (-t) — Kit? Mit?</div><div class="tense-list">
                    <div class="tense-item" data-id="noun_acc_vowel"><div class="tense-name"><span class="icon">🔵</span> На гласную</div><div class="tense-description">+ t (a→át, e→ét)</div></div>
                    <div class="tense-item" data-id="noun_acc_special"><div class="tense-name"><span class="icon">🟡</span> На -l,-ly,-j,-n,-ny,-r,-s,-sz,-z</div><div class="tense-description">+ t (исключения!)</div></div>
                    <div class="tense-item" data-id="noun_acc_other"><div class="tense-name"><span class="icon">🔴</span> На другую согласную</div><div class="tense-description">+ ot/et/öt</div></div>
                </div></div>`;
            case 'locative':
                return `<div class="tense-category"><div class="category-title"><span class="icon">📍</span> Местонахождение — Hol?</div><div class="tense-list">
                    <div class="tense-item" data-id="noun_loc_inside"><div class="tense-name"><span class="icon">🏠</span> -ban / -ben (в)</div><div class="tense-description">Здания, страны вне Венгрии</div></div>
                    <div class="tense-item" data-id="noun_loc_surface"><div class="tense-name"><span class="icon">🏔️</span> -on / -en / -ön (на)</div><div class="tense-description">Открытые места, Венгрия</div></div>
                    <div class="tense-item" data-id="noun_loc_near"><div class="tense-name"><span class="icon">🤝</span> -nál / -nél (у)</div><div class="tense-description">У кого-то, рядом</div></div>
                </div></div>`;
            case 'possessive':
                return `<div class="tense-category"><div class="category-title"><span class="icon">👤</span> Притяжательные суффиксы</div><div class="tense-list">
                    <div class="tense-item" data-id="noun_poss_first"><div class="tense-name"><span class="icon">1️⃣</span> Мой (én)</div><div class="tense-description">-m, -om, -am, -em, -öm</div></div>
                    <div class="tense-item" data-id="noun_poss_second"><div class="tense-name"><span class="icon">2️⃣</span> Твой (te)</div><div class="tense-description">-d, -od, -ad, -ed, -öd</div></div>
                    <div class="tense-item" data-id="noun_poss_third"><div class="tense-name"><span class="icon">3️⃣</span> Его/Её (ő)</div><div class="tense-description">-a, -e, -ja, -je</div></div>
                </div></div>`;
            default: return '';
        }
    }

    renderExamples() {
        switch (this.activeSection) {
            case 'plural':
                return `<div class="example-header"><div class="example-icon">💡</div><div class="example-title">Примеры</div></div>
                    <ul class="example-list">
                        <li><div class="tense-name">alma → almák</div><div class="translation">яблоки</div></li>
                        <li><div class="tense-name">asztal → asztalok</div><div class="translation">столы</div></li>
                        <li><div class="tense-name">ember → emberek</div><div class="translation">люди</div></li>
                        <li><div class="tense-name">hat alma (НЕ almák)</div><div class="translation">после числ. — ед.ч.!</div></li>
                    </ul>`;
            case 'accusative':
                return `<div class="example-header"><div class="example-icon">💡</div><div class="example-title">Примеры</div></div>
                    <ul class="example-list">
                        <li><div class="tense-name">sonka → sonkát</div><div class="translation">ветчину</div></li>
                        <li><div class="tense-name">asztal → asztalt</div><div class="translation">стол</div></li>
                        <li><div class="tense-name">bolt → boltot</div><div class="translation">магазин</div></li>
                        <li><div class="tense-name">ez → ezt, az → azt</div><div class="translation">указательные</div></li>
                    </ul>`;
            case 'locative':
                return `<div class="example-header"><div class="example-icon">💡</div><div class="example-title">Примеры</div></div>
                    <ul class="example-list">
                        <li><div class="tense-name">A boltban vagyok.</div><div class="translation">Я в магазине.</div></li>
                        <li><div class="tense-name">Budapesten élek.</div><div class="translation">Я живу в Будапеште.</div></li>
                        <li><div class="tense-name">Barátomnál vagyok.</div><div class="translation">Я у друга.</div></li>
                    </ul>`;
            case 'possessive':
                return `<div class="example-header"><div class="example-icon">💡</div><div class="example-title">Примеры</div></div>
                    <ul class="example-list">
                        <li><div class="tense-name">házam, házad, háza</div><div class="translation">мой/твой/его дом</div></li>
                        <li><div class="tense-name">Anna asztala</div><div class="translation">стол Анны</div></li>
                        <li><div class="tense-name">a szobámban</div><div class="translation">в моей комнате</div></li>
                    </ul>`;
            default: return '';
        }
    }

    bindEvents() {
        const logo = this.element.querySelector('#voices-logo');
        if (logo) { logo.style.cursor = 'pointer'; logo.addEventListener('click', () => this.eventBus.emit('navigate:home')); }
        const navTabs = this.element.querySelectorAll('.nav-tab');
        navTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                if (index === 0) this.eventBus.emit('navigate:home');
                else if (index !== 2) { const t = ['algorithm','tenses','voices','conditionals','numerals']; this.eventBus.emit('carousel:change', { tab: t[index] }); }
            });
        });
        const timePoints = this.element.querySelectorAll('.time-point');
        timePoints.forEach(point => {
            point.addEventListener('click', () => {
                timePoints.forEach(p => p.classList.remove('active'));
                point.classList.add('active');
                this.activeSection = point.getAttribute('data-time');
                const cat = this.element.querySelector('.tense-categories');
                if (cat) cat.innerHTML = this.renderSection();
                const ex = this.element.querySelector('.quick-examples');
                if (ex) ex.innerHTML = this.renderExamples();
                this.bindEvents();
            });
        });
        const items = this.element.querySelectorAll('.tense-item[data-id]');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const id = item.getAttribute('data-id');
                if (id) this.eventBus.emit('navigate:tense-detail', { id });
            });
        });
    }

    setActiveTime(time) { this.activeSection = time; }
}

export default VoicesView;
