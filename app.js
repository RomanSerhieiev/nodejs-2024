const { createFoldersAndFiles } = require( './helpers/createFoldersAndFiles' );
const { logsFoldersAndFiles } = require( './helpers/logsFoldersAndFiles' );
const { join } = require( 'node:path' );

const baseFolder = 'baseFolder'
const folder = 'folder'
const file = 'file'

createFoldersAndFiles( process.cwd(), baseFolder, folder, file, 5, 5 )
  .then( () => {
    logsFoldersAndFiles( join( process.cwd(), baseFolder ) )
      .then();
  } );