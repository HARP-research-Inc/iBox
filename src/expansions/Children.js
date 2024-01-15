/**
 *? ._   ._     _      ____     ____
 *? ||   ||    /_\        \\       \\
 *? ||===||   // \\    ___//    ___//
 *? ||   ||  //   \\  ||  \\   ||
 *
 *? File: Children.js
 * Version: 1.2.0
 *? Author: Harper Chisari
 * Dependencies: iBoxBase (Inherits from the base iBox component)
 * Description: Child generation and JSON interaction functionality expansion for iBox. This module extends the base iBox component to enable child generation and interaction with JSON representations. Version 1.2 includes the ability to dynamically create and remove iBox instances and manage their lifecycle, including expand and collapse functionality.
 * 
 *? Class Definition: ChildrenBox (Inherits from iBoxBase)
 * 
 *? Properties:
 * - children: Object containing child iBox instances, keyed by UID.
 * - parentUid: UID of the parent iBox.
 * 
 *? Constructor: (element, json)
 * - Initializes the ChildrenBox with a given DOM element and JSON, calling the base iBox constructor.
 * 
 *? Methods:
 * - getChildrenElements(): Retrieves child iBox instances.
 * - removeFromDOM(): Removes an iBox instance from the DOM.
 * - deleteIBox(): Deletes an iBox instance entirely.
 * - handleChildJson(json): Processes child JSON for creation.
 * - addChildBox(input): Adds a new child iBox with specified options.
 * - expand(): Expands children from JSON.
 * - collapse(): Collapses children into JSON.
 * 
 * End of File Definition.
 */

class ChildrenBox extends window.iBoxBase {
  constructor(parent, json) {
    super(parent, json);
  }

  getChildrenElements() {
    console.log('GET CHILDREN ELEMENTS: Getting children elements for element with ID: ', this.uid);
    const childrenElements = [];
    // Look for the children container inside the current element
    const childrenContainer = this.element.querySelector('#' + this.uid + '_children');
    if (childrenContainer) {
      console.log('GET CHILDREN ELEMENTS: Found children container: ', childrenContainer);
      // Iterate through the immediate children inside the children container
      Array.from(childrenContainer.children).forEach((containerElement) => {
        // Check if the child has the 'ibox-container' class
        if (containerElement.classList.contains('ibox-container')) {
          // Get the first element inside the 'ibox-container' (if any) and retrieve its ID
          const childElement = containerElement.firstElementChild;
          if (childElement) {
            const childInstance = window.iBoxMap.get(childElement.id);
            if (childInstance) {
              childrenElements.push(childInstance);
            }
          }
        }
      });
    } else {
      console.log('GET CHILDREN ELEMENTS: No children container found for element with ID: ', this.uid);
    }
    return childrenElements;
  }
  

  attatchIBox() {
    console.log("ATTATCH IBOX(CHILDRENBOX): attaching current iBox to parent: ", this.parent);
    // Check if the parent is an 'ibox'
    if (this.parent.classList.contains('interactive-box')) {
      console.log("ATTATCH IBOX(CHILDRENBOX): Parent is ibox, appending to direct children container: ", this.parent);
      // Find the direct child with class 'ibox-children-container'
      this.appendToParentIBox();
    }
    // Check if the parent is an 'ibox-children-container'
    else if (this.parent.classList.contains('ibox-children-container')) {
      console.log("ATTATCH IBOX(CHILDRENBOX): Parent is ibox-children-container, creating ibox-container and appending to parent: ", this.parent);
      const holderElement = this.createContainer();
      this.parent.appendChild(holderElement);

      // Get the ID from the parent of the 'ibox-children-container' and set it to the parentUid property
      const parentUid = this.parent.parentElement.id;
      this.parentUid = parentUid;

      console.log("ATTATCH IBOX(CHILDRENBOX): Parent UID set to:", parentUid);
    }

    // Check if the parent is an 'ibox-container'
    else if (this.parent.classList.contains('ibox-container')) {
      console.log("ATTATCH IBOX(CHILDRENBOX): Parent is ibox-container, appending to children container: ", this.parent);
      // Check if there's an ibox inside the parent
      const ibox = this.parent.querySelector('.interactive-box');
      if (ibox) {
        console.log("ATTATCH IBOX(CHILDRENBOX): Parent has ibox, appending to children container: ", this.parent);
        this.appendToParentIBox(ibox);
      } else {
        console.log("ATTATCH IBOX(CHILDRENBOX): iBox-container has no ibox, appending to parent: ", this.parent);
        this.parent.appendChild(this.element);
        this.checkForParentContainer();
      }
    }
    // Append the element directly to the parent if it's not an 'ibox', 'ibox-children-container', or 'ibox-container'
    else {
      console.log("ATTATCH IBOX(CHILDRENBOX): Parent is not ibox, ibox-children-container, or ibox-container, creating holder element and appending to parent: ", this.parent);
      const holderElement = this.createContainer();
      this.parent.appendChild(holderElement);
    }
  }

