const { readdir, stat } = require( 'node:fs/promises' );
const { join } = require( 'node:path' );

const logsFoldersAndFiles = async (path) => {
  try {
    const items = await readdir( path );

    for (const item of items) {
      const newPath = join(path, item);
      const stats = await stat( newPath );

      if (stats.isFile()) {
        console.log(`${newPath} - FILE`);
      } else {
        console.log(`${newPath} - FOLDER`);
        await logsFoldersAndFiles(newPath);
        console.log('----------------------------------------------------------------------------');
      }
    }
  } catch (e) {
    throw new Error( e.message );
  }
};

module.exports = {
  logsFoldersAndFiles
};