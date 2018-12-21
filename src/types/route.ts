import * as q from '@phenomnomnominal/tsquery';
import * as _ from 'lodash';
import * as path from 'path';
import { ExpressionStatement, PropertyAssignment, SourceFile } from 'typescript';
import { FileUtil } from '../utils/fileUtil';
import { heimdallUtil } from '../utils/heimdallUtil';
import { IAngularType } from './IAngularType';

// import { Controller } from './controller';
// import { Template } from './template';

export class Route extends IAngularType {

    // private controller: Controller;
    // private template: Template;
    private routeName: string = '';

    public setRouteName(name: string): void {
        this.routeName = name;
    }

    public convert(): IAngularType {
        console.log(`Processing: ${path.basename(this.filePath)} | Route Name: ${this.routeName}`);

        const routes: ExpressionStatement[] = q.tsquery<ExpressionStatement>(this.ast, 'ExpressionStatement > CallExpression > ArrayLiteralExpression > FunctionExpression > Block > ExpressionStatement');
        if (!routes.length) throw new Error('No routes found');

        const foundRoute: ExpressionStatement | undefined = routes.find((route: ExpressionStatement) => _.get(route, 'expression.arguments[0].text') === this.routeName);
        if (!foundRoute) throw new Error(`No route found by that name: ${this.routeName}`);

        const controller: PropertyAssignment[] = q.tsquery(foundRoute, 'CallExpression > ObjectLiteralExpression > PropertyAssignment:has([name="controller"])');
        if (controller.length !== 1) throw new Error(`Controller not found in route`);

        const templateUrl: PropertyAssignment[] = q.tsquery(foundRoute, 'CallExpression > ObjectLiteralExpression > PropertyAssignment:has([name="templateUrl"])');
        if (templateUrl.length !== 1) throw new Error(`Template not found in route`);

        const controllerAst: SourceFile | undefined = heimdallUtil.getController(controller[0].initializer.getText().replace(/'/g, ''));

        return this;
    }

    public parse(): void {
        //TODO: find the controller and template
    }

    public toFile(): void {
        const outputFilePath: string = FileUtil.getOutputFilePath(this.filePath).replace(/\.js$/, '.ts');
        console.log(`    Creating file: ${outputFilePath}`);

        FileUtil.toFile(outputFilePath, this.toCode());
    }

}
