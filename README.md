# iBox Component

Interactive-Box (iBox): A modular, nestable component allowing for an editable visualization of a tree structure.

## Summary:

### Structure:

* **Backplate (div)** : The body in which the iBoxes are placed and manipulated.
* **Expanded State** :
  * **iBox (div)** : The base box component, which has the following child elements:
  * **Corner-Box (div)** : The area where the label of the box and the drag handle reside. This sits above any other contents in the top left corner.
  * **Drag Handle (div)** : The area where the user can click and drag to move the entire iBox.
  * **Label (span)** : Text which, when clicked, opens up a text entry field for the user to edit.
  * **Collapse Button (div)** : A "-" symbol in the top right corner that, when clicked, collapses the iBox.
  * **iBox (div, child)** : Another iBox nested within the parent iBox, allowing for a tree structure.
* **Collapsed State** :
  * **iBox (div)** : The base box in its collapsed state. It contains:
  * **Corner-Box (div)** : The area where the label of the box and the drag handle reside, above any other contents in the top left corner.
  * **Drag Handle (div)** : The area where the user can click and drag to move the entire iBox.
  * **Label (h element)** : Text which, when clicked, opens up a text entry field for the user to edit.
  * **Expand Button (div)** : A "+" symbol in the top right corner that, when clicked, expands the iBox.

### Behavior:

* **Resize** : The edges and the bottom right corner of the iBox can be dragged to resize it.
* **Move** : The drag handle can be used to move the iBox around within its parent container.
* **Edit** : The label text can be clicked on to open a text entry field. After pressing enter or clicking out, the label text will be updated and the width of the iBox will be adjusted accordingly.
* **Min Width** : The iBox has a minimum width of 103px plus the size of the corner box. This ensures that all elements within the iBox remain visible and accessible.
* **Expand/Collapse** : The iBox can be expanded and collapsed using the "+" or "-" buttons respectively. When collapsed, only the header (corner-box) is visible. When expanded, any child iBoxes become visible.
* **Animation** : The expansion and collapse of the iBox occur through smooth animations. The collapse animation reduces the size of the iBox until only the corner-box is visible. Conversely, the expand animation gradually increases the size of the iBox to reveal any nested child iBoxes.
* **Draggability** : Each iBox is draggable within its parent container. This allows users to rearrange the tree structure interactively. Draggability is enabled through the drag handle in the corner-box of each iBox.
* **Droppability** : Each iBox is droppable, meaning that other iBoxes can be dropped onto it. If an iBox is dropped onto another, it becomes a child of the iBox it was dropped onto. This allows users to dynamically nest the iBoxes and create a tree structure.
* **Child Generation** : An iBox can generate child iBoxes. This is achieved through the addChildBox() function in the iBox code. When this function is called, a new iBox is created and added to the parent iBox's childBoxes array. The new child iBox is then rendered within the parent iBox.
* **Visibility** : When an iBox is expanded, all of its child iBoxes become visible. When it is collapsed, all of its child iBoxes become hidden. This allows users to navigate through the tree structure by expanding and collapsing the iBoxes as needed. The visibility of child iBoxes is controlled through the collapse and expand buttons, and the state of the parent iBox.
* **Color Selection** : A predefined list of color templates is available for the user to choose from when creating an iBox. The user can select the desired color template from a dropdown menu or similar interface, and the selected color template will be applied to the iBox. The color templates define the colors used for the iBox's main body, header, and text.
* **JSON Representation** : When a child iBox is dropped into or added to a parent iBox, the parent iBox's JSON representation is updated to include the new child iBox. This JSON representation provides a structured, machine-readable description of the iBox hierarchy, and can be used to save and load the iBox structure.
* **Theme Application**: The iBox can have its visual appearance customized through predefined color themes. Themes can be applied based on user preferences.

### Interaction:

* **Click** : Clicking on the label text will open a text entry field that allows the user to edit the label. Clicking on the collapse or expand button will collapse or expand the iBox, respectively. Clicking anywhere else on the iBox will bring it to the front of the view.
* **Drag** : The user can click and drag the drag handle to move the iBox around within its parent container. The user can also drag the edges or bottom right corner of the iBox to resize it.
* **Drop** : If the user drags an iBox and drops it onto another, the dragged iBox will become a child of the iBox it was dropped onto.
* **Keyboard Input** : When the label text is being edited, the user can press enter to save the changes and update the label. If the user clicks outside of the text entry field, the changes will also be saved and the label updated.
* **Mouse Over** : When the user hovers the mouse over the collapse or expand button, the button will highlight to indicate that it is clickable. Similarly, when the user hovers over the drag handle or the edges of the iBox, the cursor will change to indicate that the iBox can be moved or resized.

