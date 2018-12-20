#!/usr/bin/env node

// import glob from'glob';
// import * as inquirer from 'inquirer';
// import * as path from 'path';
// import './polyfills';
//
// const argv = require('yargs') // Reference -> https://github.com/yargs/yargs
//     .option('components', {
//         alias: 'c',
//         describe: 'Processes the components. Provide a glob in quotes.',
//     })
//     .option('services', {
//         alias: 's',
//         describe: 'Processes the services. Provide a glob in quotes.',
//     })
//     .option('serviceSpecs', {
//         describe: 'Processes the non component spec files',
//     })
//     .option('templates', {
//         alias: 't',
//         describe: 'Processes the templates. Provide a glob in quotes.',
//     })
//     .option('routes', {
//         alias: 'r',
//         describe: 'Processes an entire route page (upgrades the html, component, and services). Provide a glob to the file with the route in quotes.',
//     })
//     .option('routeName', {
//         alias: 'n',
//         describe: 'Use along with the -r flag to specify the route name to upgrade.',
//     })
//     .help('h')
//     .argv;

/* Process A Whole Route including the Component and Template */
// if (argv.routes) {
//     inquirer.prompt([{ name: 'something', message: 'Do you like this' }])
//         .then((answer) => {
//             console.log(answer);
//             process.exit(0);
//         });
//     const tool = require('./tools/process-routes');
//     const files = glob.sync(path.join(process.cwd(), argv.routes));
//     tool(files, argv.routeName);
//     process.exit(0);
// }

// /* Process Components */
// if (argv.components) {
//     const globPath: string = path.join(process.cwd(), argv.components);
//     processComponents(globPath);
//     process.exit(0);
// }
//
// /* Process Services */
// if (argv.services) {
//     const globPath = path.join(process.cwd(), argv.services);
//     processServices(globPath);
//     process.exit(0);
// }
//
// /* Process Non Component Spec Files */
// if(argv.serviceSpecs) {
//     const globPath = path.join(process.cwd(), argv.serviceSpecs);
//     processServiceSpecs(globPath);
//     process.exit(0);
// }
//
// /* Process Templates */
// if (argv.templates) {
//     const globPath = path.join(process.cwd(), argv.templates);
//     processTemplates(globPath);
//     process.exit(0);
// }

console.log('No arguments provided, nothing converted');
process.exit(0);

// function processComponents(globPath: string) {
//     const tool = require('./tools/process-components');
//     const files = glob.sync(globPath);
//     tool(files);
// }
//
// function processServices(globPath: string) {
//     const tool = require('./tools/process-services');
//     const files = glob.sync(globPath);
//     tool(files);
// }
//
// function processServiceSpecs(globPath: string) {
//     const tool = require('./tools/process-service-specs');
//     const files = glob.sync(globPath);
//     tool(files);
// }
//
// function processTemplates(globPath: string) {
//     const tool = require('./tools/process-templates');
//     const files = glob.sync(globPath);
//     tool(files);
// }
