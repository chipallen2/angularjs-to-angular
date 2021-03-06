#!/usr/bin/env node

import chalk from 'chalk';
import * as path from 'path';

import { CliArguments } from './interfaces/cliArguments';
import './polyfills';
import { Route } from './types/route';

// noinspection TypeScriptValidateJSTypes
const argv: CliArguments = require('yargs')
    .option('path', {
        alias: 'p',
        array: true,
        describe: 'Provide a glob to the file path with the route in quotes.',
    })
    .option('name', {
        alias: 'n',
        array: true,
        describe: 'Specify the route name to upgrade in quotes',
    })
    .help('h')
    .argv;

if (!argv.path || !argv.name) {
    console.log(chalk.red('You must pass the file path and the name of the route to be converted'));
    console.log(chalk.red('Example: -p="/some/path" -n="/things/thing"'));
    process.exit(1);
}

/* Process A Whole Route including the Component and Template */
const filePaths: string[] = argv.path.map((filePath: string) => path.join(process.cwd(), filePath));

filePaths.forEach((filePath: string, index: number) => {
    const routeName: string = argv.name[index];

    const route: Route = (new Route(filePath));
    route.setRouteName(routeName);
    route
        .convert()
        .toFile();
});

process.exit(0);