## Heirarical Functionality:

Each iBox requires a JSON structure for its creation. This means that when you want to instantiate an iBox, you need to provide a JSON representation that defines the properties, content, children, and other attributes of the iBox. This JSON-centric approach ensures consistency in the representation and behavior of the iBoxes.

### Dynamic Child Addition:

When a new child iBox is desired to be added to a parent iBox, the parent iBox's JSON representation is first updated to include the new child iBox's JSON structure. Once the JSON is updated, the parent iBox reads the updated JSON and renders the new child iBox within itself. This ensures that the underlying JSON representation and the displayed hierarchy of iBoxes always stay in sync.

### Renaming Boxes:

If an iBox is renamed, the change is first reflected in its JSON representation. The key corresponding to that iBox in the parent's `childBoxes` array (or the root of the JSON if it's a primary iBox) is updated. After the JSON is updated, the display name of the iBox is changed to reflect the new name. This two-step process ensures data consistency between the displayed names and the underlying data structure.

### Children Expansion:

The `ChildrenBox` expansion significantly extends the `initialize` and `update` methods of the iBox. The `initialize` method is responsible for reading the provided JSON and constructing the iBox and its children as per the JSON structure. The `update` method listens for changes in the JSON representation and updates the display accordingly.

### JSON Retrieval:

Users can retrieve the JSON representation of any iBox using a method like `getJsonDescription()`. This method would return two versions of JSON:

1. **Themed JSON** : This includes both the original JSON structure and the theme information for each iBox. The theme information helps in maintaining the visual consistency and style of the iBox hierarchy.
2. **Pure JSON** : This is just the original JSON structure without any theme information. It represents the pure data hierarchy of the iBoxes without any styling metadata.

This JSON-centric architecture ensures that all operations on iBoxes, whether they're data-driven or UI-driven, are consistent, reliable, and easily reversible. By maintaining a clear separation between the data (JSON) and the UI (iBox rendering), the system ensures modularity and extensibility.

Based on the comprehensive description, we can break down the iBox component into modular classes and components, and then describe how these can be expanded into additional functionality. I'll outline this from the base elements to the final culminating class, considering testability with jest unit and integration testing.

## Considerations

### Performance and Scalability:

The iBox component, designed with modularity in mind, aims to be lightweight and responsive. However, as with any component, certain considerations are vital when scaling:

1. **Nested iBoxes** : As the nesting of iBoxes increases, the rendering complexity grows. Though the component handles a moderate number of nested boxes efficiently, it's essential to monitor performance when nesting becomes deep.

* **Recommendation** : Limit the depth of nesting or implement pagination or lazy loading for deeply nested structures.

2. **JSON Parsing** : The dynamic generation of iBoxes from JSON means recurrent parsing. Large and complex JSON structures might introduce a delay.

* **Recommendation** : Optimize the JSON structure, ensuring it's as concise as possible. Consider caching mechanisms for frequently accessed iBox structures.

3. **Drag-and-Drop** : Continuously dragging and dropping, especially with large structures, can impact performance.

* **Recommendation** : Implement throttling or debouncing techniques to manage frequent drag-and-drop interactions.

4. **Resizing** : Resizing iBoxes, especially when they contain rich content or other nested iBoxes, can be resource-intensive.

* **Recommendation** : Consider implementing resize optimization techniques, such as placeholder rendering during resizing and final rendering on release.

### Accessibility:

Ensuring that the iBox component is accessible to all users, including those with disabilities, is paramount:

1. **Keyboard Navigation** : All functionalities, including expanding, collapsing, editing, and dragging, should be accessible via keyboard shortcuts.
2. **Screen Reader Compatibility** : The component should be designed with screen reader software in mind. Proper ARIA roles and labels should be implemented to guide screen reader users through the iBox structure and functionalities.
3. **High Contrast Mode** : Ensure that the iBox, with its themes and colors, remains visible and distinguishable in high contrast modes for users with visual impairments.
4. **Zoom and Scalability** : The component should remain functional and clear when browser zoom functionalities are used or when viewed on devices with variable screen resolutions.
5. **Focus Management** : As iBoxes can be interactive, proper focus management ensures that users can intuitively navigate through functionalities without confusion.

### Security Considerations:

