import BaseView from './base-view.js';
import EventBus from '../utils/event-bus.js';

class NumeralsView extends BaseView {
    constructor(elementId) {
        super(elementId);
        this.eventBus = EventBus.getInstance();
    }

    processTemplate(data = {}) {
        return `
            <div class="card fade-in">
                <header>
                    <div class="logo-small" id="numerals-logo">Magyar Gid</div>
                </header>

                <div class="nav-tabs">
                    <div class="nav-tab">🇭🇺 Алгоритм</div>
                    <div class="nav-tab">🏃 Глаголы</div>
                    <div class="nav-tab">📦 Существительные</div>
                    <div class="nav-tab">🔤 Гармония</div>
                    <div class="nav-tab active">🔢 Числительные</div>
                </div>

                <div class="card-title">Числительные (Számok)</div>
                <div class="card-description">
                    <p>Hány? Mennyi? — Сколько? После числительных существительное всегда в <strong>единственном числе</strong>: hat alma (шесть яблок).</p>
                </div>

                <div class="tense-categories fade-in delay-1">
                    <div class="tense-category">
                        <div class="category-title"><span class="icon">1️⃣</span> 0–10</div>
                        <div class="tense-list">
                            <div class="tense-item"><div class="tense-name">0 — nulla (null, zéró)</div><div class="tense-description">1 — egy</div></div>
                            <div class="tense-item"><div class="tense-name">2 — kettő / két</div><div class="tense-description">3 — három</div></div>
                            <div class="tense-item"><div class="tense-name">4 — négy</div><div class="tense-description">5 — öt</div></div>
                            <div class="tense-item"><div class="tense-name">6 — hat</div><div class="tense-description">7 — hét</div></div>
                            <div class="tense-item"><div class="tense-name">8 — nyolc</div><div class="tense-description">9 — kilenc</div></div>
                            <div class="tense-item"><div class="tense-name">10 — tíz</div><div class="tense-description"></div></div>
                        </div>
                    </div>
                </div>

                <div class="tense-categories fade-in delay-2">
                    <div class="tense-category">
                        <div class="category-title"><span class="icon">🔟</span> 11–19: tizen + единица</div>
                        <div class="tense-list">
                            <div class="tense-item"><div class="tense-name">11 — tizenegy</div><div class="tense-description">12 — tizenkettő</div></div>
                            <div class="tense-item"><div class="tense-name">13 — tizenhárom</div><div class="tense-description">14 — tizennégy</div></div>
                            <div class="tense-item"><div class="tense-name">15 — tizenöt</div><div class="tense-description">16 — tizenhat</div></div>
                            <div class="tense-item"><div class="tense-name">17 — tizenhét</div><div class="tense-description">18 — tizennyolc</div></div>
                            <div class="tense-item"><div class="tense-name">19 — tizenkilenc</div><div class="tense-description"></div></div>
                        </div>
                    </div>
                </div>

                <div class="tense-categories fade-in delay-3">
                    <div class="tense-category">
                        <div class="category-title"><span class="icon">🔢</span> Десятки</div>
                        <div class="tense-list">
                            <div class="tense-item"><div class="tense-name">20 — húsz</div><div class="tense-description">30 — harminc</div></div>
                            <div class="tense-item"><div class="tense-name">40 — negyven</div><div class="tense-description">50 — ötven</div></div>
                            <div class="tense-item"><div class="tense-name">60 — hatvan</div><div class="tense-description">70 — hetven</div></div>
                            <div class="tense-item"><div class="tense-name">80 — nyolcvan</div><div class="tense-description">90 — kilencven</div></div>
                        </div>
                    </div>
                </div>

                <div class="tense-categories fade-in delay-4">
                    <div class="tense-category">
                        <div class="category-title"><span class="icon">🧩</span> Составные числа</div>
                        <div class="tense-list">
                            <div class="tense-item"><div class="tense-name">21–29: huszon + единица</div><div class="tense-description">huszonegy (21), huszonkettő (22), huszonhárom (23)...</div></div>
                            <div class="tense-item"><div class="tense-name">30+: десяток + единица (слитно)</div><div class="tense-description">harmincegy (31), harmincöt (35), negyvenegy (41), negyvenkettő (42)...</div></div>
                        </div>
                    </div>
                </div>

                <div class="tense-categories fade-in delay-5">
                    <div class="tense-category">
                        <div class="category-title"><span class="icon">💯</span> Сотни, тысячи и выше</div>
                        <div class="tense-list">
                            <div class="tense-item"><div class="tense-name">100 — száz</div><div class="tense-description">200 — kétszáz, 300 — háromszáz...</div></div>
                            <div class="tense-item"><div class="tense-name">1 000 — ezer</div><div class="tense-description">2 000 — kétezer, 3 000 — háromezer...</div></div>
                            <div class="tense-item"><div class="tense-name">1 000 000 — millió</div><div class="tense-description">1 000 000 000 — milliárd</div></div>
                        </div>
                    </div>
                </div>

                <div class="quick-examples fade-in delay-5">
                    <div class="example-header"><div class="example-icon">💡</div><div class="example-title">Важные правила</div></div>
                    <ul class="example-list">
                        <li><div class="tense-name">kettő vs két</div><div class="translation">kettő — самостоятельно (Hány? — Kettő.), két — перед сущ-ным (két alma)</div></li>
                        <li><div class="tense-name">После числительных — ед.ч.!</div><div class="translation">hat alma (6 яблок), három város (3 города), sok ház (много домов)</div></li>
                        <li><div class="tense-name">Соединительная для 20+</div><div class="translation">húsz → huszon- (21–29), но harminc → harminc- (30+, без соединительной)</div></li>
                    </ul>
                </div>
            </div>

            <div class="footer">
                Magyar Gid | Числительные
            </div>
        `;
    }

    bindEvents() {
        const logo = this.element.querySelector('#numerals-logo');
        if (logo) { logo.style.cursor = 'pointer'; logo.addEventListener('click', () => this.eventBus.emit('navigate:home')); }
        const navTabs = this.element.querySelectorAll('.nav-tab');
        navTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                if (index === 0) this.eventBus.emit('navigate:home');
                else if (index !== 4) { const t = ['algorithm','tenses','voices','conditionals','numerals']; this.eventBus.emit('carousel:change', { tab: t[index] }); }
            });
        });
    }

    setActiveTime() {}
}

export default NumeralsView;
