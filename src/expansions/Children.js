/**
 * File: Children.js
 * Version: 1.0.0
 * Dependencies: iBoxBase (Inherits from the base iBox component)
 * Description: Child generation and JSON interaction functionality expansion for iBox.
 *              This module extends the base iBox component to enable child generation and interaction with JSON representations.
 * 
 * Class Definition: ChildrenBox (Inherits from iBoxBase)
 * 
 * Properties:
 * - children: Array containing child iBox instances.
 * - jsonRepresentation: JSON object representing the current state of children.
 * 
 * Constructor: (element, options)
 * - Initializes the ChildrenBox with a given DOM element and options, calling the base iBox constructor.
 * 
 * Methods:
 * - addChildBox(childOptions): Adds a new child iBox with specified options.
 * - removeChildBox(childId): Removes a child iBox by its unique identifier.
 * - parseJsonToInteractiveBoxes(json): Parses a given JSON object into interactive iBox children.
 * - updateJsonRepresentation(): Updates the JSON object representing the current state of children.
 * - renderChildren(): Renders the child iBoxes based on current state.
 * 
 * Utility Functions:
 * - generateChildUniqueId(): Generates a unique identifier for a new child iBox.
 * - validateChildJson(json): Validates a given JSON object for compatibility with child generation.
 * 
 * End of File Definition.
 */

/**
 * Class: ChildrenBox (Inherits from iBoxBase)
 * Description: Child generation and JSON interaction functionality expansion for iBox.
 */
class ChildrenBox extends window.iBoxBase {
  /**
   * Constructor: Initializes the ChildrenBox with a given DOM element and options.
   * @param {HTMLElement} element - DOM element to initialize the iBox.
   * @param {Object} options - Configuration options for the iBox.
   */
  constructor(element, options) {
    super(element, options);
    this.children = [];
    this.jsonRepresentation = options.json || {};
  }

  /**
   * Method: Adds a new child iBox with specified options.
   * @param {Object} childOptions - Configuration options for the new child iBox.
   */
  addChildBox(childOptions) {
    const childId = this.generateChildUniqueId();
    const child = new iBoxBase(this.element, {
      ...childOptions,
      id: childId,
    });
    this.children.push(child);
    this.updateJsonRepresentation();
    this.renderChildren();
  }

  /**
   * Method: Removes a child iBox by its unique identifier.
   * @param {string} childId - Unique identifier of the child to remove.
   */
  removeChildBox(childId) {
    this.children = this.children.filter((child) => child.id !== childId);
    this.updateJsonRepresentation();
    this.renderChildren();
  }

  /**
   * Method: Parses a given JSON object into interactive iBox children.
   * @param {Object} json - JSON object representing the children.
   */
  parseJsonToInteractiveBoxes(json) {
    if (this.validateChildJson(json)) {
      this.children = json.map((childJson) => new iBoxBase(this.element, childJson));
      this.updateJsonRepresentation();
    }
  }

  /**
   * Method: Updates the JSON object representing the current state of children.
   */
  updateJsonRepresentation() {
    this.jsonRepresentation = this.children.map((child) => child.toJson());
  }

  /**
   * Method: Renders the child iBoxes based on the current state.
   */
  renderChildren() {
    this.children.forEach((child) => {
      child.render();
    });
  }

  /**
   * Utility Function: Generates a unique identifier for a new child iBox.
   * @returns {string} Unique identifier for the child.
   */
  generateChildUniqueId() {
    return `child-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  /**
   * Utility Function: Validates a given JSON object for compatibility with child generation.
   * @param {Object} json - JSON object to validate.
   * @returns {boolean} True if the JSON object is valid, false otherwise.
   */
  validateChildJson(json) {
    // Add validation logic as needed, for example, checking for required properties.
    return Array.isArray(json) && json.every((item) => item.id && item.name);
  }
}

// Export the class for external usage
window.ChildrenBox = ChildrenBox;