While the iBox component mainly deals with UI/UX, security is still a crucial aspect:

1. **Data Sanitization** : If user inputs (e.g., renaming the iBox) are allowed, ensure all inputs are sanitized to prevent cross-site scripting (XSS) attacks.
2. **JSON Handling** : Malformed or malicious JSON can be a vulnerability. Always validate and sanitize JSON data before parsing.
3. **Drag-and-Drop Security** : Ensure that the drag-and-drop functionality cannot be exploited to inject or manipulate content in unintended ways.
4. **Third-party Libraries** : If using third-party libraries (e.g., for drag-and-drop), ensure they are reputable and regularly updated. Outdated libraries can introduce vulnerabilities.
5. **Data Transmission** : If iBox structures are fetched or sent to servers, ensure secure transmission methods, like HTTPS, are employed.

## Component Breakdown

### Base Components

These serve as the foundation of the iBox system:

1. **Backplate Component** : This provides the foundational visual structure for iBoxes.
2. **iBox Component** : This encapsulates the behavior and appearance of an iBox. It includes both expanded and collapsed states.
3. **Corner-Box Component** : This deals with the meta aspects of an iBox, encompassing the label, drag handle, and any controls like collapse or expand buttons.
4. **Drag Handle Component** : This is responsible for enabling drag-and-drop functionality for iBoxes.
5. **Label Component** : This is responsible for displaying the name of the iBox and facilitating renaming functionality.
6. **Collapse Button and Expand Button Components** : These are controls that allow an iBox to be expanded or collapsed.

### Classes (Functional Expansions)

These build on the base components to provide enhanced functionality:

1. **iBox** : The core class, representing the basic iBox. It contains:

* Base rendering, including animations.
* Base functionalities of the iBox.
* Theme application methods.

1. **Children iBox** : This class extends the basic iBox to support child iBoxes, enabling a hierarchy. It:

* Generates child iBoxes based on JSON.
* Stores theme selection.

1. **ExpandCollapse iBox** : As the name suggests, this class enables the iBox to be expanded or collapsed.
2. **Resizable iBox** : This class facilitates the resizing of an iBox.
3. **Draggable iBox** : This class adds drag-and-drop functionality to the iBox.
4. **Editable iBox** : This class provides the functionality to rename an iBox.

### Culminating Class

This is the final, fully-featured iBox class:

* **InteractiveBox** : This class incorporates all the functionalities of the above classes, providing a comprehensive iBox experience.

### Testing

By dividing the iBox system into these modular components and classes, testing becomes more manageable and effective:

1. **Unit Testing** :

* Each base component can be tested in isolation to ensure it functions as intended.
* Each class expansion can be tested to ensure the specific additional functionality it introduces works correctly.

1. **Integration Testing** :

* This will ensure that the various components and classes work together harmoniously.
* The culminating InteractiveBox class, being the most comprehensive, would be the primary focus of integration testing.

1. **Security Testing** :

* Given the security considerations mentioned earlier, specific security-focused tests should be developed. For example, tests to ensure user input is sanitized correctly, JSON is parsed securely, and any third-party libraries used are not introducing vulnerabilities.

### Testability Considerations:

1. **Mocking** : For unit tests, any external dependencies (like third-party libraries) should be mocked to isolate the unit being tested.
2. **State Verification** : After specific operations (like adding a child iBox or renaming an iBox), the internal state of the iBox (like its JSON representation) should be verified to ensure correctness.
3. **UI Verification** : Post operations, the UI should be inspected to ensure that it reflects the expected changes. For instance, after renaming an iBox, does the displayed name match the new name?
4. **Performance Testing** : Given the performance considerations mentioned earlier, specific tests should be designed to monitor the performance of the iBox system under stress (like deep nesting or rapid dragging and dropping).
5. **Accessibility Testing** : Automated tests can be used to ensure that the iBox system adheres to accessibility standards. Manual testing, with tools like screen readers, should also be conducted.

### File Structure:

