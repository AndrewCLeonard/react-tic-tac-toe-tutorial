## Definitions/Glossary

| Word      | Definition                                                                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| component | <ul><li>a piece of reusable code that represents a part of a user interface</li><li>Components are used to render, manage, and update the UI elements in your application.</li></ul> |

## Explanation

Let’s recap what happens when a user clicks the top left square on your board to add an X to it:

1. Clicking on the upper left square runs the function that the button received as its onClick prop from the Square. The Square component received that function as its onSquareClick prop from the Board. The Board component defined that function directly in the JSX. It calls handleClick with an argument of 0.
2. handleClick uses the argument (0) to update the first element of the squares array from null to X.
3. The squares state of the Board component was updated, so the Board and all of its children re-render. This causes the value prop of the Square component with index 0 to change from null to X.

In the end the user sees that the upper left square has changed from empty to having a X after clicking it.

## Conventions

In React, it’s conventional to use `on[Event]` names for props which represent events and `handle[Event]` for the function definitions which handle the events.

## Immutability

-   ability to undo/redo is a common requirement for apps
-   Avoiding direct data mutation lets you keep previous versions of data intact to reuse (or reset to them) later.
-   By default, all child coemponents re-render automatically when state of a parent component changes.
    - includes child components that weren't affected by change
    - Try to avoid re-rendering a part of the tree that wasn't affected by it for faster performance. 
