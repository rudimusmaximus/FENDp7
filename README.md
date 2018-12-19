# FENDp7 - Neighborhood Map (React)

**Single Page React - responsive & accessible neighborhood map**  
An Udacity FEND Nanodegree project repository. 

# How to Test My Submission as a user
Just [click here to run on GitHub Pages](https://rudimusmaximus.github.io/FENDp7).
Service worker is active on hosted version see note 5 in Lessons Learned Section.

# How to Test My Submission as a developer
After cloning the repository, you will need to install the project dependencies using node's npm as follows.
In the command line terminal and from the directory of the cloned project enter:
```bash
npm install
```
Then run this to test in your default browser served by a development server:
```bash
npm start
```
## Questions or issues?
Just create an issue [here](https://github.com/rudimusmaximus/FENDp7/issues).

# My Notes Completing This
See also implementation notes in [...FENDp7/issues/1](https://github.com/rudimusmaximus/FENDp7/issues/1)
Used my preferred DevFlow and labeling scheme.

## Lessons learned with attributions and further reading  
| Area | Comments |
| :--- | :--- |
| 1. enable react | a. starting with create in a clean build per [docs](https://reactjs.org/docs/create-a-new-react-app.html)<br>`npx create-react-app my-app`<br> will generate package.json and readme.md so run first or take care when merging with DevFlow starting material |
| 2. gitignore | a. becoming a monster file, need to review cross platform needs against implementing my own style standards. Future TODO |
| 3. JSON API | a. Created my own for use on this project to create the map markers. See https://rudimusmaximus.github.io/dfwTips/ for readme and here for repo https://github.com/rudimusmaximus/dfwTips <br>b. This repo is credited with link in footer. These tips are the source data for making map markers and geting the categories by which to filter. |
| 4. jsdoc | a. how does jsdoc differ when assigning arrow functions to declared variables as arrow functions are anonymous. <br>b. [no answer](https://stackoverflow.com/questions/3171454/best-way-to-document-anonymous-objects-and-functions-with-jsdoc). opinion based approach. interesting, develop approach <br>c. [This eslint doc is a good way to go](https://eslint.org/docs/rules/require-jsdoc) |
| 5. service workers | a. create react app comes with this! In development, we don't use. we build and host on github. In code, it's a single line edit. In `src/index.js`, opt into offline-first by switching `serviceWorker.unregister()` to `serviceWorker.register()` to turn on service worker. [see docs](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app) |
| 6. svg | a. react uses https://www.w3.org/Graphics/SVG/ for it's rotating icon. Future TODO: research this space. |
| 7. Max watchers in ubuntu | a. limit issues with gitkraken is inotify issue in os, found [item 1](https://techsparx.com/blog/2018/02/gitkraken-inotify.html) and [item 2](https://ubuntuforums.org/showthread.php?t=1439759) for resolution. <br>```bash cat /proc/sys/fs/inotify/maxUser_watches``` <br> shows number active <br>```bash sudo sysctl fs.inotify.max_user_watches=99999``` <br> fixes and stays fixed for session in our crouton ubuntu when developing on chrome os |
| 8. npm | a. installed modules are now added as a dependency by default so the --save option is no longer needed. Other save options remain like --save-dev or --save-optional. see [stackoverflow](https://stackoverflow.com/questions/19578796/what-is-the-save-option-for-npm-install) |
| 9. lists and keys | a. index approaches, see <br>[react doc](https://reactjs.org/docs/lists-and-keys.html), <br>[Medium recommendation for using 'shortid'](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318), <br>[recursion on children and keys (why)](https://reactjs.org/docs/reconciliation.html#recursing-on-children), <br>[install shortid](https://www.npmjs.com/package/shortid), <br>b. Installed and used in this project <br>c. Basically, Index as a key is an anti-pattern |
| 10. Hamburger menu (icons) | a. Used awesome fonts per this [article](https://alligator.io/react/font-awesome/)<br>And [this app](https://github.com/FortAwesome/react-fontawesome)<br>b. resizing font-size can help size the svg font also. Future TODO: research other solutions that flex the element height; I used vh or viewport height percent values that add up to 100 to ensure full page coverage since there is a menu title and a footer in addition to the map. This works in most cases but not perfect. Simulated landscape on mobile seemed not optimal, will review in testing.<br>c. see also [SVG JavaScript Core for advanced packages](https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core) |
| 11. future enhancements | a. better sidebar styling including perhaps custom slectors and pick lists. see [article for topic ideas](https://speckyboy.com/open-source-css-javascript-select-box-snippets/) |
| 12. collapsable nav bar | a. used udacity course material from review of patterns (off canvas pattern). articles and code samples include:<br>[udacity off canvas pattern](http://udacity.github.io/RWDF-samples/Lesson4/patterns/off-canvas.html)<br>[code pen react example](https://codepen.io/danbuda/post/a-react-navbar-component)|
| 13. state values / where to best declare variables in React | a. React's setState is asynchronous inside event handlers and proved problematic for our use case. We preferred component variables for google api, and for the active filter selections. Testing for this was useful for learning React. Recommend learning Redux per React's own documentation. <br>b. see [React says maybe use Redux or MobX](https://reactjs.org/docs/faq-state.html#should-i-use-a-state-management-library-like-redux-or-mobx) <br>c. [this post clarifies best where to declare variables in react](https://stackoverflow.com/questions/47417217/where-to-declare-variable-in-react-js) |
| 14. React best practices | a. [react component lifecycle 1](https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d), [react component lifecycle 2](https://medium.com/@baphemot/understanding-react-react-16-3-component-life-cycle-23129bc7a705) |
| 15. A11y | a. [Accessible Maps On The Web](https://equalentry.com/accessible-maps-on-the-web/)], <br>b. [The A11Y Project](https://a11yproject.com/), <br>c. Future TODO: is there a way to tab imediately to info window after clicking a listing item that's in the tab order? Not sure if I want to if going modeless for better flow., <br>d. Went with 0 value tab indices and some aria labels and roles including keypressevets for listing clicks. |
| 16. Build>Deploy>Host | a. [“Surge VS GitHub Pages: How to deploy a create-react-app project” by Jake Wiesler](https://link.medium.com/2GUoffmxLS), <br>b. Went with GitHub Pages using npm pluggin `gh-pages`  |
## Other key walkthroughs and articles  
In adition to the articles listed in my above notes, I made use of the following walkthroughs and articles for insight, inspiration, and help.
- [Udacity | Neighborhood Map [4] - Add Dynamic Markers to Google Maps](https://www.youtube.com/watch?v=nDJ00zO9X2U)
- See Ryan Waite's link below

Utility functions made use of functions from the following and are credited in `Utilities.js` :
-  **Project_Code_5_BeingStylish.html in ud864 on GitHub from Udacity course**
-  [Ryan Waite youtube coding session](https://www.youtube.com/watch?v=5J6fs_BlVC0&t=1298s)
-  [Google fetch article](https://developers.google.com/web/updates/2015/03/introduction-to-fetch)
---
# Instructions from course Project Overview  
From the course Project Overview, we create an app that fulfills the [Project Rubric](https://TODO) See also, #1 [...FENDp7/issues/1](https://github.com/rudimusmaximus/FENDp7/issues/1) for checklist.

## App Functionality
In this application, the main page displays a map of at least 5 places.
The app should have a way to list items that are marked on the map. 
Ability to filter and to provide additional information as indicated in the rubric.

# DESIGN_NOTES

**Task**: Create a React app that lets us interact with a set of filterable places and information from mulitple APIs.

**About State**: 
Because we are using multiple APIs, let's use an array of promises for getting our information (maybe).
See also, [Thinking in React Guide](https://reactjs.org/docs/thinking-in-react.html)
See notes in lessons learned especially number 13.

**React**
Lot's of lessons learned and varying approaches to React.
Key stubling blocks were:
- order of processing
- context for variables
- use of class components vs stateless functional components
- use of prop types enabling certain onClick function calls!
- approaches on google maps creation and iteration of markers and info windows
- off screen menu approach with media queries where we choose to mandate sidebar beyond certain point
- creating my own Json API info service
- Comits were frequent and key releases tagged, so feel free to review history of you want to witness the struggle. 

## Mock
see instructions in course.
During early dev, used a working list of to do items built into the code; then, moved to checklisted issues.

## Glo Board
Made use of GitKraken Glo board to access simple 'submit' checklist (see issue 1). Note, these are accessible from web, mobile iOs, and inside atom editor as well.

---  

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

## npm deploy (see Lessons Learned note 16)
