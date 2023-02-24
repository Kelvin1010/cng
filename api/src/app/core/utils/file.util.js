var path = require('path'),
  fs = require('fs');
const archiver = require('archiver');
const unzipper = require('unzipper');

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}


/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(sourceDir, outPath) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', err => reject(err))
      .pipe(stream)
      ;

    stream.on('close', () => resolve());
    archive.finalize();
  });
}

function unzipDirectory(zipFile, outPath) {
  fs.createReadStream(zipFile)
    .pipe(unzipper.Extract({ path: outPath }));
}

module.exports = {
  ensureDirectoryExistence,
  zipDirectory,
  unzipDirectory
}