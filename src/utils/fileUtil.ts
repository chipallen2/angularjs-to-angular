import * as fs from 'fs';
import * as path from 'path';

export class FileUtil {

    public static toCode(filePath: string): string {
        return fs.readFileSync(filePath, 'UTF-8');
    }

    public static toFile(filePath: string, code: string): void {
        FileUtil.makeDirectoriesRecursive(filePath);
        fs.writeFileSync(filePath, code, 'UTF-8');
    }

    public static getOutputFilePath(filePath: string): string {
        let outputFileName: string = path.join('./upgrade', filePath.replace(process.cwd(), ''));

        if (/src\/(data|img)/.test(outputFileName)) {
            outputFileName = outputFileName.replace('src', 'src/assets');
        }

        return outputFileName;
    }

    protected static makeDirectoriesRecursive(filePath: string): void {
        const dirname: string = path.dirname(filePath);
        if (fs.existsSync(dirname)) return;

        FileUtil.makeDirectoriesRecursive(dirname);
        fs.mkdirSync(dirname);
    }

}
