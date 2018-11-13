# FENDp7 - Neighborhood Map (React)

**Single Page React - responsive & accessible neighborhood map**  
An Udacity FEND Nanodegree repository. 

# How to Test My Submission
Just click [here to try it running on GitHub Pages](https://rudimusmaximus.github.io/FENDp7/).
TODO: figure out how to deploy react to github pages.

# My Notes Completing This
See also 

## Lessons learned:  

| Area | Comments |
| :--- | :--- |
| 1. TODO | a. TODO |

# Instructions

From the course Project Overview, we create an app that fulfills the [Project Rubric](https://TODO) See also, #1 [...FENDp6/issues/1](https://github.com/rudimusmaximus/FENDp6/issues/1) for checklist.

## App Functionality
In this application, the main page displays a map of at least 5 places.
The app should have a way to list items that are marked on the map. 
Ability to filter and to provide additional information as indicated in the rubric.

# DESIGN_NOTES

**Task**: Create a React app that lets us interact with a set of filterable places and information from mulitple APIs.

```
<!-- info:
- TODO
 -->
```

TODO: notes

```
<!-- caveats, restrictions, validations:
- animation requirements
- TODO
 -->
```
TODO: notes

```
<!-- Key Interaction:
- TODO
 -->
```

  "**About State**: 
  Because we are using mulitple APIs, lets use an array of promises for getting our information.
  
  See also, [Thinking in React Guide](https://reactjs.org/docs/thinking-in-react.html

## Mock
Full page map with filter overlay and expandable menu of filter hits reflected in map.  

### Mock menu closed welcome

TODO: create #2 for hosting mocks and insert them here.

### Mock menu open with close indicator

TODO: create #2 for hosting mocks and insert them here.

### Mock smallest view

TODO: create #2 for hosting mocks and insert them here.

## Design Note Steps
### Step 1. Break down the app into a hierarchy of components. Draw a box around each React component.

- App
  - Map
    - Additional info for one item
  - Filter (menu style opens and closes over map)
  
### Step 2. Determine the data in our app.  

- Neighborhood
- Number of locations visible with marker(s)
- Location name and details
- Active filter if any

### Step 3. Figure out the data that should be a part of our state:

1.  Is it passed in from a parent via props? If so, it probably isn’t state.
2.  Does it remain unchanged over time? If so, it probably isn’t state.
3.  Can you compute it based on any other state or props in your component?
    If so, it isn’t state.

#### State:

- TODO

#### Not state:

- TODO

### Step 4. Identify where each piece of state lives.

1.  Identify every component that renders something based on that state.
2.  If multiple components need the same piece of state, put that piece of state into those components' parent-most component.

If you can’t find a component where it makes sense to own the state, create
a new component simply for holding the state and add it somewhere in the
hierarchy above the common owner component.  

**Candidate Components**
- TODO

### Step 5. Add Inverse Data Flow.

State should be updated inside of the component where that state lives.
If we pass state down from component A to component B and then need to update
the state based on something that happened in component B, we can do so via
callbacks: Component A will not only pass state to Component B, but it will
also pass a callback function that will fire whenever the state should be updated.

Inverse data flow: Need execute something in the parent component, but need to access data from the child component
