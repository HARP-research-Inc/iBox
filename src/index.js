// File: index.js
// Version: 1.0.0
// Dependencies: iBoxComplete from './components/iBoxComplete'
// Description: Entry point for the iBox package/library.
// Pseudo-Code:
/*
Imports:

Import iBoxBase from ./base/iBoxBase.js.
Import Draggable from ./expansions/Draggable.js.
Import Resizable from ./expansions/Resizable.js.
Import Editable from ./expansions/Editable.js.
Import ExpandCollapse from ./expansions/ExpandCollapse.js.
Import iBoxComplete from ./components/iBoxComplete.js.
Export Main Class & Extensions:

Export iBoxBase as the main class for creating basic iBox instances.
Export the Draggable, Resizable, Editable, and ExpandCollapse classes as additional features that can be applied to the iBox.
Export Complete Component:

Export iBoxComplete as a comprehensive component that includes all the functionality of iBoxBase and the extensions.
Additional Exports (if needed):

Any additional utility functions or constants that should be publicly available.
End of File Definition.
*/
// Imports:
import iBoxBase from './base/iBoxBase.js';
import Draggable from './expansions/Draggable.js';
import Resizable from './expansions/Resizable.js';
import Editable from './expansions/Editable.js';
import ExpandCollapse from './expansions/ExpandCollapse.js';
import iBoxComplete from './components/iBoxComplete.js';

// Export Main Class & Extensions:
export {
  iBoxBase,
  Draggable,
  Resizable,
  Editable,
  ExpandCollapse
};

// Export Complete Component:
export default iBoxComplete;

// Additional Exports (if needed):
// Example:
// export { utilityFunction1, utilityFunction2, CONSTANTS };