# FENDp7 - Neighborhood Map (React)

**Single Page React - responsive & accessible neighborhood map**  
An Udacity FEND Nanodegree repository. 

# How to Test My Submission
Just click [here to try it running on GitHub Pages](https://rudimusmaximus.github.io/FENDp7/).
TODO: figure out how to deploy react to github pages.

# My Notes Completing This
See also 

## Lessons learned with attributions and further reading  

| Area | Comments |
| :--- | :--- |
| 1. enable react | a. starting with create in a clean build per [docs](https://reactjs.org/docs/create-a-new-react-app.html)<br>`npx create-react-app my-app`<br> will generate package.json and readme.md so run first or take care when merging with DevFlow starting material |
| 2. gitignore | a. becoming a monster file, need to review cross platform needs against implementing my own style standards. Future TODO |
| 3. JSON API | a. Created my own for use on this project to create the map markers. See https://rudimusmaximus.github.io/dfwTips/ for readme and here for repo https://github.com/rudimusmaximus/dfwTips <br>b. This repo is credited with link in footer. These tips are the source data for making map markers and geting the categories by which to filter. |
| 4. jsdoc | a. how does jsdoc differ when assigning arrow functions to declared variables as arrow functions are anonymous. b. [no answer](https://stackoverflow.com/questions/3171454/best-way-to-document-anonymous-objects-and-functions-with-jsdoc). opinion based approach. interesting TODO: develop my own approach |
| 5. service workers | a. create react app comes with this! TODO: add instructions to readme...it's a single line edit. |
| 6. svg | a. react uses https://www.w3.org/Graphics/SVG/ for it's rotating icon. TODO: research this space. |
| 7. max watchers in ubuntu | a. limit issues with gitkraken is inotify issue in os, found [item 1](https://techsparx.com/blog/2018/02/gitkraken-inotify.html) and [item 2](https://ubuntuforums.org/showthread.php?t=1439759) for resolution. <br>```bash cat /proc/sys/fs/inotify/maxUser_watches``` <br> shows number active <br>```bash sudo sysctl fs.inotify.max_user_watches=99999``` <br> fixes and stays fixed in our crouton ubuntu when developing on chrome os |
| 8. npm | a. installed modules are now added as a dependency by default so the --save option is no longer needed. Other save options remain like --save-dev or --save-optional. see [stackoverflow](https://stackoverflow.com/questions/19578796/what-is-the-save-option-for-npm-install) |
| 9. lists and keys | a. index approaches, see [react doc](https://reactjs.org/docs/lists-and-keys.html), [Medium recommendation for using 'shortid'](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318), [recursion on children and keys (why)](https://reactjs.org/docs/reconciliation.html#recursing-on-children), [install shortid](https://www.npmjs.com/package/shortid), <br>b. TODO: install and use in this project <br>c. Basically, Index as a key is an anti-pattern |
| 10. Hamburger menu (icons) | a. Used awesome fonts per this [article](https://alligator.io/react/font-awesome/)<br>And [this app](https://github.com/FortAwesome/react-fontawesome)<br>b. resizing font-size can help size the svg font also. TODO: research other solutions that flex the element height;I used vh or viewport height percent values that add up to 100 to ensure full page coverage since there is a menu title and a footer in addition to the map. This works in most cases but not perfect. Simulated landscape on mobile seemed not optimal, will review in testing.<br>c. see also [SVG JavaScript Core for advanced packages](https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core) |
| 11. future enhancements | a. better sidebar styling including perhaps custom slectors and pick lists. see [article for topic ideas](https://speckyboy.com/open-source-css-javascript-select-box-snippets/) |
| n. TODO | a. TODO |

## Other key walkthrougs and articles  
In adition to the articles listed in my above notes, I made use of the following walkthroughs and articles for insight, inspiration, and help.
- [Udacity | Neighborhood Map [4] - Add Dynamic Markers to Google Maps](https://www.youtube.com/watch?v=nDJ00zO9X2U)
- TODO: any more?

# Instructions  

From the course Project Overview, we create an app that fulfills the [Project Rubric](https://TODO) See also, #1 [...FENDp7/issues/1](https://github.com/rudimusmaximus/FENDp7/issues/1) for checklist.

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
  Because we are using multiple APIs, let's use an array of promises for getting our information (maybe).
  
  See also, [Thinking in React Guide](https://reactjs.org/docs/thinking-in-react.html

## Mock
see instructions in course.
toUsing a working list created in app.js
```js
<ol className="tempOl">
    <li>load the markers using json api and utility functions</li>
    <li>paint the map</li>
    <li>paint the search box or selectable filter</li>
    <li>add the sidebar/menu/collapsible list</li>
    <li>window popups for markers already done load from api</li>
    <li>parse into components</li>
    <li>testing</li>
    <li>activate service worker and test</li>
    <li>bonus more info from another api like squarspace</li>
    <li>THORUGHOUT check the rubric checklist in issue 1</li>
</ol>
```
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

# From React Readme
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
