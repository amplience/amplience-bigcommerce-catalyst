import Yargs from 'yargs/yargs';
import {Arguments, Argv} from 'yargs';
import {
  updateArgs,
  updateHandler as updateHandler,
} from './update-content-types';

export type Context = {
  automationDir: string;
  tempDir: string;
  mapFile: string;
  hubId: string;
  clientId: string;
  clientSecret: string;
  contentRepoId: string;
  slotsRepoId: string;

  shopifyUrl: string | null;
  shopifyVersion: string | null;
  authSecret: string | null;
  authClientId: string | null;
  siteId: string | null;
};

const configureYargs = (yargInstance: Argv): Promise<Arguments> => {
  return new Promise(async (resolve): Promise<void> => {
    let failInvoked = false;
    const isYError = (err?: Error | string): boolean =>
      err instanceof Error && err.name === 'YError';
    const failFn = (msg: string, err?: Error | string): void => {
      // fail should only be invoked once
      if (failInvoked) {
        return;
      }
      failInvoked = true;

      if ((msg && !err) || isYError(err)) {
        yargInstance.showHelp('error');
      } else if (err) {
        console.log(err);
        process.exit(0);
      }
    };

    const argv = yargInstance
      .command(
        'update-content-types',
        'Update Content Types',
        updateArgs,
        updateHandler,
      )
      .strict()
      .demandCommand(1, 'Please specify at least one command')
      .exitProcess(false)
      .showHelpOnFail(false)
      .fail(failFn).argv;

    resolve(argv);
  });
};

export default async (
  yargInstance = Yargs(process.argv.slice(2)),
): Promise<Arguments | void> => {
  return await configureYargs(yargInstance);
};
