import * as path from 'path';
import { FileUtil } from '../utils/fileUtil';
import { IAngularType } from './IAngularType';
// import { Controller } from './controller';
// import { Template } from './template';

export class Route extends IAngularType {

    // private controller: Controller;
    // private template: Template;
    private routeName: string;

    public setRouteName(name: string): void {
        this.routeName = name;
    }

    public convert(): IAngularType {
        console.log(`Processing: ${path.basename(this.filePath)} | Route Name: ${this.routeName}`);

        return this;
    }

    public parse(): void {
        //TODO: find the controller and template
    }

    public toFile(): void {
        const outputFilePath: string = FileUtil.getOutputFilePath(this.filePath);
        console.log(`    Creating file: ${outputFilePath}`);

        FileUtil.toFile(FileUtil.getOutputFilePath(this.filePath), this.toCode());
    }

}
