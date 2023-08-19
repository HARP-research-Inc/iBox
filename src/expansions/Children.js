/**
 *? ._   ._     _      ____     ____
 *? ||   ||    /_\        \\       \\
 *? ||===||   // \\    ___//    ___//
 *? ||   ||  //   \\  ||       ||
 *
 *? File: Children.js
 * Version: 1.0.0
 *? Author: Harper Chisari
 * Dependencies: iBoxBase (Inherits from the base iBox component)
 * Description: Child generation and JSON interaction functionality expansion for iBox. This module extends the base iBox component to enable child generation and interaction with JSON representations.
 * 
 *? Class Definition: ChildrenBox (Inherits from iBoxBase)
 * 
 *? Properties:
 * - children: Array containing child iBox instances.
 * - jsonRepresentation: JSON object representing the current state of children.
 * 
 *? Constructor: (element, options)
 * - Initializes the ChildrenBox with a given DOM element and options, calling the base iBox constructor.
 * 
 *? Methods:
 * - addChildBox(childOptions): Adds a new child iBox with specified options.
 * - removeChildBox(childId): Removes a child iBox by its unique identifier.
 * - parseJsonToInteractiveBoxes(json): Parses a given JSON object into interactive iBox children.
 * - updateJsonRepresentation(): Updates the JSON object representing the current state of children.
 * - renderChildren(): Renders the child iBoxes based on current state.
 * 
 *? Utility Functions:
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
  constructor(element, json) {
    super(element, json);
    if (Array.isArray(this.json[this.uid].children)) {
      const childrenObject = {};
      this.json[this.uid].children.forEach((child, index) => {
        const childUid = child.uid || this.generateUniqueUID();
        childrenObject[childUid] = child;
      });
      this.children = childrenObject;
    } else {
      this.children = this.json[this.uid].children || {};
    }

    //Log children
    console.log('CHILDREN CONSTRUCTOR: Children: ', this.children);
    // Store a reference to this instance in the DOM element
    element.childrenBoxInstance = this;

    this.renderChildren();
    //window.iBoxMap.set(this.uid, this);
    console.log(`CHILDREN CONSTRUCTOR: Added iBox instance for element with ID ${this.uid} => ${this} to the global map.`);
  }

  addChildBox(input) {
    console.log('ADD CHILD: Adding child...');
  
    const updatedJson = {
      isExpanded: true // Include the expanded state in the JSON
    };
  
    const instance = window.iBoxMap.get(this.uid);
    instance.update(JSON.stringify(updatedJson)); // Update the JSON representation of the parent
    let childData;
  
    // If the input is an empty string or not provided, generate a default child
    if ((!input) || (input === '') || (Object.keys(input).length === 0)) {
      const childCount = Object.keys(this.children).length + 1;
      const childName = `Child iBox ${childCount}`;
      const childTheme = (this.theme + childCount) % this.colors.length;
      const childUid = this.generateUniqueUID();
  
      childData = {
        [childUid]: { name: childName, theme: childTheme, parentUid: this.uid } // Include the parent UID
      };
      console.log('ADD CHILD: Children object: ', childData);
    } else if (typeof input === 'string') {
      try {
        childData = JSON.parse(input);
        console.log('ADD CHILD: Adding child box with string input:', input);
      } catch (error) {
        console.error('ADD CHILD: Invalid JSON string:', input);
        return;
      }
    } else {
      childData = input;
      console.log('ADD CHILD: Adding child box with input:', input);
    }
  
    // Add the child to children object using the UID as the key
    const childUid = Object.keys(childData)[0];
    this.children[childUid] = childData[childUid];
  
    this.updateJsonRepresentation();
    this.renderChildren();
  }

  removeChildBox(uid) {
    if (this.children[uid]) {
      delete this.children[uid]; // Remove child from children object
      this.updateJsonRepresentation();
      this.renderChildren();
    }
  }

  collectChildren() {
    // Recursive function to traverse and collect all children along with their JSON
    let collectChildren = (child, parentUid) => {
      let collectedChildren = {};
      for (let uid in child.children) {
        collectedChildren[uid] = child.children[uid];
        // Include the child's JSON, isExpanded, and parentUid
        collectedChildren[uid].json = child.children[uid].json;
        collectedChildren[uid].isExpanded = child.children[uid].isExpanded || false; // Default to true if not defined
        collectedChildren[uid].parentUid = parentUid;
  
        // Recursively collect children of children
        if (child.children[uid].children) {
          console.log('COLLECT CHILDREN: Recusrively collecting children for child with UID: ', uid);
          collectedChildren[uid].children = collectChildren(child.children[uid], uid);
        } else {
          collectedChildren[uid].children = {};
        }
      }
      return collectedChildren;
    };
  
    // Collapsing the children into the parent's JSON
    this.json[this.uid].children = collectChildren(this, this.uid);
    console.log('COLLECT CHILDREN: Collapsed JSON: ', JSON.stringify(this.json));
  }
  
  
  updateJsonRepresentation() {
    console.log('UPDATE JSON: Updating JSON representation for element with ID: ', this.uid);
    this.json[this.uid].children = {};
  
    // Iterate through the children and add them to the parent's JSON
    for (const uid in this.children) {
      console.log('UPDATE JSON: Adding child with UID: ', uid);
      this.json[this.uid].children[uid] = this.children[uid];
    }
  
    this.collectChildren()
    // If there is a parentUid, update the parent's JSON as well
    if (this.json[this.uid].parentUid) {
      const parentUid = this.json[this.uid].parentUid;
      const parentInstance = window.iBoxMap.get(parentUid);
  
      if (parentInstance) {
        parentInstance.json[parentUid].children[this.uid] = this.json;
        console.log('UPDATE JSON: Updated parent JSON for element with ID:', parentUid);
      }
    }
  
    console.log('UPDATE JSON: Updated JSON: ', JSON.stringify(this.json));
  }
  

  renderChildren() {
    const parentChildrenContainer = this.element.querySelector('#'+this.uid+'_children');
    window.iBoxMap.set(this.uid, this); // Store the rendered child in the map
    // Render children only if the parent is expanded
    if (this.isExpanded) {
      console.log('RENDER CHILDREN: Parent is expanded. Rendering children.');
      for (const uid in this.children) {
        const child = this.children[uid];
        const childJson = JSON.stringify(child);
  
        // Check if the child has already been rendered
        let childbox = window.iBoxMap.get(uid);
        if (childbox) {
          // Update the existing child instance
          childbox.update(childJson);
        } else {
          // Create a separate container for each child
          const childContainer = document.createElement('div');
          childContainer.className = 'ibox-child-container';
          parentChildrenContainer.appendChild(childContainer);
  
          // Create a new child instance
          childbox = new window.ChildrenBox(childContainer, childJson);
          window.iBoxMap.set(uid, childbox); // Store the rendered child in the map
  
          const updatedJson = { parent: this.uid };
          childbox.update(JSON.stringify(updatedJson));
        }
  
        // Update the children object with the new child information
        //this.children[uid] = childbox.json[childbox.uid];
        this.collectChildren();
      }
    } else {
      console.log('RENDER CHILDREN: Parent is collapsed. Clearing children.');
      parentChildrenContainer.innerHTML = ''; // Clear existing children from the DOM}
      console.log('parentChildrenContainer: ', parentChildrenContainer.innerHTML);

      console.log('RENDER CHILDREN: Map before clearing children: ', window.iBoxMap);
      console.log('RENDER CHILDREN: Children: ', this.children);
      // Delete child instances from the global map
      for (const uid in this.children) {
        console.log('RENDER CHILDREN: Deleting child with UID: ', uid);
        window.iBoxMap.delete(uid);
      }
      console.log('RENDER CHILDREN: Map after clearing children: ', window.iBoxMap);
  }
}


  jsonImport(json) {}

  jsonExport() {}
}

// Define the global map outside of the class
window.iBoxMap = new Map();

// Export the class for external usage
window.ChildrenBox = ChildrenBox;
