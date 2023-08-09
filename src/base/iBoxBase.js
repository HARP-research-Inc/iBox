/**
 * File: iBoxBase.js
 * Version: 1.2.0
 * Dependencies: None specified (could be React, based on previous information)
 * Description: Base iBox component, containing the minimal functionality of the iBox without any expansions.
 * 
 * Class Definition: iBoxBase
 * 
 * Properties:
 * - element: Reference to the DOM element representing the iBox.
 * - options: Object containing configuration options for the iBox.
 * - themes: Array of theme objects containing styling information.
 * 
 * Constructor: (element, options)
 * - Initializes the iBox with a given DOM element and options.
 * 
 * Methods:
 * - initialize(): Sets up the iBox, applies default settings.
 * - createiBox(): Creates the HTML structure of the iBox and applies the theme.
 * - destroy(): Cleans up resources and removes the iBox from the DOM.
 * - update(options): Updates the iBox configuration with new options.
 * - renderDimensions(): Sets the width, height, and position of the iBox.
 * - renderLayout(): Adjusts layout properties like min-width based on the content.
 * - renderLabel(): Updates the label of the iBox.
 * - applyTheme(): Applies the selected theme to the iBox.
 * 
 * Utility Functions:
 * - None specified in this version. (If there are any utility functions or helpers specific to the iBoxBase class, they can be added here.)
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
            width: 235,
            height: 200,
            x: 0,
            y: 0,
            labelText: "iBox Label",
            isExpanded: true
        };

        // Merge default options with provided options
        this.options = Object.assign({}, this.defaultOptions, options);

        this.initialize();
    }

    initialize() {
        this.createiBox();      // Create the initial HTML structure and apply theme.
        this.renderDimensions();  // Set initial dimensions.
        this.renderLayout();     // Set initial layout.
        this.renderLabel()      // Set initial Label
    }

    createiBox() {
        this.themes = [
            {
                name: "Blazing Sunset",
                primary: '#FF5733',
                secondary: '#FFD1C4',
                tertiary: '#c72200'
            },
            {
                name: "Lavender Dream",
                primary: '#AF7AC5',
                secondary: '#E4D4E9',
                tertiary: '#8D5CA2'
            },
            {
                name: "Ocean Blue",
                primary: '#5499C7',
                secondary: '#C2D8E8',
                tertiary: '#3C7BA8'
            },
            {
                name: "Mint Splash",
                primary: '#48C9B0',
                secondary: '#B9E5D8',
                tertiary: '#319F8C'
            },
            {
                name: "Sunny Day",
                primary: '#F4D03F',
                secondary: '#FAEABD',
                tertiary: '#D1B72B'
            },
            {
                name: "Golden Hour",
                primary: '#F39C12',
                secondary: '#F9D7A1',
                tertiary: '#D58506'
            },
            {
                name: "Autumn Rust",
                primary: '#D35400',
                secondary: '#EFA980',
                tertiary: '#B04300'
            },
            {
                name: "Steel",
                primary: '#B3B6B7',
                secondary: '#E1E3E3',
                tertiary: '#8D9091'
            },
            {
                name: "Emerald",
                primary: '#2ECC71',
                secondary: '#A9E5B8',
                tertiary: '#29B65A'
            },
            {
                name: "Chili Red",
                primary: '#E74C3C',
                secondary: '#F6B8B1',
                tertiary: '#CF3929'
            },
            {
                name: "Secret",
                primary: 'rainbow', // A special value to identify the rainbow theme
                secondary: 'rainbow-secondary',
                tertiary: 'rainbow-tertiary'
            }
        ];
        //let colors = ['#FF5733', '#AF7AC5', '#5499C7', '#48C9B0', '#F4D03F', '#F39C12', '#D35400', '#B3B6B7', '#2ECC71', '#E74C3C'];

        this.element.innerHTML = `
        <div class="interactive-box ${this.options.isExpanded ? "expanded" : ""}">
        <div class="ibox-children-container"></div>
            <div class="corner-box">
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
                <button class="expand-button">+</button>
            </div>
            <button class="collapse-button">-</button>
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

    renderLayout() {
        const cornerBox = this.element.querySelector('.corner-box');
        const labelTextWidth = this.element.querySelector('.label-span').offsetWidth;
        const expandButtonWidth = this.element.querySelector('.expand-button').offsetWidth;
        const collapseButtonWidth = this.element.querySelector('.collapse-button').offsetWidth;
    
        const paddingAndBorders = 30;
    
        if (this.options.isExpanded) {
            const expandedWidth = labelTextWidth + expandButtonWidth + paddingAndBorders;
            cornerBox.style.minWidth = `${Math.max(80, expandedWidth)}px`;
            this.element.querySelector('.interactive-box').style.minWidth = `${expandedWidth + collapseButtonWidth + 108}px`;
        } else {
            this.element.querySelector('.interactive-box').style.minWidth = `${cornerBox.offsetWidth}px`;
            cornerBox.style.minWidth = `${Math.max(225, labelTextWidth + expandButtonWidth)}px`;
        }
    
        const interactiveBoxWidth = this.element.querySelector('.interactive-box').offsetWidth;
        const childrenContainer = this.element.querySelector('.ibox-children-container');
        childrenContainer.style.minWidth = `${Math.max(interactiveBoxWidth, 225)}px`;
    
        // Adjust the height of the ibox-children-container based on the corner-box height
        const cornerBoxHeight = cornerBox.offsetHeight;
        childrenContainer.style.padding = `${5}px`;
        childrenContainer.style.paddingTop = `${cornerBoxHeight}px`;
    }

    renderLabel() {
        const labelElement = this.element.querySelector('.label-span');
        labelElement.textContent = this.options.labelText;
    }

    applyTheme() {
        const themeColors = this.themes[this.theme - 1];
        const interactiveBoxElement = this.element.querySelector('.interactive-box');

        if (themeColors.primary === 'rainbow') {
            interactiveBoxElement.classList.add('rainbow');
            interactiveBoxElement.style.setProperty('--selected-secondary-color', '#000000');
            interactiveBoxElement.style.setProperty('--selected-tertiary-color', '#FFFFFF');
            interactiveBoxElement.style.setProperty('border', '2px solid #000000');
            interactiveBoxElement.style.setProperty('background', '2px solid #000000');
        } else {
            interactiveBoxElement.classList.remove('rainbow');
            interactiveBoxElement.style.setProperty('--selected-primary-color', themeColors.primary);
            interactiveBoxElement.style.setProperty('--selected-secondary-color', themeColors.secondary);
            interactiveBoxElement.style.setProperty('--selected-tertiary-color', themeColors.tertiary);
        }
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

        this.renderDimensions();
        this.renderLayout();
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
