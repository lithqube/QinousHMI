# Frontend

This is the Qinous Frontend.
It is written in [Typescript](http://www.typescriptlang.org/), uses [React](https://facebook.github.io/react/) with Redux and [webpack](https://github.com/webpack/webpack) for creating production and development builds. See additional information on why and how we use these components below.

## Install

Make sure you have [Node](https://nodejs.org/en/) and NPM (Node Package Manager) installed on your machine. 

Node comes with NPM installed. However, NPM gets updated more frequently than Node does, so you'll want to make sure it's the latest version using `npm install npm -g`.

Then, install all product and compile-time dependencies locally in the project folder using `npm install`.

## Build and deploy

`npm run deploy` builds and deploys the project for production use. (The target is currently set in `config/deployment.js` but this will likely change.)

## Build

`npm run build` builds the application for production. All relevant files will be in the folder `build/`.

`npm run clean` removes the build folder.

## Test

`npm run test` runs all unit tests. (TODO not yet run automatically on deployment)

## Develop

Because of WebMI it’s not possible to run the application on a locally running development server like webpack-dev-server. The application has to run on the target server.

`npm run dev` will start Webpack in watch-mode: Each time a file changes, we rebuild and upload the app to the target server.

`npm run tdd` runs all unit tests each time a file changes.

## Folder Structure

- `build/` (generated, not in repository) Contains the built application that can be deployed. Appears after `npm build`.
- `config/` Contains build configurations.
- `node_modules/` (generated, not in repository) Contains all installed dependencies, appears after `npm install`.
- `src/`
    - `common/` Code that is not project-specific, e.g. commonly used utilities.
    - `components/` React components of the application.
    - `locale/` Holds all localized strings.
    - `model/` The model and service layer, using WebMI.
    - `resources/` Resources like images, icons, fonts, CSS, etc.
    - `main.tsx` The main entry to the application.
    - `declarations.d.ts` Declaring common types and modules for Typescript that are not written in Typescript.
    - `favicon.ico` The favicon for the website.
    - `tsconfig.json` Typescript Compiler settings.
- `test/` Unit tests, all files ending in `.spec.ts` will be run.
- `index.html` Template for the final index.html you'll see in the `build` folder.
- `mocha.opts` Settings for the unit test runner `mocha`.
- `package.json` All dependencies for final app as well as development-specific dependencies only needed at compile-time.

## Style Guide

- Indent using 4 spaces
- No Typescript compiler warnings (using strictNullChecks)
- For now, we use SASS and bundle to a single external CSS file. We’re not using CSS Modules for each React component. The final CSS file is imported in `main.tsx`.

## How we use Webpack

This application uses webpack's capability to require/import assets in the source code in order to bundle them together with the final application. 

Some examples: Wrapping Bachmann’s webMI.js is done using a raw importer (see `model/WebMI.ts`) because it’s not designed to be used as a module. SVG-Icons are also imported as raw SVG and placed directly in HTML. That way we can easily color them using CSS. Keep these use-cases in mind when thinking about changing the bundling technology.

We don’t bundle CSS and font files together with the source code, though.

## Why we use React

We use React as our view layer in order to build our UI as a collection of components with clearly defined inputs, outputs and lifecycle methods. Have a look at the examples [here](https://facebook.github.io/react/index.html) and make sure you read the introductory chapters of the [documentation](https://facebook.github.io/react/docs/why-react.html) and the [lifecycle methods](https://facebook.github.io/react/docs/component-specs.html).

## Why we use Redux

We use Redux because it allows us to think about our application in the following way:

- There is a single object (called *store*) that describes the state of the application. For example the component tree and the selected node are stored here. This is just a simple JS object in this style:
```
store = {
   systemNode: rootNodeOfAComponentTree,
   selectedNode: someSelectedNode
}
```


- Changing the selected node for example then means updating the entry in this store. That’s all that we have to do if you click on an item in the navigation.
- All interface components reflect this application state automatically. To follow the example above: User clicks on a navigation item. This in turn *dispatches* an *action* to update the application state in the *store*. After this everything else works automatically: The navigation component and the view component that shows details about the currently selected node are updated automatically because they’ve defined by us to ‘react’ to changes of this specific store entry. That’s what the binding library ’react-redux’ is taking care of.

We’re not using Redux to describe the entire state of the application, though. In some cases the additional boilerplate code it introduces is not worth it.

One example for that is a component called `LiveValue`. The application shows a lot of live data that is updated on-the-fly, so called subscriptions to data-points. We could route all of them through Redux but this would introduce quite a bit more code and doesn’t add any value to our use-case. Instead, it should be as simple as possible to display a constantly updated value of a data point. Just write:

```
<LiveValue dp="./SOMEWHERE/.my.datapoint"/>
```

That’s it. The component will automatically take care of subscribing/unsubscribing, displaying loading and error states and we only have 1 place where the display and need of this data-point are defined.

Things we *do* store in Redux:

- The component tree
- The currently selected node in the tree
- Which view is active (Monitoring, Diagrams, Protocol, etc.)
- A list of all active events
- The current user

These are examples of state that is fundamental to the app, is interesting to a number of components (e.g. list of alarms) or can be manipulated in different places (e.g. the active selected node). We use Redux here because it solves this problem well, integrates nicely with React components and doesn’t add a lot of dependency code. Read up on the basics [here](http://redux.js.org/docs/basics/DataFlow.html).

