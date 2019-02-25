This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

## Small items To Do:
+ Add .env file for index.js main app file and specify api path conditionally dev/prod

## Don't forget:
+ Add redux-saga if you need complex async control flow
+ Remember to check every variable has valid value before using it in further code
+ Remember that connect passes in the container props to the decorated component automatically. You don't need to forward it throught the container to the decorated comp. Thus check every component default props to include the forwarded props from the container component.

## Features TO DO (spec):
1. Add Product Listing
1. Add Cart
1. Add Several types of products
1. Add +/- buttons for cart items quantity
1. Add Express local development server with file DB
1. Write routes from api-server and configure CORS
1. Add api-server in run scripts
1. Add Redux and minimal middleware
1. Add api-middleware to redux and write basic RSA actions
1. Commit to Github
1. Add component which creates and removes products from DB (blend admin mode in)
1. Add StrictMode and an ErrorBoundary
1. Add tests and switch to TDD (see https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/shopping-cart and https://redux.js.org/recipes/writing-tests)
1. Compare with JS Clean Code Shopping Cart guide
1. Add a loading spinner (hardcode to 2s)
1. Integrate a 3rd party Map API to choose user's location
1. Deploy app on a public server
..+ https://facebook.github.io/create-react-app/docs/deployment
..+ Add environment files -- see docs above
1. Eject from CRA and Configure Webpack 
1. Upgrade to TypeScript
1. Add a notification display component with internal stack (if you have 3 requests outstanding, you need to wait for all of them to end before hiding the loading spinner).
1. Add Drag and Drop for products -> SideCart
1. Add ToolTips & Walkthrough Tips
1. Add Comments / Q&A in product details
1. Make a Checkout section with a Form and Thank You Page
1. Break APP into pages via React Router Redux
1. Use a modal to display large product images
1. Add Info Pages (About Us, FAQ, Location, Terms)
1. Add HomePage with Categories and Slideshow
1. Add Recommended/Popular Products Section
1. Add NavBar Menu
1. Add configurable Top Bar for critical info
1. Add BreadCrumbs e.g. Home / Products / Category / Product
1. Add Footer with links and Social Media Buttons
1. Refactor Code 1
1. Add more Redux middleware 
..+ Analytics Middleware https://rangle.gitbook.io/redux-beacon/getting-started-redux-users
..+ Offline queue Middleware https://github.com/mathieudutour/redux-queue-offline
..+ Something like https://github.com/joshwcomeau/redux-vcr
1. Configure NodeJS/Express backend HTTP headers
1. Add HTTP2 server and other middleware to Express
1. Put the backend into AWS Serverless + S3
1. Add Authentication (AWS Cognito) & login form/page
1. Add Continuous Integration/Delivery
1. Add Signup Form
1. Add Admin Page with CMS for adding products
1. Add Admin Page for Stock Adjustment
1. Add Admin Page for Order Management
1. Add favorites list
1. Add Offline Capability
1. Optimize for Mobile View
1. Add Product Filtering (& search using Algolia)
1. Add OrderBy Sorting Feature
1. Add I18N feature
1. Make it a PWA/Isomorphic App & Optimize Critial Rendering Path
1. React Profiling and Performance Optimizations
1. Add GraphQL/Apollo
1. Secure SPA
1. Optimize for eCommerce UX 
1. Add Basic A11Y features
1. Refactor Code 2
1. Add Blog
1. Integrate Analytics on frontend
1. Integrate HotJar or similar
1. Add Admin Page for Analytics Data
1. Add Order History for users
1. Add Promotion Support
1. Add Account Data Update CMS for logged-in users
1. Add advanced UX improvements (See Bret Victor's Magic Ink & Tufte)
1. See React Redux Docs for further ideas of what you can do
1. See Shopify Platform and My Plugin List for more ideas
1. ? Add Material Design UI kit
1. Refactor Code 3

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
