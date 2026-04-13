import BaseView from './base-view.js';
import EventBus from '../utils/event-bus.js';

/**
 * CarouselView - представление для меню-карусели
 */
class CarouselView extends BaseView {
    /**
     * @param {string} elementId - ID DOM-элемента для меню
     */
    constructor(elementId) {
        super(elementId);
        this.eventBus = EventBus.getInstance();
        this.activeTab = null;
    }

    /**
     * Создание шаблона меню-карусели
     * @returns {string} HTML-шаблон меню
     */
    processTemplate() {
        return `
            <div class="carousel-tab" data-tab="algorithm">
                <div class="carousel-icon">🇭🇺</div>
                <div class="carousel-label">Алгоритм</div>
            </div>
            <div class="carousel-tab" data-tab="tenses">
                <div class="carousel-icon">🏃</div>
                <div class="carousel-label">Глаголы</div>
            </div>
            <div class="carousel-tab" data-tab="voices">
                <div class="carousel-icon">📦</div>
                <div class="carousel-label">Существительные</div>
            </div>
            <div class="carousel-tab" data-tab="conditionals">
                <div class="carousel-icon">🔤</div>
                <div class="carousel-label">Гармония</div>
            </div>
            <div class="carousel-tab" data-tab="numerals">
                <div class="carousel-icon">🔢</div>
                <div class="carousel-label">Числительные</div>
            </div>
        `;
    }

    /**
     * Привязка обработчиков событий
     */
    bindEvents() {
        const tabs = this.element.querySelectorAll('.carousel-tab');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                this.setActiveTab(tabName);
                this.eventBus.emit('carousel:change', { tab: tabName });
            });
        });
    }

    /**
     * Установка активной вкладки
     * @param {string} tabName - Имя вкладки
     */
    setActiveTab(tabName) {
        // Сначала снять выделение со всех вкладок
        const tabs = this.element.querySelectorAll('.carousel-tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Установить активную вкладку
        const activeTab = this.element.querySelector(`.carousel-tab[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
            this.activeTab = tabName;
        }
    }

    /**
     * Показать меню-карусель
     */
    showMenu() {
        this.element.classList.remove('hidden');
    }

    /**
     * Скрыть меню-карусель
     */
    hideMenu() {
        this.element.classList.add('hidden');
    }
}

export default CarouselView;