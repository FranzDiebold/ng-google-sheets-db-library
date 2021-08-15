import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function ngAdd(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());

    context.logger.info(
      'ℹ️  You need to add "GoogleSheetsDbService" to your app\'s module as a "provider" and Angular\'s "HttpClientModule" to the "imports".'
    );

    return tree;
  };
}
