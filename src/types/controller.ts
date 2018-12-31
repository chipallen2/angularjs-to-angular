import * as q from '@phenomnomnominal/tsquery';
import * as ts from 'typescript';

import { AgTableOptions } from '../interfaces/agGridTable';
import { IAngularType } from './IAngularType';
import { Template } from './template';

export class Controller extends IAngularType {

    public template!: Template;

    public convert(): IAngularType {
        this.parse();

        return this;
    }

    protected parse(): void {
        // const
    }

    public toFile(): void {
        //TODO: fill out
    }

    public convertCrudTableParams(variableName: string): AgTableOptions | undefined {
        const variables: ts.BinaryExpression[] = q.tsquery<ts.BinaryExpression>(this.ast, `BinaryExpression:has([name="${variableName}"])`);
        if (!variables.length) throw new Error('CrudTable params not found');

        const paramsAst: ts.ObjectLiteralExpression[] = q.tsquery<ts.ObjectLiteralExpression>(variables[0], `NewExpression > ObjectLiteralExpression`);
        if (!paramsAst.length) throw new Error('CrudTable params failed to parse');


        const printer: ts.Printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed,
        });

        // @ts-ignore
        const options: string = printer.printNode(ts.EmitHint.Unspecified, paramsAst[0], paramsAst[0].getSourceFile());
        const agOptions: AgTableOptions = JSON.parse(options);

        return agOptions;
    }

}
