/* tslint:disable:only-arrow-functions */

export default function attacher(options: any): any {

    return (tree: any, file: any): any => {
        file.data.controller = options.controller;
    };
}
