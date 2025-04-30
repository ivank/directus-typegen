import { createCommand } from '@commander-js/extra-typings';
import snapshot from './snapshot.js';
import server from './server.js';
export default createCommand('directus-typegen')
  .description('Generate TypeScript types from Directus schema snapshots')
  .version('0.2.0')
  .addCommand(snapshot())
  .addCommand(server());
