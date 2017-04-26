# helpwin-react

## Installation

```bash
$ npm install     # Install project dependencies
$ npm start       # Compile and launch
```
If everything works, you should see the following:

<img src="http://image.prntscr.com/image/e44e998bb57d45f0b16f6fb1ddebffb8.png" />

> http://localhost:3000

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:8080`. HMR will be enabled in development.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`prod`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`lint`|Lint all `.js` files.|

> Note: Testing and linting are not yet ready, per the flux project update!
