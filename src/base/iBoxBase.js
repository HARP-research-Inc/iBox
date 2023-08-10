/**
 * File: iBoxBase.js
 * Version: 1.3.0
 * Author: Harper Chisari
 * Dependencies: None specified (could be React, based on previous information)
 * Description: Base iBox component, containing the minimal functionality of the iBox with expandable and collapsible features and theming.
 * 
 * Class Definition: iBoxBase
 * 
 * Properties:
 * - element: Reference to the DOM element representing the iBox.
 * - colors: Array of predefined colors for the themes.
 * - theme: Selected theme index (1 to 11) for the iBox.
 * - defaultOptions: Object containing default configuration options for the iBox.
 * - options: Object containing merged configuration options for the iBox.
 * 
 * Constructor: (element, options = {}, theme = 1)
 * - Initializes the iBox with a given DOM element and options, and sets the theme.
 * 
 * Methods:
 * - initialize(): Sets up the iBox, applies default settings, and renders initial dimensions and label.
 * - createiBox(): Creates the HTML structure of the iBox and applies the theme.
 * - destroy(): Cleans up resources and removes the iBox from the DOM.
 * - renderDimensions(): Sets the width, height, and position of the iBox.
 * - renderLabel(): Updates the label of the iBox.
 * - applyTheme(): Applies the selected theme to the iBox.
 * - getThemeClass(themeIndex): Returns the corresponding theme class for the given theme index.
 * - update(options): Updates the iBox configuration with new options.
 * - resize(width, height): Resizes the iBox to the specified dimensions.
 * - move(x, y): Moves the iBox to the specified coordinates.
 * - enable(): Enables interactions with the iBox.
 * - disable(): Disables interactions with the iBox.
 * - addEventListener(event, handler): Adds an event listener for the specified event.
 * - removeEventListener(event, handler): Removes an event listener for the specified event.
 * 
 * End of File Definition.
 */

class iBoxBase {
    constructor(element, options = {}, theme = 1) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;

        // Colors
        this.colors = ['#FF5733', '#AF7AC5', '#5499C7', '#48C9B0', '#F4D03F', '#F39C12', '#D35400', '#B3B6B7', '#2ECC71', '#E74C3C'];
        this.theme = theme > 11 || theme < 1 ? 1 : theme;

        // Default options
        this.defaultOptions = {
            labelText: "iBox Label",
        };

        // Merge default options with provided options
        this.options = Object.assign({}, this.defaultOptions, options);

        this.initialize();
    }

    initialize() {
        this.createiBox();      // Create the initial HTML structure and apply theme.
        this.renderDimensions();  // Set initial dimensions.
        this.renderLabel()      // Set initial Label
    }

    createiBox() {
        this.element.innerHTML = `
        <div class="interactive-box ${this.options.isExpanded ? "expanded" : ""}">
        <div class="ibox-children-container"></div>
        <button class="collapse-button">-</button>
            <div class="corner-box">
                    <div class="label-handle">
                        <div class="drag-handle">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span class="label-span">${this.options.labelText}</span>
                    </div>
            </div>
            <button class="expand-button">+</button>
        </div>`; //Edit code so that if MANGO is entered it will rianbow

        this.applyTheme(); // Apply theme after creating the HTML structure.
    }

    destroy() {
        // Instead of removing the element, just clear its content
        this.element.innerHTML = '';
    }

    renderDimensions() {
        this.element.style.width = `${this.options.width}px`;
        this.element.style.height = `${this.options.height}px`;
        this.element.style.left = `${this.options.x}px`;
        this.element.style.top = `${this.options.y}px`;
    }    

    renderLabel() {
        const labelElement = this.element.querySelector('.label-span');
        labelElement.textContent = this.options.labelText;
    }

    applyTheme() {
        const interactiveBoxElement = this.element.querySelector('.interactive-box');
    
        // Remove all existing theme classes
        interactiveBoxElement.classList.remove(
            'theme-blazing-sunset', 'theme-lavender-dream', 'theme-ocean-blue',
            'theme-mint-splash', 'theme-sunny-day', 'theme-golden-hour',
            'theme-autumn-rust', 'theme-steel', 'theme-emerald', 'theme-chili-red', 'theme-rainbow'
        );
    
        // Add the selected theme class
        const themeClass = this.getThemeClass(this.theme);
        interactiveBoxElement.classList.add(themeClass);
    }
    
    getThemeClass(themeIndex) {
        const themeClasses = [
            'theme-blazing-sunset',
            'theme-lavender-dream',
            'theme-ocean-blue',
            'theme-mint-splash',
            'theme-sunny-day',
            'theme-golden-hour',
            'theme-autumn-rust',
            'theme-steel',
            'theme-emerald',
            'theme-chili-red',
            'theme-rainbow'
        ];
        return themeClasses[themeIndex - 1];
    }
    
    update(options) {
        // Updates the iBox configuration with new options.
        this.options = Object.assign({}, this.options, options);

        if (options.theme !== undefined) {
            this.theme = options.theme;
            this.applyTheme();
        }

        if (options.labelText) {
            this.renderLabel();
        }

        // Handle expanded class based on options
        const interactiveBoxElement = this.element.querySelector('.interactive-box');
        if (options.isExpanded) {
            interactiveBoxElement.classList.add('expanded');
        } else if (options.isExpanded === false) {
            interactiveBoxElement.classList.remove('expanded');
        }
    }

    resize(width, height) {
        // Resizes the iBox to the specified dimensions.
        this.options.width = width;
        this.options.height = height;
        this.render();
    }

    move(x, y) {
        // Moves the iBox to the specified coordinates.
        this.options.x = x;
        this.options.y = y;
        this.render();
    }

    enable() {
        // Enables interactions with the iBox.
        this.element.disabled = false;
    }

    disable() {
        // Disables interactions with the iBox.
        this.element.disabled = true;
    }

    addEventListener(event, handler) {
        // Adds an event listener for the specified event.
        this.element.addEventListener(event, handler);
    }

    removeEventListener(event, handler) {
        // Removes an event listener for the specified event.
        this.element.removeEventListener(event, handler);
    }
}

// Export the class for external usage
window.iBoxBase = iBoxBase;