```mathematica
iBox
│
├── src
│   ├── base
│   │   └──  iBoxBase.js
│   │
│   ├── expansions
│   │   ├── Children.js
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
│   ├── styles
│   │   ├── ibox-children.css
│   │   ├── ibox-corner.css
│   │   ├── ibox-general.css
│   │   ├── styles.css
│   │   └── themes.css
│   │
│   └── index.js
│
├── test
│   ├── unit
│   │   ├── iBoxBase.test.js
│   │   ├── Children.test.js
│   │   ├── Draggable.test.js
│   │   ├── Resizable.test.js
│   │   ├── Editable.test.js
│   │   └── ExpandCollapse.test.js
│   │
│   ├── mocking
│   │   ├── dragAndDrop.mock.js
│   │   └── jsonParser.mock.js
│   │
│   ├── stateVerification
│   │   ├── stateAfterAddChild.test.js
│   │   └── stateAfterRename.test.js
│   │
│   ├── uiVerification
│   │   ├── uiAfterExpand.test.js
│   │   └── uiAfterRename.test.js
│   │
│   ├── performance
│   │   ├── deepNesting.test.js
│   │   └── rapidDraggingDropping.test.js
│   │
│   ├── accessibility
│   │   ├── keyboardNavigation.test.js
│   │   └── screenReaderCompatibility.test.js
│   │
│   ├── integration
│   │   └── iBoxComplete.test.js
│   │
│   └── index.js
│
├── examples
│   ├── baseExample.html
│   ├── childrenExample.html
│   ├── draggableExample.html
│   ├── resizableExample.html
│   ├── editableExample.html
│   ├── expandCollapseExample.html
│   └── completeExample.html
│
├── package.json
│
├── index.html
│
└── README.md
```

#### 1. `src` (Source Code Folder)

* `base` (Base Component Folder)
  * `iBoxBase.js`: Base iBox component, containing the minimal functionality and rendering of the iBox without any expansions.
  * `styles.css`: Base styling for the iBox component.
* `expansions` (Functionality Expansions Folder)
  * `Children.js`: Child generation and JSON interaction functionality expansion.
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

* `unit`

  * `iBoxBase.test.js`: Jest unit tests for the base iBox component.
  * `Children.test.js`: Jest unit tests for the child generation and JSON interaction functionalities.
  * `Draggable.test.js`: Jest unit tests for the draggable functionality.
  * `Resizable.test.js`: Jest unit tests for the resizable functionality.
  * `Editable.test.js`: Jest unit tests for the editable functionality.
  * `ExpandCollapse.test.js`: Jest unit tests for the expand/collapse functionality.
* `mocking`

  * `dragAndDrop.mock.js`: Mock file for drag-and-drop dependencies.
  * `jsonParser.mock.js`: Mock file for JSON parsing dependencies.
* `stateVerification`

  * `stateAfterAddChild.test.js`: Jest tests to verify the state after adding a child iBox.
  * `stateAfterRename.test.js`: Jest tests to verify the state after renaming an iBox.
* `uiVerification`

  * `uiAfterExpand.test.js`: Jest tests to verify the UI after expanding an iBox.
  * `uiAfterRename.test.js`: Jest tests to verify the UI after renaming an iBox.
* `performance`

  * `deepNesting.test.js`: Jest performance tests for deep nesting of iBoxes.
  * `rapidDraggingDropping.test.js`: Jest performance tests for rapid dragging and dropping of iBoxes.
* `accessibility`

  * `keyboardNavigation.test.js`: Jest tests for keyboard navigation accessibility.
  * `screenReaderCompatibility.test.js`: Jest tests for screen reader compatibility.
* `integration`

  * `iBoxComplete.test.js`: Jest integration tests for the complete iBox component.

#### 3. `examples` (Examples Folder)

* `baseExample.html`: Example HTML file to test and interact with the base iBox component.
* `childrenExample.html`: Example HTML file to test and interact with the child generation and JSON interaction functionalities.
* `draggableExample.html`: Example HTML file to test and interact with the draggable functionality.
* `resizableExample.html`: Example HTML file to test and interact with the resizable functionality.
* `editableExample.html`: Example HTML file to test and interact with the editable functionality.
* `expandCollapseExample.html`: Example HTML file to test and interact with the expand/collapse functionality.
* `completeExample.html`: Example HTML file to test and interact with the complete iBox component.

#### 4. `package.json`: Lists dependencies and scripts for the project.

#### 5. `index.html`: Base html file used for testing.

#### 6. `README.md`: Documentation for the project.

### Expected Output:

* **Base iBox Component** : The minimal iBox structure and functionality.
* **Functional Expansions** : Individual functionality extensions such as child generation, draggability, resizability, editability, etc.
* **Complete iBox Component** : A fully functional iBox with all expansions integrated.
* **Test Files** : Test HTML files will render the associated components or functionalities, allowing manual interaction.

### Test HTML Files:

