const { mkdir, writeFile } = require( 'node:fs/promises' );
const { join } = require( 'node:path' );

const createFoldersAndFiles = async (path, baseFolder, folder, file, folderCount, fileCount) => {
  try {
    for (let i = 1; i <= folderCount; i++) {
      await mkdir( join( path, baseFolder, `${folder}${i}` ), { recursive: true } );
      for (let x = 1; x <= fileCount; x++) {
        await writeFile( join( path, baseFolder, `${folder}${i}`, `${file}${x}.txt` ), `This is ${file} #${x} in ${folder} #${i}` );
      }
    }
  } catch (e) {
    throw new Error( e.message );
  }
};

module.exports = {
  createFoldersAndFiles
};