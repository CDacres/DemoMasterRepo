import { cleanDir } from './lib/fs';

/**
 * Cleans up the output (build) directory.
 */
function clean() {
  return Promise.all([
    cleanDir('dist/public/assets/*', {
      nosort: true,
      dot: true,
      ignore: ['dist/public/assets/.git'],
    }),
  ]);
}

export default clean;
