import * as fs from 'fs';
import * as path from 'path';

import { IStringMap } from '../interfaces/generics';

/**
 * Uses an instance to store local data and avoid re-querying the same information later.
 * Call heimdallUtil like a static method.
 *
 * Example (note the use of lowercase heimdallUtil rather than the class HeimdallUtil):
 * import { heimdallUtil } from '../utils/heimdallUtil;
 * const path: string = heimdallUtil.allRepoPath;
 */
export class HeimdallUtil {

    //Loaded at startup
    private allRepoPath: string = '';
    private angularjsScriptFiles: IStringMap = {};

    //Loaded lazily
    private controllers: IStringMap = {};
    // private services: IStringMap = {};

    constructor() {
        if (!this.populateAllRepoPath()) return;

        //ui-heimdall Files
        this.populateScriptFiles(
            `${this.allRepoPath}/ui-heimdall/src/main/webapp/app/scripts.html`,
            (p: string) => p.includes('{contextRoot}/app/heimdall'),
            (p: string) => {
                return [
                    `${this.allRepoPath}/ui-heimdall/src/main/webapp/app/heimdall`,
                    // tslint:disable-next-line:no-invalid-template-strings
                    `${p.replace('<script type="text/javascript" src="${contextRoot}/app/heimdall', '')}`,
                ]
                    .join('')
                    .replace('"></script>', '');
            },
            this.angularjsScriptFiles,
        );

        //ui-core Files
        this.populateScriptFiles(
            `${this.allRepoPath}/ui-core/src/main/webapp/app/core-scripts.html`,
            (p: string) => p.includes('{contextRoot}/app') && !p.includes('grunt-noop.js'),
            (p: string) => {
                return [
                    `${this.allRepoPath}/ui-core/src/main/webapp/app`,
                    // tslint:disable-next-line:no-invalid-template-strings
                    `${p.replace('<script type="text/javascript" src="${contextRoot}/app', '')}`,
                ]
                    .join('')
                    .replace('"></script>', '');
            },
            this.angularjsScriptFiles,
        );
    }

    public getControllerPath(name: string): string | undefined {
        if (this.controllers[name]) return this.controllers[name];

        const regex: RegExp = new RegExp(`controller\\(\\s?'${name}'\\s?,`);

        const filePathIndex : number = Object.values(this.angularjsScriptFiles).findIndex((file: string) => regex.test(file));
        if (filePathIndex === -1) return undefined;

        this.controllers[name] = Object.keys(this.angularjsScriptFiles)[filePathIndex];

        return this.controllers[name];
    }

    public getTemplatePath(filePrefix: string): string {
        return `${this.allRepoPath}/ui-heimdall/src/main/webapp/app/${filePrefix}`;
    }

    public populateAllRepoPath(): boolean {
        const parsedPath: path.ParsedPath = path.parse(process.cwd());
        const directories: string[] = parsedPath.dir.split('/');
        const allIndex: number = directories.indexOf('all');
        if (allIndex === -1) return false;

        this.allRepoPath = path.resolve(parsedPath.root, ...directories.slice(0, allIndex + 1));

        return true;
    }

    private populateScriptFiles(scriptFile: string, filterCallback: any, mapCallback: any, fileArray: IStringMap): void {
        const heimdallScriptFile: string = fs.readFileSync(scriptFile, 'UTF-8');
        const heimdallScriptPaths: string[] = heimdallScriptFile.split('\n')
            .filter(filterCallback)
            .map(mapCallback);

        heimdallScriptPaths.forEach((path: string) => {
            fileArray[path] = fs.readFileSync(path, 'UTF-8');
        });
    }

}

export const heimdallUtil: HeimdallUtil = new HeimdallUtil();
