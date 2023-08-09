/*File: iBoxBase.js
 Version: 1.0.0
 Dependencies: React
 Description: Base iBox component, containing the minimal functionality of the iBox without any expansions.
 Pseudo-Code:
 File: iBoxBase.js

 Class Definition: iBoxBase
 
 Properties:
 
 element: Reference to the DOM element representing the iBox.
 options: Object containing configuration options for the iBox.
 Constructor: (element, options)
 
 Initializes the iBox with a given DOM element and options.
 Methods:
 
 initialize(): Sets up the iBox, applies default settings, and initializes event listeners.
 render(): Renders the iBox according to its current state and options.
 destroy(): Cleans up resources and removes the iBox from the DOM.
 update(options): Updates the iBox configuration with new options.
 resize(width, height): Resizes the iBox to the specified dimensions.
 move(x, y): Moves the iBox to the specified coordinates.
 enable(): Enables interactions with the iBox.
 disable(): Disables interactions with the iBox.
 addEventListener(event, handler): Adds an event listener for the specified event.
 removeEventListener(event, handler): Removes an event listener for the specified event.
 Utility Functions:
 
 These could include any additional static functions or helpers specific to the iBoxBase class.
 End of File Definition.
*/
// File: iBoxBase.js
// Version: 1.0.0
// Dependencies: ../utils/Constants.js
// Description: Base iBox component, containing the minimal functionality of the iBox without any expansions.

class iBoxBase {
    constructor(element, options = {}) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        
        // Default options
        this.defaultOptions = {
            width: 235,
            height: 200,
            x: 0,
            y: 0
        };

        // Merge default options with provided options
        this.options = Object.assign({}, this.defaultOptions, options);
        this.initialize();
    }

    initialize() {
        // Sets up the iBox, applies default settings, and initializes event listeners.
        this.createiBox();
        this.render();
    }

    createiBox() {
        this.element.innerHTML = `
            <div class="interactive-box">
                <div class="corner-box">
                    <span class="label-span">iBox Label</span>
                    <button class="expand-button">+</button> <!-- The Expand Button inside corner box -->
                </div>
                <button class="collapse-button">-</button> <!-- The Collapse Button outside corner box -->
                <div class="ibox-children-container">
                    <!-- Content to be shown/hidden during expand/collapse will go here -->
                </div>
            </div>
        `;
    }

    render() {
        // Renders the iBox according to its current state and options.
        this.element.style.width = `${this.options.width}px`;
        this.element.style.height = `${this.options.height}px`;
        this.element.style.position = 'absolute';
        this.element.style.left = `${this.options.x}px`;
        this.element.style.top = `${this.options.y}px`;

        // Adjust the height of the ibox-children-container
        const cornerBoxHeight = this.element.querySelector('.corner-box').offsetHeight;
        const childrenContainerContentHeight = Array.from(this.element.querySelector('.ibox-children-container').children).reduce((acc, child) => acc + child.offsetHeight, 0);

        const desiredHeight = Math.max(cornerBoxHeight + 10, childrenContainerContentHeight + 30);
        this.element.querySelector('.ibox-children-container').style.height = `${desiredHeight}px`;
    }

    destroy() {
        // Cleans up resources and removes the iBox from the DOM.
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    update(options) {
        // Updates the iBox configuration with new options.
        this.options = Object.assign({}, this.options, options);
        this.render();
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
