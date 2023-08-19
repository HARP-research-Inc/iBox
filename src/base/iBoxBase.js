/**
 *? ._   ._     _      ____     ____
 *? ||   ||    /_\        \\       \\
 *? ||===||   // \\    ___//    ___//
 *? ||   ||  //   \\  ||       ||
 *
 *? File: iBoxBase.js
 * Version: 1.3.0
 *? Author: Harper Chisari
 * Dependencies: None
 * Description: Base iBox component, containing the minimal functionality of the iBox with expandable and collapsible features, theming, and unique identifier (UID) generation.
 * 
 * ?Class Definition: iBoxBase
 * 
 * ?Properties:
 * - element: Reference to the DOM element representing the iBox.
 * - json: JSON object containing configuration options for the iBox.
 * - uid: Unique identifier for the iBox instance.
 * - theme: Selected theme index (1 to 11) for the iBox.
 * - isExpanded: Boolean indicating whether the iBox is expanded or collapsed.
 * - labelText: Text for the iBox label.
 * - colors: Array of predefined colors for the themes.
 * 
 * ?Constructor: (element, json = '{"default": {"name": "iBox Label", "theme": 1, "children": {}, "isExpanded": false}}')
 * - Initializes the iBox with a given DOM element and JSON configuration, generates a UID, and sets properties.
 * 
 * ?Methods:
 * - initialize(): Sets up the iBox, applies default settings, and renders initial label.
 * - createiBox(): Creates the HTML structure of the iBox and applies the theme.
 * - destroy(): Cleans up resources and removes the iBox from the DOM.
 * - renderLabel(): Updates the label of the iBox.
 * - applyTheme(): Applies the selected theme to the iBox.
 * - getThemeClass(themeIndex): Returns the corresponding theme class for the given theme index.
 * - update(json): Updates the iBox configuration with new JSON options.
 * - move(x, y): Moves the iBox to the specified coordinates.
 * - enable(): Enables interactions with the iBox.
 * - disable(): Disables interactions with the iBox.
 * - addEventListener(event, handler): Adds an event listener for the specified event.
 * - removeEventListener(event, handler): Removes an event listener for the specified event.
 * 
 * End of File Definition.
 */


class iBoxBase {
    constructor(element, json = '{"default": {"name": "iBox", "theme": 1, "children": [], "isExpanded": false}}', initialize_box = true) {
        // Define the default JSON object
        console.log("CONSTRUCTOR: Building iBoxBase with JSON: " + json);
        const defaultJsonObj = { "name": "iBox", "theme": 1, "children": [], "isExpanded": false };
      
        try {
          // Attempt to parse the JSON input
          const parsedJson = JSON.parse(json);
          const firstKey = Object.keys(parsedJson)[0];
      
          // Check if the first key is "name", and if so, generate a UID
          if (firstKey === 'name') {
            this.uid = this.generateUniqueUID();
            this.json = { [this.uid]: { ...defaultJsonObj, ...parsedJson } };
          } else {
            this.uid = firstKey;
            this.json = { [firstKey]: { ...defaultJsonObj, ...parsedJson[firstKey] } };
          }
        } catch (e) {
          console.log("CONSTRUCTOR: Failed to parse JSON: " + json);
          // If parsing fails, use the default JSON object
          this.uid = this.generateUniqueUID();
          this.json = { [this.uid]: defaultJsonObj };
        }
      
        console.log("CONSTRUCTOR: Updated JSON: " + JSON.stringify(this.json));
      
        // You can access properties from the JSON object as needed
        this.theme = this.json[this.uid].theme;
        this.isExpanded = this.json[this.uid].isExpanded;
        this.labelText = this.json[this.uid].name;
      
        // Colors 
        this.colors = ['#FF5733', '#AF7AC5', '#5499C7', '#48C9B0', '#F4D03F', '#F39C12', '#D35400', '#B3B6B7', '#2ECC71', '#E74C3C'];

        // Initialize with the JSON object
        if (initialize_box === true) {
            this.initialize(element);
        }
    }    

    generateUniqueUID() {
        let uid;
        do {
            uid = 'UID_' + Math.random().toString(36).substr(2, 9);
        } while (document.getElementById(uid));

        return uid;
    }

    initialize(element) {
        console.log("INITIALIZE: Building iBoxBase with JSON: " + JSON.stringify(this.json))
        // Set the element property using the provided element argument
        this.element = typeof element === 'string' ? document.querySelector(element) : element;

        // Modify this and the functoins within so it it takes in json, maybe add it as passed in parameters
        this.createiBox();      // Create the initial HTML structure and apply theme.

        const interactiveBoxElement = this.element.querySelector('#' + this.uid);
        
        // Modify this so it it takes in json color json if provided
        this.applyTheme(interactiveBoxElement); // Apply theme after creating the HTML structure.
        this.renderLabel(interactiveBoxElement)      // Set initial Label
        if (this.isExpanded) {this.expand();}          // Expand the iBox if it is set to expanded in the JSON
    }

    createiBox() {
        this.element.innerHTML = `
        <div id="${this.uid}" class="interactive-box">
        <div id="${this.uid}_children" class="ibox-children-container"></div>
        <button id="${this.uid}_collapse" class="collapse-button">-</button>
            <div class="corner-box">
                    <div id="${this.uid}_handle"  class="label-handle">
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
                        <span id="${this.uid}_name" class="label-span">${this.labelText}</span>
                    </div>
            </div>
            <button id="${this.uid}_expand" class="expand-button">+</button>
        </div>`; //Edit code so that if MANGO is entered it will rianbow

    }

    // modify so that it also modifies the json of the parent?
    destroy() {
        // Instead of removing the element, just clear its content
        this.element.innerHTML = '';
    }    

    renderLabel(interactiveBoxElement) {
        const labelElement = interactiveBoxElement.querySelector('#' + this.uid + '_name');
        labelElement.textContent = this.labelText;
    }

    applyTheme(interactiveBoxElement) {
    
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
    
    expand(){
        const interactiveBoxElement = this.element.querySelector('#' + this.uid);
        console.log('UPDATE: Expanded');
        interactiveBoxElement.classList.add('expanded');
        this.json[this.uid].isExpanded = true;
        this.isExpanded = true;
    }

    collapse(){
        const interactiveBoxElement = this.element.querySelector('#' + this.uid);
        console.log('UPDATE: Collapsed');
        interactiveBoxElement.classList.remove('expanded');
        this.json[this.uid].isExpanded = false;
        this.isExpanded = false;
    }

    update(json) {
        const interactiveBoxElement = this.element.querySelector('#' + this.uid);
        // Parse the JSON input
        const updatedJSON = JSON.parse(json);
    
        // Check if the theme has changed and update if necessary
        if (updatedJSON.theme !== undefined && updatedJSON.theme !== this.theme) {
            this.theme = updatedJSON.theme;
            this.applyTheme(interactiveBoxElement);
        }
    
        // Check if the label text has changed and update if necessary
        if (updatedJSON.name && updatedJSON.name !== this.labelText) {
            this.labelText = updatedJSON.name;
            this.renderLabel(interactiveBoxElement);
        }
    
        // Check if the expanded state has changed and update if necessary
        if (updatedJSON.isExpanded !== undefined && updatedJSON.isExpanded !== this.isExpanded) {
            this.isExpanded = updatedJSON.isExpanded;
            if (this.isExpanded) {
                console.log('UPDATE: Expanded');
                this.expand();
            } else {
                console.log('UPDATE: Collapsed');
                this.collapse();
            }
        }
    }//{"HELLO":["WORLD"]}

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