  checkForParentContainer() {
    // Check if the parent above the 'ibox-container' is an 'ibox-children-container', and if so set the parentUid to the parent of the 'ibox-children-container'. Else set to null.
    if (this.parent.parentElement.classList.contains('ibox-children-container')) {
      const parentUid = this.parent.parentElement.parentElement.id;
      this.parentUid = parentUid;
      console.log("CHECK FOR PARENT: Parent UID set to:", parentUid);
    } else // check if the parent above the 'ibox-container' is an 'ibox'
      if (this.parent.parentElement.classList.contains('interactive-box')) {
        console.log("CHECK FOR PARENT: Parent is ibox, appending to direct children container: ", this.parent);
        const parentUid = this.parent.parentElement.id;
        this.parentUid = parentUid;
        console.log("CHECK FOR PARENT: Parent UID set to:", parentUid);
      } else {
        console.log("CHECK FOR PARENT: No children container above container, parent UID set to null");
        this.parentUid = null;
      }
  }

  appendToParentIBox(parentElement) {
    // If no parentElement is provided, use the parent property
    const parentIbox = parentElement ? parentElement : this.parent;
    console.log("APPEND TO PARENT IBOX: Appending to parent ibox: ", parentIbox);
    this.parentUid = parentIbox.id;

    // Check for an 'ibox-children-container' inside the ibox
    let childrenContainer;
    for (const child of parentIbox.children) {
      if (child.classList.contains('ibox-children-container')) {
        childrenContainer = child;
        break;
      }
    }
    // If no 'ibox-children-container' exists, create one
    if (!childrenContainer) {
      console.log("APPEND TO PARENT IBOX: Parent has ibox, but no children container, creating one: ", parentIbox);
      // Create an 'ibox-children-container' and append
      childrenContainer = document.createElement('div');
      childrenContainer.className = 'ibox-children-container';
      ibox.appendChild(childrenContainer);
    }
    // Append the element to the children container
    const holderElement = this.createContainer();
    childrenContainer.appendChild(holderElement);
  }

  removeFromDOM() {
    console.log('REMOVE FROM DOM(CHILDRENBOX): Removing iBox with ID: ', this.uid);

    const children = this.getChildrenElements();
    children.forEach((child) => {
      console.log('REMOVE FROM DOM(CHILDRENBOX): Removing child with ID: ', child.uid);
      child.removeFromDOM();
    });
    // Check if parentUid is set and add to JSON, else remove the element from the DOM
    if (this.parentUid) {
      // Add the child to the parent's JSON
      console.log('REMOVE FROM DOM(CHILDRENBOX): Adding to iBox JSON with UID: ', this.parentUid);
      this.parent = window.iBoxMap.get(this.parentUid);
      this.parent.json[this.parentUid].children = this.parent.json[this.parentUid].children.concat(this.json[this.uid]);

      console.log('REMOVE FROM DOM(CHILDRENBOX): New parent iBox JSON: ', this.parent.json);
    }

    // Add a 500ms delay before removing the iBox instance
    setTimeout(() => {
      super.destroy();
    }, 500);
  }

  deleteIBox() {
    console.log('DELETE IBOX : removeing element with ID: ', this.uid);
    children = this.getChildrenElements();
    children.forEach((child) => {
      console.log('REMOVE FROM DOM: Removing child with ID: ', child.uid);
      child.removeFromDOM();
    });

    // remove the iBox instance
    super.destroy();
  }

  handleChildJson(json) {
    let childJSON;

    // Test if the input is valid JSON
    if (json && typeof json === 'object' && json.name && typeof json.theme === 'number') {
      childJSON = json;
      console.log('HANDLE CHILD JSON: Adding child box with JSON:', json);
    } else {
      // If the input is not valid JSON, generate a default child
      const childCount = Object.keys(this.getChildrenElements()).length + 1;
      const childName = `Child iBox ${childCount}`;
      const childTheme = (this.theme + childCount) % this.colors.length;

      childJSON = { name: childName, theme: childTheme }; // Simply pass the name and theme
      console.log('HANDLE CHILD JSON: Children object: ', childJSON);
    }

    return JSON.stringify(childJSON);
  }

  addChildBox(json) {
    // If the parent is collapsed, expand it
    if (this.isExpanded === false) {
      console.log('ADD CHILD: While collapsed, tried to add child to: ', this.uid);
      this.isExpanded = true;
      this.json[this.uid].isExpanded = true;
      this.expand();

      console.log('ADD CHILD: JSON ', JSON.stringify(this.json));
    } else {
      console.log('ADD CHILD: iBox with UID: ', this.uid, ' is already expanded');
    }
    
    // Generate child JSON from input JSON
    const updatedJson = this.handleChildJson(json);
    console.log('ADD CHILD: Adding child with JSON: ', updatedJson);

    // Create a new child instance
    new window.ChildrenBox(this.element, updatedJson);
  }

  expand() {
    console.log('EXPAND-(CHILDRENBOX): Expanding iBox with UID: ', this.uid);
    super.expand();
    // Render the children
    for (const child of this.json[this.uid].children) {
      console.log('EXPAND-(CHILDRENBOX): Rendering child with JSON: ', child);
      this.addChildBox(child);
    }

    // Remove the children from the JSON
    this.json[this.uid].children = [];
  }

  collapse() {
    console.log('COLLAPSE(CHILDRENBOX): Collapsing iBox with UID: ', this.uid);
    // Collapse the children
    const children = this.getChildrenElements();
    console.log('COLLAPSE(CHILDRENBOX): Found children: ', children);
    children.forEach((child) => {
      console.log('COLLAPSE(CHILDRENBOX): Collapsing child with UID: ', child.uid);
      child.removeFromDOM();
    });
    super.collapse();
  }
}


// Export the class for external usage
window.ChildrenBox = ChildrenBox;
