import * as rehype from 'rehype';
import * as vfile from 'to-vfile';
import { VFile } from 'vfile';
import { IAngularType } from './IAngularType';

// import * as unified from 'unified';
// import * as parse from 'rehype-parse';
// import * as stringify from 'rehype-stringify';

import templateCrudTable from '../unified-plugins/templateCrudTable';
import templateSetController from '../unified-plugins/templateSetController';
import { FileUtil } from '../utils/fileUtil';
import { UnifiedTemplateUtil } from '../utils/unifiedTemplateUtil';
import { Controller } from './controller';

export class Template extends IAngularType {

    public controller!: Controller;

    protected originalCode!: string;
    protected code!: string;

    constructor(filePath: string) {
        super(filePath);
        this.originalCode = FileUtil.toCode(filePath);
        this.code = this.originalCode;
    }

    public convert(): IAngularType {
        this.parse();

        return this;
    }

    protected parse(): void {
        const file: VFile = vfile.readSync(this.filePath);

        rehype()
            .use(templateSetController, { controller: this.controller })
            .use(templateCrudTable)
            .process(file)
            .then(
                (file: any) => {
                    console.log(String(file));
                },
                (err: any) => {
                    console.error(String(err));
                },
            );
        // const something: any = UnifiedTemplateUtil.hasCrudTable();
    }

    public toFile(): void {
        //TODO: fill out
    }

}
