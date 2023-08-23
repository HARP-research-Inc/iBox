/**
 *? ._   ._     _      ____     ____
 *? ||   ||    /_\        \\       \\
 *? ||===||   // \\    ___//    ___//
 *? ||   ||  //   \\  ||  \\   ||
 *
 *? File: iBoxBase.js
 * Version: 1.3.0
 *? Author: Harper Chisari
 * Dependencies: None
 * Description: Base iBox component containing the core functionality of iBox, including rendering, theming, UID generation, expandable and collapsible features, and JSON configuration handling.
 * 
 * ?Class Definition: iBoxBase
 * 
 * ?Properties:
 * - parent: Reference to the DOM parent representing the iBox.
 * - json: JSON object containing configuration options for the iBox.
 * - uid: Unique identifier for the iBox instance.
 * - theme: Selected theme index for the iBox.
 * - isExpanded: Boolean indicating whether the iBox is expanded or collapsed.
 * - labelText: Text for the iBox label.
 * - colors: Array of predefined colors for the themes.
 * 
 * ?Constructor: (parent, json, initialize_box)
 * - Initializes the iBox with a given DOM parent, JSON configuration, and initialize_box flag, generates a UID, and sets properties.
 * 
 * ?Methods:
 * - generateUniqueUID(): Generates a unique identifier for the iBox.
 * - initialize(parent): Sets up the iBox, applies default settings, and renders initial label.
 * - createiBox(): Creates the HTML structure of the iBox and applies the theme.
 * - destroy(): Cleans up resources and removes the iBox from the DOM.
 * - renderLabel(): Updates the label of the iBox.
 * - applyTheme(): Applies the selected theme to the iBox.
 * - getThemeClass(themeIndex): Returns the corresponding theme class for the given theme index.
 * - expand(): Expands the iBox.
 * - collapse(): Collapses the iBox.
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
    constructor(parent, json = '{"default": {"name": "iBox", "theme": 1, "children": [], "isExpanded": false}}', initialize_box = true) {
        // Define the default JSON object
        console.log("CONSTRUCTOR: Building iBoxBase with JSON: " + json);
        this.handleJSON(json);

        console.log("CONSTRUCTOR: Updated JSON: " + JSON.stringify(this.json));

        // You can access properties from the JSON object as needed
        this.theme = this.json[this.uid].theme;
        this.isExpanded = this.json[this.uid].isExpanded;
        this.labelText = this.json[this.uid].name;

        // Colors 
        this.colors = ['#FF5733', '#AF7AC5', '#5499C7', '#48C9B0', '#F4D03F', '#F39C12', '#D35400', '#B3B6B7', '#2ECC71', '#E74C3C'];

        // Initialize with the JSON object
        if (initialize_box === true) {
            this.initialize(parent);
        }
    }

    handleJSON(json) {
        const defaultJsonObj = { "name": "iBox", "theme": 1, "children": [], "isExpanded": false };

        try {
            // Attempt to parse the JSON input
            const parsedJson = JSON.parse(json);
            const firstKey = Object.keys(parsedJson)[0];

            // Check if the first key starts with "UID_", and if so, generate a UID
            if (firstKey.startsWith('UID_')) {
                console.log("HANDLE JSON: Conatins existing UID: " + firstKey);
                this.uid = firstKey;
                this.json = { [firstKey]: { ...defaultJsonObj, ...parsedJson[firstKey] } };
            } else {
                this.uid = this.generateUniqueUID();
                console.log("HANDLE JSON: Doesn't contain valid UID, using generated UID: " + this.uid);
                this.json = { [this.uid]: { ...defaultJsonObj, ...parsedJson } };
            }
        } catch (e) {
            console.log("HANDLE JSON: Using default, failed to parse JSON: " + json);
            // If parsing fails, use the default JSON object
            this.uid = this.generateUniqueUID();
            this.json = { [this.uid]: defaultJsonObj };
        }
    }

    generateUniqueUID() {
        let uid;
        do {
            uid = 'UID_' + Math.random().toString(36).substr(2, 9);
        } while (document.getElementById(uid));

        return uid;
    }

    initialize(parent) {
        console.log("INITIALIZE: Building iBoxBase with JSON: " + JSON.stringify(this.json))
        window.iBoxMap.set(this.uid, this); // Store the iBox in the map
        // Set the parent property using the provided parent argument
        this.parent = typeof parent === 'string' ? document.querySelector(parent) : parent;

        // Modify this and the functoins within so it it takes in json, maybe add it as passed in parameters
        this.createiBox();      // Create the initial HTML structure.
        this.attatchIBox();     // Attach the iBox to the parent.

        // Modify this so it it takes in json color json if provided
        this.applyTheme(); // Apply theme after creating the HTML structure.
        this.renderLabel()      // Set initial Label
        if (this.isExpanded) { this.expand(); }          // Expand the iBox if it is set to expanded in the JSON
    }

    createiBox() {
        this.element = document.createElement('div');
        this.element.className = 'interactive-box';
        this.element.id = this.uid;
        this.element.innerHTML = `
        <div id="${this.uid}_children" class="ibox-children-container"></div>
        <button id="${this.uid}_collapse" class="collapse-button">-</button>
        <div class="corner-box">
            <div id="${this.uid}_handle" class="label-handle">
                <div class="drag-handle">
                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <span id="${this.uid}_name" class="label-span">${this.labelText}</span>
            </div>
        </div>
        <button id="${this.uid}_expand" class="expand-button">+</button>`;
    }

    attatchIBox() {
        console.log("ATTATCH IBOX: attaching current iBox to parent: ", this.parent);
        // Check if the parent is an 'ibox-container'
        if (this.parent.classList.contains('ibox-container')) {
            console.log("ATTATCH IBOX: Parent is ibox-container, appending to children container: ", this.parent);
            // Check if there's an ibox inside the parent
            const ibox = this.parent.querySelector('.interactive-box');
            if (ibox) {
                console.log("ATTATCH IBOX: Parent has ibox, creating a new iBox container and adding to grandparent: ", this.parent.parentElement);
                this.parent.parentElement.appendChild(this.createContainer());
            } else {
                console.log("ATTATCH IBOX: iBox-container has no ibox, appending to parent: ", this.parent);
                this.parent.appendChild(this.element);
            }
        }
        // Append the element directly to the parent if it's not an 'ibox-container'
        else {
            console.log("ATTATCH IBOX: Parent is not ibox-container, creating holder element and appending to parent: ", this.parent);
            const holderElement = this.createContainer();
            this.parent.appendChild(holderElement);
        }
    }

    createContainer() {
        console.log("CREATE CONTAINER: Creating container for element: ", this.element);
        const holderElement = document.createElement('div');
        holderElement.className = 'ibox-container';
        holderElement.appendChild(this.element);
        return holderElement;
    }
    renderLabel() {
        console.log("RENDER LABEL: Rendering label: ", this.labelText);
        const labelElement = this.element.querySelector('#' + this.uid + '_name');
        labelElement.textContent = this.labelText;
    }

    applyTheme() {
        console.log("APPLY THEME: Applying theme: ", this.theme);
        // Remove all existing theme classes
        this.element.classList.remove(
            'theme-blazing-sunset', 'theme-lavender-dream', 'theme-ocean-blue',
            'theme-mint-splash', 'theme-sunny-day', 'theme-golden-hour',
            'theme-autumn-rust', 'theme-steel', 'theme-emerald', 'theme-chili-red', 'theme-rainbow'
        );

        // Add the selected theme class
        const themeClass = this.getThemeClass(this.theme);
        this.element.classList.add(themeClass);
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

    destroy() {
        console.log("DESTROY: Destroying iBox: ", this.uid);
        // Remove the element from the DOM and its ibox container parent if it exists
        if (this.element.parentElement && this.element.parentElement.classList.contains('ibox-container')) {
            console.log("DESTROY: Parent is ibox-container, removing parent: ", this.element.parentElement);
            this.element.parentElement.remove();
        } else {
            console.log("DESTROY: Parent is not ibox-container, removing element: ", this.element);
            this.element.remove();
        }

        // Assuming uid is a property that holds the key for the Map entry
        window.iBoxMap.delete(this.uid);

        // Clear references to properties and methods to allow for garbage collection
        for (const key in this) {
            this[key] = null;
        }
    }


    expand() {
        this.element.classList.add('expanded');
        this.json[this.uid].isExpanded = true;
        this.isExpanded = true;
        console.log('EXPAND-: Expanded: ', this.uid);
    }

    collapse() {
        this.element.classList.remove('expanded');
        this.json[this.uid].isExpanded = false;
        this.isExpanded = false;
        console.log('COLLAPSE: Collapsed: ', this.uid);
    }

    update(json) {
        // Parse the JSON input
        const updatedJSON = JSON.parse(json);

        // Check if the theme has changed and update if necessary
        if (updatedJSON.theme !== undefined && updatedJSON.theme !== this.theme) {
            this.theme = updatedJSON.theme;
            this.applyTheme();
        }

        // Check if the label text has changed and update if necessary
        if (updatedJSON.name && updatedJSON.name !== this.labelText) {
            this.labelText = updatedJSON.name;
            this.renderLabel();
        }

        // Check if the expanded state has changed and update if necessary
        if (updatedJSON.isExpanded !== undefined && updatedJSON.isExpanded !== this.isExpanded) {
            this.isExpanded = updatedJSON.isExpanded;
            if (this.isExpanded) {
                console.log('UPDATE: Expanding');
                this.expand();
            } else {
                console.log('UPDATE: Collapsing');
                this.collapse();
            }
        }
    } //{"HELLO":["WORLD"]}


    getElement() {
        // Returns the DOM element representing the iBox.
        return this.element.querySelector('#' + this.uid);
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

// Define the global map outside of the class
window.iBoxMap = new Map();