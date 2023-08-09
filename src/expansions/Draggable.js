/**
 * Draggable iBox (Inherits iBoxBase)
 * 
 * Provides the drag-and-drop functionality for the iBox component.
 * Utilizes the Drag Handle Component to allow user-driven dragging.
 * This class is an expansion of the base iBox, encapsulating only
 * the drag functionality without integrating other features.

Class Definition: Draggable

Properties:

isDragging: A boolean to track whether the box is currently being dragged.
dragStart: Coordinates to store where the drag operation started.
dragOffset: Offsets to calculate the new position while dragging.
Methods:

constructor: Initialize the base properties and setup drag-related properties.

Input: iBoxBase instance or properties needed to create one.
Action: Initialize the base iBox and set up the drag-related properties.
onDragStart: Event handler for when a drag operation starts.

Input: Event information (e.g., mouse or touch event).
Action: Record the starting position, set isDragging to true.
onDrag: Event handler for the drag operation itself.

Input: Event information.
Action: Calculate the new position based on the drag and update the box's position using iBoxBase.setPosition.
onDragEnd: Event handler for when a drag operation ends.

Input: Event information.
Action: Set isDragging to false, update any final positions, and potentially trigger other events or actions related to the end of the drag.
enableDrag: Enable drag functionality for the box.

Action: Attach the appropriate event listeners for drag start, drag, and drag end.
disableDrag: Disable drag functionality for the box.

Action: Detach the event listeners related to dragging.
isDraggable: Check if the box is currently draggable (e.g., not locked or disabled).

Output: Returns a boolean indicating whether the box is draggable.
End of Class Definition.
 */
class DraggableIBox extends iBoxBase {
    // Implementation...
  }
  