# angularjs-to-angular
CLI that takes in angularjs files and outputs angular.

## Getting Started ##

### 1 - Run the following to install the project. ###

```
git clone git@github.com:chipallen2/angularjs-to-angular.git
cd angularjs-to-angular
npm install
```

### 2 - Link this project to your AngularJS app ###
You will make an npm link from the cli folder to your angular.js project. 

```
cd angularjs-to-angular
npm link
cd <TO YOUR ANGULAR.JS APP DIRECTORY>
npm link angularjs-to-angular
```

Now in your angular.js app run commands and your new source code will be available the upgrade directory.

Example:

`./node_modules/.bin/angularjs-to-angular -c="src/**/*.component.ts"`

## How It Works ##
The entry point of the script is under src/index.js where it will take commandline arguments that will accept blobs for component, service, service spec and template conversions.  

Each specific tool can be found under a `src/tools/proces-[****].js` file.


### Components ###
**src/tools/process-components.js**

#### Places to hack ####
* imports.get() - reads the AST and based on the code determines what should be imported at the top of the new file
* decorator.get() - reads the AST and based on how the template is defined will set up the component decorator with template or templateUrl.
* removeFromConstructor - takes in a list of arguments that you want to remove from the constructor because they no longer exist in Angular
* processStringReplacements - Has a large 2 x N array with the first column being a REGEX match and the second column representing what you want to replace it with.
* updateReferences - Useful for updating the import references to maintain consistent import paths.


### Services ###
**src/tools/process-services.js**

#### Places to hack ####
* imports.get() - reads the AST and based on the code determines what should be imported at the top of the new file
* removeFromConstructor - takes in a list of arguments that you want to remove from the constructor because they no longer exist in Angular
* processStringReplacements - Has a large 2 x N array with the first column being a REGEX match and the second column representing what you want to replace it with.
* updateReferences - Useful for updating the import references to maintain consistent import paths.


### Templates ###
**src/lib/process-template.js**

#### Places to hack ####
* The first section revolves around using cheerio (similar to JQuery) to search for specific elements and add or remove attributes
* The second section is a series of REGEX replace statements


## Testing the Tool ##
* Run > `npm run components`
    * This will convert the test component files under tests/data/ and output to upgrade/
* Run > `npm run services`
    * This will convert the test service files under tests/data/ and output to upgrade/
* Run > `npm run serviceSpecs`
    * This will convert the test service spec files under tests/data/ and output to upgrade/
* Run > `npm run templates`
    * This will convert the test template files under tests/data/ and output to upgrade/
* Run > `npm test`
    * Executes the unit tests using AvaJS