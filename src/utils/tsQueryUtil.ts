import * as ts from 'typescript';

export class TsQueryUtil {

    public static sourceFileToString(tree: ts.SourceFile): string {
        const printer: ts.Printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed,
        });

        return printer.printFile(tree);
    }

    public static nodeToString(node: ts.Node): string {
        const printer: ts.Printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed,
        });

        return printer.printNode(ts.EmitHint.Unspecified, node, node.getSourceFile());

    }

}
