/**
 * File: Draggable.js
 * Version: 1.0.0
 * Dependencies: ExpandCollapse (Inherits from the ExpandCollapse component)
 * Description: Draggable functionality expansion for iBox.
 *              This module extends the ExpandCollapse component to enable the ability to drag and drop iBox instances.
 * 
 * Class Definition: Draggable (Inherits from ExpandCollapse)
 * 
 * Properties:
 * - dragState: Object containing the drag state information of each iBox, such as start and end positions.
 * 
 * Constructor: (element, options)
 * - Initializes the Draggable functionality with a given DOM element and options, calling the ExpandCollapse constructor.
 * 
 * Methods:
 * - onDragStart(iBoxId): Triggers when the dragging of an iBox starts, setting initial state.
 * - onDrag(iBoxId, position): Updates the position of the specified iBox during dragging.
 * - onDragEnd(iBoxId): Finalizes the drag operation for the specified iBox, updating its final state.
 * - renderDragState(): Renders the iBoxes based on their current drag state.
 * 
 * Utility Functions:
 * - isDragging(iBoxId): Returns a boolean indicating whether the specified iBox is currently being dragged.
 * - getDragHandle(iBoxId): Retrieves the drag handle element for the specified iBox's draggable state.
 * 
 * End of File Definition.
 */
