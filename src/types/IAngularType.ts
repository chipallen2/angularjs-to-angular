import * as tsquery from '@phenomnomnominal/tsquery';
import * as ts from 'typescript';
import { FileUtil } from '../utils/fileUtil';

export abstract class IAngularType {

    protected filePath: string;
    protected originalAst: ts.SourceFile;
    protected ast: ts.SourceFile;

    constructor(filePath: string) {
        this.filePath = filePath;
        // @ts-ignore
        this.originalAst = tsquery.ast(FileUtil.toCode(filePath));
        this.ast = { ...this.originalAst } ;
    }

    /**
     * Main method to call to convert that angularJS thing to a new AST
     */
    public abstract convert(): IAngularType;

    /**
     * Write the converted ast things to their final converted files.
     */
    public abstract toFile(): void;

    /**
     * Convert the AST back into normal code
     */
    public toCode(): string {
        const printer: ts.Printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed,
        });

        return printer.printFile(this.ast);
    }

    /**
     * Main method to be used internally to parse the file, identify various things inside of it, then later keep using those things during the convert step.
     */
    protected abstract parse(): void;

}
