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
