import Storage from './utils/storage.js';

/**
 * Store - хранилище состояния приложения
 */
class Store {
    constructor() {
        this.state = {
            algorithm: 'hungarian-guide',
            currentStepId: null,
            history: [],
            userChoices: {},
            activeTab: 'algorithm',
            
            // Состояние для практики
            practiceConfig: null,
            practiceTasks: [],
            practiceProgress: {
                currentTask: 0,
                answers: []
            }
        };

        // Загрузка состояния из localStorage, если оно есть
        this.loadState();
    }

    static getInstance() {
        if (!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }

    /**
     * Обновление состояния
     * @param {object} newState - Новые данные для состояния
     * @returns {object} Обновленное состояние
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.saveState();
        return this.state;
    }

    /**
     * Получение текущего состояния
     * @returns {object} Текущее состояние
     */
    getState() {
        return this.state;
    }

    /**
     * Установка используемого алгоритма
     * @param {string} algorithmId - Идентификатор алгоритма
     */
    setAlgorithm(algorithmId) {
        this.setState({ algorithm: algorithmId });
    }

    /**
     * Установка текущего шага
     * @param {string} stepId - Идентификатор шага
     */
    setCurrentStep(stepId) {
        // Добавление текущего шага в историю
        const history = [...this.state.history];

        // Если в истории уже есть этот шаг, обрезаем историю до него
        const stepIndex = history.indexOf(stepId);
        if (stepIndex >= 0) {
            history.splice(stepIndex + 1);
        } else {
            // Иначе добавляем шаг в историю
            history.push(stepId);
        }

        this.setState({
            currentStepId: stepId,
            history
        });
    }

    /**
     * Сохранение выбора пользователя
     * @param {string} stepId - Идентификатор шага
     * @param {string} choice - Выбор пользователя
     */
    setUserChoice(stepId, choice) {
        const userChoices = { ...this.state.userChoices, [stepId]: choice };
        this.setState({ userChoices });
    }

    /**
     * Получение предыдущего шага из истории
     * @returns {string|null} Идентификатор предыдущего шага или null
     */
    getPreviousStep() {
        const { history } = this.state;
        if (history.length <= 1) {
            return null;
        }

        // Возврат предыдущего шага
        return history[history.length - 2];
    }

    /**
     * Загрузка состояния из localStorage
     */
    loadState() {
        const savedState = Storage.load('hungarian-guide-state');
        if (savedState) {
            this.state = savedState;
        }
    }

    /**
     * Сохранение состояния в localStorage
     */
    saveState() {
        Storage.save('hungarian-guide-state', this.state);
    }

    /**
     * Очистка состояния (сброс)
     */
    clearState() {
        this.state = {
            algorithm: this.state.algorithm,
            currentStepId: null,
            history: [],
            userChoices: {},
            activeTab: this.state.activeTab,
            
            // Сохраняем данные практики
            practiceConfig: this.state.practiceConfig,
            practiceTasks: this.state.practiceTasks,
            practiceProgress: this.state.practiceProgress
        };
        this.saveState();
    }
    
    /**
     * Установка активной вкладки
     * @param {string} tabId - Идентификатор вкладки
     */
    setActiveTab(tabId) {
        this.setState({ activeTab: tabId });
    }
    
    /**
     * Получение активной вкладки
     * @returns {string} Идентификатор активной вкладки
     */
    getActiveTab() {
        return this.state.activeTab;
    }
    
    /* Методы для работы с практикой */
    
    /**
     * Установка конфигурации практики
     * @param {Object} config - Конфигурация практики
     */
    setPracticeConfig(config) {
        this.setState({ practiceConfig: config });
    }
    
    /**
     * Получение конфигурации практики
     * @returns {Object} Конфигурация практики
     */
    getPracticeConfig() {
        return this.state.practiceConfig;
    }
    
    /**
     * Установка заданий для практики
     * @param {Array} tasks - Массив заданий
     */
    setPracticeTasks(tasks) {
        this.setState({ practiceTasks: tasks });
    }
    
    /**
     * Получение заданий для практики
     * @returns {Array} Массив заданий
     */
    getPracticeTasks() {
        return this.state.practiceTasks;
    }
    
    /**
     * Очистка прогресса практики
     * Сбрасывает текущее задание и ответы
     */
    clearPracticeProgress() {
        const practiceProgress = {
            currentTask: 0,
            answers: []
        };
        this.setState({ practiceProgress });
    }
    
    /**
     * Получение прогресса практики
     * @returns {Object} Прогресс практики
     */
    getPracticeProgress() {
        return this.state.practiceProgress;
    }
    
    /**
     * Сохранение ответа пользователя
     * @param {Object} answerData - Данные ответа (taskId, optionId, isCorrect)
     */
    saveAnswer(answerData) {
        const { practiceProgress } = this.state;
        const answers = [...practiceProgress.answers];
        
        // Добавление или обновление ответа для текущего задания
        answers[practiceProgress.currentTask] = answerData;
        
        const updatedProgress = {
            ...practiceProgress,
            answers
        };
        
        this.setState({ practiceProgress: updatedProgress });
    }
    
    /**
     * Переход к следующему заданию
     */
    nextTask() {
        const { practiceProgress } = this.state;
        
        // Увеличение индекса текущего задания
        const updatedProgress = {
            ...practiceProgress,
            currentTask: practiceProgress.currentTask + 1
        };
        
        this.setState({ practiceProgress: updatedProgress });
    }
}

export default Store;