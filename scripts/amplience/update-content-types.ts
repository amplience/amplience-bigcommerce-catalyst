import {Arguments, Argv} from 'yargs';
import {execSync} from 'child_process';
import {compile} from 'handlebars';
import {promises, mkdirSync, rmSync} from 'fs';
import {tmpdir} from 'os';
import {join} from 'path';
import {nanoid} from 'nanoid';
import {Context} from './cli';
import {
  ContentType,
  ContentTypeVisualization,
  DynamicContent,
  HalResource,
  Page,
  Pageable,
  Settings,
  Sortable,
} from 'dc-management-sdk-js';
const contentTypesPatch: any = require('../../config/amplience/default');

export const connectSDK = (context: Context) => {
  return new DynamicContent({
    client_id: context.clientId,
    client_secret: context.clientSecret,
  });
};

export const paginator = async <T extends HalResource>(
  pagableFn: (options?: Pageable & Sortable) => Promise<Page<T>>,
  options: Pageable & Sortable = {},
): Promise<T[]> => {
  const currentPage = await pagableFn({...options, size: 20});
  if (
    currentPage.page &&
    currentPage.page.number !== undefined &&
    currentPage.page.totalPages !== undefined &&
    currentPage.page.number + 1 < currentPage.page.totalPages
  ) {
    return [
      ...currentPage.getItems(),
      ...(await paginator(pagableFn, {
        ...options,
        page: currentPage.page.number + 1,
      })),
    ];
  }
  return currentPage.getItems();
};

export const updateArgs = (yargs: Argv) => {
  return yargs
    .option('hubId', {
      describe: 'amplience hub id',
      required: true,
      type: 'string',
    })
    .option('prodUrl', {
      describe: 'production url',
      required: true,
      type: 'string',
    })
    .option('hubId', {
      describe: 'amplience hub id',
      required: true,
      type: 'string',
    })
    .option('clientId', {
      describe: 'amplience client id',
      required: true,
      type: 'string',
    })
    .option('clientSecret', {
      describe: 'amplience client secret',
      required: true,
      type: 'string',
    });
};

export const updateHandler = async (
  context: Arguments<Context>,
): Promise<any> => {
  const client = connectSDK(context);
  const hub = await client.hubs.get(context.hubId);
  const contentTypes = await paginator(hub.related.contentTypes.list);

  // Go through content types to update
  contentTypesPatch.contentTypes.forEach(async (contentTypePatch: any) => {
    console.log(`Searching type ${contentTypePatch.contentTypeUri}`);
    const contentType = contentTypes.find(
      (item: ContentType) =>
        item.contentTypeUri === contentTypePatch.contentTypeUri,
    );
    if (contentType) {
      console.log(`... processing type ${contentTypePatch.contentTypeUri}`);

      // Use specific visualizations or default if none are provided
      const visualizations = contentTypePatch.visualizations
        ? contentTypePatch.visualizations
        : contentTypesPatch.defaultVisualizations;
      visualizations.forEach(async (vis: any) => {
        // Filter out and replace vis
        if (contentType.settings?.visualizations) {
          const filteredVis = contentType.settings.visualizations.filter(
            (item: ContentTypeVisualization) => item.label !== vis.label,
          );
          vis.templatedUri = vis.templatedUri.replace(
            '{{prodUrl}}',
            context.prodUrl,
          );
          console.log(`... adding visualization ${vis.label}`);
          filteredVis.push(vis);
          contentType.settings.visualizations = filteredVis;
        }
      });
      console.log(`... updating type ${contentTypePatch.contentTypeUri}`);
      await contentType.related.update(
        new ContentType({
          ...contentType,
        }),
      );
    } else {
      console.log(`Cannot find type ${contentTypePatch.contentTypeUri}`);
    }
  });

  // console.log(`Updating settings...`);
  // const masterLocale = hub.settings?.localization?.locales[0];
  // await hub.related.settings.update(
  //   new Settings({
  //     devices: [],
  //     applications: [],
  //     localization: {
  //       locales: [masterLocale],
  //     },
  //   }),
  // );

  try {
    console.log(`Done!`);
  } finally {
  }
};
