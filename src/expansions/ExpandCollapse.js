/**
 * ExpandCollapse iBox (Inherits iBoxBase)
 *
 * Enables the expand and collapse functionality in the iBox component.
 * Users can toggle the state of the iBox through expand and collapse buttons.
 * This class enhances the base iBox with only the expand and collapse
 * features, without integrating other functionalities.
 Pseudocode:
 Class Definition: ExpandCollapse

Properties:

isExpanded: A boolean to track whether the content is currently expanded or collapsed.
expandableContent: A reference to the content area that can be expanded or collapsed.
triggerElement: An element that may be used to toggle the expanded/collapsed state.
Methods:

constructor: Initialize the base properties and setup expand/collapse-related properties.

Input: iBoxBase instance or properties needed to create one, configuration for expandable area.
Action: Initialize the base iBox and set up expand/collapse-related properties.
expand: Expand the content area.

Action: Set isExpanded to true, adjust the content area size and apply styling as needed.
collapse: Collapse the content area.

Action: Set isExpanded to false, adjust the content area size and apply styling as needed.
toggle: Toggle the expanded/collapsed state.

Action: Calls expand or collapse based on the current isExpanded state.
isExpandable: Check if the box content is currently expandable (e.g., not locked or disabled).

Output: Returns a boolean indicating whether the content area can be expanded or collapsed.
onExpand: Optional event handler that's called when the content is expanded.

Action: Custom actions or event propagation when the content is expanded.
onCollapse: Optional event handler that's called when the content is collapsed.

Action: Custom actions or event propagation when the content is collapsed.
End of Class Definition.
 */

class ExpandCollapseIBox extends iBoxBase {
  constructor(element, options = {}) {
      super(element, options); // Initialize the base class

      // Define properties for expand/collapse functionality
      this.isExpanded = true;
      this.expandableContent = this.element.querySelector('.ibox-children-container');
      this.expandButton = this.element.querySelector('.expand-button');
      this.collapseButton = this.element.querySelector('.collapse-button');

      // Add click event listeners
      this.expandButton.addEventListener('click', () => this.expand());
      this.collapseButton.addEventListener('click', () => this.collapse());
  }

  expand() {
      if (this.isExpandable()) {
          this.expandableContent.style.display = 'block';
          this.isExpanded = true;
          this.onExpand();
      }
  }

  collapse() {
      if (this.isExpandable()) {
          this.expandableContent.style.display = 'none';
          this.isExpanded = false;
          this.onCollapse();
      }
  }

  toggle() {
      if (this.isExpanded) {
          this.collapse();
      } else {
          this.expand();
      }
  }

  isExpandable() {
      // For now, let's assume it's always expandable. Later, you can add conditions.
      return true;
  }

  onExpand() {
      // Optional event handler that's called when the content is expanded.
      // Add custom logic or event propagation when the content is expanded.
  }

  onCollapse() {
      // Optional event handler that's called when the content is collapsed.
      // Add custom logic or event propagation when the content is collapsed.
  }
}

// Export the class for external usage
window.ExpandCollapseIBox = ExpandCollapseIBox;

Good, now please update the following based on that: ### File Structure:

```mathematica
iBox
│
├── src
│   ├── base
│   │   ├── iBoxBase.js
│   │   └── styles.css
│   │
│   ├── expansions
│   │   ├── Draggable.js
│   │   ├── Resizable.js
│   │   ├── Editable.js
│   │   └── ExpandCollapse.js
│   │
│   ├── components
│   │   └── iBoxComplete.js
│   │
│   ├── utils
│   │   ├── constants.js
│   │   └── helpers.js
│   │
│   └── index.js
│
├── test
│   ├── iBoxBase.test.js
│   ├── Draggable.test.js
│   ├── Resizable.test.js
│   ├── Editable.test.js
│   ├── ExpandCollapse.test.js
│   └── iBoxComplete.test.js
│
├── examples
│   ├── baseExample.html
│   ├── draggableExample.html
│   ├── resizableExample.html
│   ├── editableExample.html
│   ├── expandCollapseExample.html
│   └── completeExample.html
│
├── package.json
│
└── README.md
```

* `base` (Base Component Folder)
  * `iBoxBase.js`: Base iBox component, containing the minimal functionality and rendering of the iBox without any expansions.
  * `styles.css`: Base styling for the iBox component.
* `expansions` (Functionality Expansions Folder)
  * `Draggable.js`: Draggable functionality expansion.
  * `Resizable.js`: Resizable functionality expansion.
  * `Editable.js`: Editable functionality expansion.
  * `ExpandCollapse.js`: Expand and collapse functionality expansion.
* `components` (Complete Components Folder)
  * `iBoxComplete.js`: Culminating class that includes all previous functionality, integrating the base and all expansions.
* `utils` (Utilities Folder)
  * `constants.js`: Constants and configurations.
  * `helpers.js`: Helper functions to support main components.
* `index.js`: Entry point for the package/library.

#### 2. `test` (Test Folder)

* `iBoxBase.test.js`: Jest unit tests for the base iBox component.
* `Draggable.test.js`: Jest unit tests for the draggable functionality.
* `Resizable.test.js`: Jest unit tests for the resizable functionality.
* `Editable.test.js`: Jest unit tests for the editable functionality.
* `ExpandCollapse.test.js`: Jest unit tests for the expand/collapse functionality.
* `iBoxComplete.test.js`: Jest integration tests for the complete iBox component.

#### 3. `examples` (Examples Folder)

* `baseExample.html`: Example HTML file to test and interact with the base iBox component.
* `draggableExample.html`: Example HTML file to test and interact with the draggable functionality.
* `resizableExample.html`: Example HTML file to test and interact with the resizable functionality.
* `editableExample.html`: Example HTML file to test and interact with the editable functionality.
* `expandCollapseExample.html`: Example HTML file to test and interact with the expand/collapse functionality.
* `completeExample.html`: Example HTML file to test and interact with the complete iBox component.

#### 4. `package.json`: Lists dependencies and scripts for the project.

#### 5. `README.md`: Documentation for the project.

### Dependencies:

* **React** : For building the component.
* **Styled-Components** : For styling.
* **Jest** : For testing.
* **React-Draggable** : If the native drag functionality is not sufficient, this library can be used for drag handling.

### Expected Output:

* **Base iBox Component** : The minimal iBox structure and functionality.
* **Functional Expansions** : Individual functionality extensions such as draggability, resizability, editability, etc.
* **Complete iBox Component** : A fully functional iBox with all expansions integrated.
* **Test Files** : Test HTML files will render the associated components or functionalities, allowing manual interaction.