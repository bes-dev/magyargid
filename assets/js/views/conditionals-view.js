import BaseView from './base-view.js';
import EventBus from '../utils/event-bus.js';

class ConditionalsView extends BaseView {
    constructor(elementId) {
        super(elementId);
        this.eventBus = EventBus.getInstance();
    }

    processTemplate(data = {}) {
        return `
            <div class="card fade-in">
                <header>
                    <div class="logo-small" id="conditionals-logo">Magyar Gid</div>
                </header>

                <div class="nav-tabs">
                    <div class="nav-tab">🇭🇺 Алгоритм</div>
                    <div class="nav-tab">🏃 Глаголы</div>
                    <div class="nav-tab">📦 Существительные</div>
                    <div class="nav-tab active">🔤 Гармония гласных</div>
                </div>

                <div class="card-title">Гармония гласных (Magánhangzó-harmónia)</div>
                <div class="card-description">
                    <p>Ключевой принцип венгерского языка: суффиксы подстраиваются под гласные в слове.</p>
                </div>

                <div class="tense-categories fade-in delay-1">
                    <div class="tense-category">
                        <div class="category-title"><span class="icon">🟠</span> Задние гласные (Hátso)</div>
                        <div class="tense-list">
                            <div class="tense-item"><div class="tense-name">a, á, o, ó, u, ú</div><div class="tense-description">Суффиксы: -ban, -ok, -nak, -nál, -ot, -on...</div></div>
                        </div>
                    </div>
                    <div class="tense-category">
                        <div class="category-title"><span class="icon">🟢</span> Передние нелабиализованные (Elülső)</div>
                        <div class="tense-list">
                            <div class="tense-item"><div class="tense-name">e, é, i, í</div><div class="tense-description">Суффиксы: -ben, -ek, -nek, -nél, -et, -en...</div></div>
                        </div>
                    </div>
                    <div class="tense-category">
                        <div class="category-title"><span class="icon">🟣</span> Передние лабиализованные / округлённые (Ajakkerekítéses)</div>
                        <div class="tense-list">
                            <div class="tense-item"><div class="tense-name">ö, ő, ü, ű</div><div class="tense-description">Суффиксы: -ök, -öt, -ön... (но иногда -ek!)</div></div>
                        </div>
                    </div>
                </div>

                <div class="quick-examples fade-in delay-2">
                    <div class="example-header"><div class="example-icon">💡</div><div class="example-title">Сводная таблица суффиксов</div></div>
                    <ul class="example-list">
                        <li><div class="tense-name">Мн. число (-k):</div><div class="translation">-ok / -ek / -ök | на гласную: -k (a→á, e→é)</div></li>
                        <li><div class="tense-name">Вин. падеж (-t):</div><div class="translation">-ot / -et / -öt | на гласную/спец.согл.: -t</div></li>
                        <li><div class="tense-name">Внутри (-ban/-ben):</div><div class="translation">задние → -ban | передние → -ben</div></li>
                        <li><div class="tense-name">На (-on/-en/-ön):</div><div class="translation">задние → -on | передние → -en | округл. → -ön</div></li>
                        <li><div class="tense-name">У (-nál/-nél):</div><div class="translation">задние → -nál | передние → -nél</div></li>
                        <li><div class="tense-name">Спряжение Én:</div><div class="translation">-ok / -ek / -ök</div></li>
                        <li><div class="tense-name">Спряжение Ők:</div><div class="translation">-nak / -nek</div></li>
                    </ul>
                </div>

                <div class="tense-categories fade-in delay-3">
                    <div class="tense-category">
                        <div class="category-title"><span class="icon">📌</span> Важные правила</div>
                        <div class="tense-list">
                            <div class="tense-item"><div class="tense-name">Удлинение -a → -á, -e → -é</div><div class="tense-description">Всегда перед суффиксами: alma → almák, körte → körték</div></div>
                            <div class="tense-item"><div class="tense-name">Порядок суффиксов</div><div class="tense-description">основа + мн.ч. + притяж. + падеж (падеж ВСЕГДА в конце)</div></div>
                            <div class="tense-item"><div class="tense-name">После числительных</div><div class="tense-description">Существительное в ед.ч.: hat alma (6 яблок), sok ház (много домов)</div></div>
                            <div class="tense-item"><div class="tense-name">Указательные местоимения</div><div class="tense-description">Двойная маркировка: ebben a házBAN, ezen az asztalON</div></div>
                            <div class="tense-item"><div class="tense-name">Союзы</div><div class="tense-description">és/meg (и), is (тоже), de (но), pedig (а), hanem (а не), ha (если)</div></div>
                            <div class="tense-item"><div class="tense-name">Послелоги (Hol?)</div><div class="tense-description">alatt (под), fölött (над), mellett (возле), előtt (перед), mögött (за), között (между), körül (вокруг)</div></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer">
                Magyar Gid | Гармония гласных
            </div>
        `;
    }

    bindEvents() {
        const logo = this.element.querySelector('#conditionals-logo');
        if (logo) { logo.style.cursor = 'pointer'; logo.addEventListener('click', () => this.eventBus.emit('navigate:home')); }
        const navTabs = this.element.querySelectorAll('.nav-tab');
        navTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                if (index === 0) this.eventBus.emit('navigate:home');
                else if (index !== 3) { const t = ['algorithm','tenses','voices','conditionals']; this.eventBus.emit('carousel:change', { tab: t[index] }); }
            });
        });
    }

    setActiveTime() {}
}

export default ConditionalsView;
