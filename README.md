# angularjs-to-angular #
CLI that takes in angularjs files and outputs angular.

## Getting Started ##

### 1 - Run the following to install the project. ###

```
git clone git@github.com:chipallen2/angularjs-to-angular.git cd angularjs-to-angular npm install
```

### 2 - Link this project to your AngularJS app ###

You will make an npm link from the cli folder to your
angular.js project.

```
cd angularjs-to-angular npm link cd to the heimdall app folder (cd
all/ui-heimdall) npm link angularjs-to-angular
```

Now in your angular.js app run commands and your
new source code will be available the upgrade directory.
src/main/webapp/app/heimdall/setup/endpoints/endpoints.js

Example: `./node_modules/.bin/angularjs-to-angular -c="src/**/*.component.ts"`

## How It Works ##

The entry point of the script is under src/index.ts where it will take commandline arguments that will accept
blobs for component, service, service spec and template conversions. Each specific tool can be found
under a `src/tools/proces-[****].js` file. 

### Components ### 
**src/tools/process-components.js**

#### Places to hack #### 
* imports.get() - reads the AST and based on the code determines what

should be imported at the top of the new file _ decorator.get() - reads the AST and based on how the
template is defined will set up the component decorator with template or templateUrl. _
removeFromConstructor - takes in a list of arguments that you want to remove from the constructor
because they no longer exist in Angular _ processStringReplacements - Has a large 2 x N array with
the first column being a REGEX match and the second column representing what you want to replace it
with. _ updateReferences - Useful for updating the import references to maintain consistent import
paths. 

### Services ### 
**src/tools/process-services.js** 

#### Places to hack #### 
 - imports.get() - reads the AST and based on the code determines what should be imported at the top of the new file 
 - removeFromConstructor - takes in a list of arguments that you want to remove from the constructor because they no longer exist in Angular 
 - processStringReplacements - Has a large 2 x N array with the first column being a REGEX match and the second column representing what you want to replace it with. 
 - updateReferences - Useful for updating the import references to maintain consistent import paths. 

### Templates ### 
**src/lib/process-template.js** 

#### Places to hack #### 
 - The first section revolves around using cheerio (similar to JQuery) to search for specific elements and add or remove attributes 
 - The second section is a series of REGEX replace statements 

## Testing the Tool ## 
 - Run > `npm run testComponents` 
 - This will convert the test component files under tests/data/ and output to upgrade/ 
 - Run > `npm run testServices` 
 - This will convert the test service files under tests/data/ and output to upgrade/ 
 - Run > `npm run testServiceSpecs` 
 - This will convert the test service spec files under tests/data/ and output to upgrade/ 
 - Run > `npm run testTemplates` 
 - This will convert the test template files under tests/data/ and output to upgrade/ 
 - Run > `npm test` 
 - Executes the unit tests using AvaJS 
 
 ## Debugging The Script Locally ## 
 The best way to debug the script is using intellij. 
 You will create a debug configuration in intellij for npm and then you can set breakpoints to debug live. 
 
 - Make sure you did the npm link steps in the getting started. 
 - Inside the angularjs application add a script like the following to the package.json (for example edit all/ui-heimdall/package.json). Change the arguments to the ones you want. `"angularJsToAngular": "node $NODE_DEBUG_OPTION ./node_modules/.bin/angularjs-to-angular -r=\"<FILE >\""` 
 - Note the `node $NODE_DEBUG_OPTION` part at the front - this allows node to go into debug mode. 
 - Now create a new build configuration in intellij > choose NPM. Change the following settings 
    - Package.json > select the package.json 
    - Command > leave at `run` 
    - Script > choose `angularJsToAngular` 
    - Leave the rest alone and Hit OK 
 - Now just choose debug in intellij and you can add breakpoints and debug like normal. 

To aid in debugging you can paste the same file into https://astexplorer.net/ and choose Typescript as the compiler to view the AST easily.