The `examples` folder contains HTML files that allow you to manually interact with the iBox component and its functionality expansions. Each file includes a minimal setup with necessary scripts to render the specific component or functionality for exploration and manual testing.

The implementation of these test files would include importing the specific component and any associated styles, initializing the component with desired properties, and including any additional scripts or HTML required to demonstrate the functionality.

These HTML files would facilitate hands-on exploration and provide a tangible understanding of how each component or functionality behaves, aiding in development, debugging, and user experience design.

### Dependencies:

```mathematica
iBoxBase
│
└─> ChildrenBox
    Inherits: iBoxBase
	│
	└─> ExpandCollapse
	   Inherits: ChildrenBox
		│
		├─> Draggable
		│   Inherits: ExpandCollapse
		│
		├─> Resizable
		│   Inherits: ExpandCollapse
		│
		└─> Editable
	    	    Inherits: ExpandCollapse

Draggable, Resizable, Editable
│
└─> iBoxComplete
    Incorporates: Draggable, Resizable, Editable

```

### Pseudocode Breakdown:

1. **iBoxBase.js** :
   * Class: `iBoxBase`
   * Description: Base component for iBox, defining fundamental features.
   * Methods include: `initialize`, `render`, `destroy`, etc.
   * Utility Functions specific to iBoxBase class.
2. **ChildrenBox (Inherits iBoxBase)** :
   * Class: `ChildrenBox`
   * Description: Incorporates child and JSON functionalities to iBox.
   * Methods include: `parseJsonToInteractiveBoxes`, `addChildBox`, `updateJsonRepresentation`, etc.
3. **ExpandCollapse (Inherits ChildrenBox)** :
   * Class: `ExpandCollapse`
   * Description: Adds expand and collapse functionality to iBox.
   * Methods include: `constructor`, `expand`, `collapse`, etc.
4. **Draggable (Inherits ExpandCollapse)** :
   * Class: `Draggable`
   * Description: Adds drag-and-drop functionality to iBox.
   * Methods include: `constructor`, `onDragStart`, `onDrag`, etc.
5. **Resizable (Inherits ExpandCollapse)** :
   * Class: `Resizable`
   * Description: Incorporates resizing functionality into iBox.
   * Methods include: `constructor`, `enableResize`, `disableResize`, etc.
6. **Editable (Inherits ExpandCollapse)** :
   * Class: `Editable`
   * Description: Adds label editing functionality to iBox.
   * Methods include: `constructor`, `startEditing`, `stopEditing`, etc.
7. **constants.js** :
   * Contains constant values and configurations for various iBox components.
   * Includes default size, minimum size, maximum size, and others related to draggable, resizable, editable, expand/collapse, and general UI components.
8. **helpers.js** :
   * Contains helper functions to support main iBox components.
   * Includes General Utilities like `calculateDimensions`, `generateUniqueId`.
   * Draggable Utilities like `getDragHandle`, `calculateDragOffset`.
   * Resizable Utilities like `getResizeHandles`, `calculateResizeBounds`.
   * Editable Utilities, ExpandCollapse Utilities, DOM Manipulation Utilities, and Theming and Styling Utilities.
9. **iBoxComplete.js** :
   * Class: `iBoxComplete`
   * Description: The culminating class that incorporates all functionalities of Draggable, Resizable, and Editable.
   * Methods include: All methods from the previous classes for a fully functional iBox.

## Version Log:

#### v1.4 (Current Version) (WIP):

* Refactored iBoxBase and ChildrenBox to accept JSON with a lazy loading system

#### v1.3:

* **Major Changes** :
* Refactored class structure for a more modular and understandable hierarchy.
* Added Security, Accessibility, and Performance Considerations
* Introduced the `Children iBox` class for handling child iBox generation and theme assignments.
* Consolidated animation and rendering functionalities into the base `iBox` class.
* Made `ExpandCollapse iBox` the foundational class for Resizable, Draggable, and Editable iBoxes.
* **Minor Changes** :
* Externalized color selection functionality, allowing colors to be set from outside the iBox.
* Enhanced `Editable iBox` to allow for the "selected" property for accessing external colors.
* Incorporated `ExpandCollapse iBox` functionalities using the base `attachEvent` method.

#### v1.2:

* Introduced `iBoxBase` with core functionalities.
* Incorporated basic rendering, themes, and color selection.
* Included basic interaction methods like `initialize`, `render`, and `destroy`.

#### v1.1:

* Initial version.
* Basic structure and functionalities.
* Documentation and early design considerations.
