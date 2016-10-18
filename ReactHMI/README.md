# Frontend

This is the Qinous Frontend. It can monitor and control a Qinous energy management system.

It is written in Typescript, uses React as its view and Redux as its model layer. Development and production bundles are created using Webpack. Below you can find more information on why and how we use these dependencies.

## Install

Make sure you have [Node](https://nodejs.org/en/) and NPM (Node Package Manager) installed on your machine. 

Node comes with NPM installed. However, NPM gets updated more frequently than Node does, so you'll want to make sure it's the latest version using `npm install npm -g`.

Then, install all product and compile-time dependencies locally in the project folder using `npm install`.

## Build and deploy

`npm run deploy` builds the project and deploys it for production use. Files are minified and compressed, assets like icons that are below a given size are inlined either in the corresponding CSS- or JS-Files.

The target is currently set in `config/deployment.js` but this will likely change.

## Build

`npm run build` builds the application for production. All relevant files will be in the folder `build/`.

`npm run clean` removes the build folder.

## Test

`npm run test` runs all unit tests. Right now, the unit tests are not run automatically when you build or deploy.

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

This application uses [webpack's](https://github.com/webpack/webpack) capability to require/import assets in the source code in order to bundle them together with the final application. 

Some examples: Wrapping Bachmann’s webMI.js is done using a raw importer (see `model/WebMI.ts`) because it’s not designed to be used as a module. SVG-Icons are also imported as raw SVG and placed directly in HTML. That way we can easily color them using CSS. Keep these use-cases in mind when thinking about changing the bundling technology.

We don’t bundle CSS and font files together with the source code, though. They are both loaded as external resources.

## Why we use Typescript

[Typescript](http://www.typescriptlang.org/) allows us to use types in order to improve documentation and tooling, like for example refactoring. We use ‘strict null checks’ in order to catch or avoid `undefined` or `null` values. Keep it mind though, that Typescript only gives us type-safety on compile-time, not during runtime.

We also use Typescript in order to be able to use new ES2015 features (or even newer ones) while still supporting older browsers by transpiling down to ES5. Be aware that we don’t *polyfill all the things* but only as few features as necessary. See `config/polyfills.js` for more details.

Typescript also allows us to use React-specific JSX syntax for templates thus eliminating the need for Babel completely.

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

