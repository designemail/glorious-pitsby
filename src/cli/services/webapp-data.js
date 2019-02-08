const path = require('path');
const { fileService } = require('./file');

const _public = {};

_public.save = (filename, data) => {
  fileService.write(buildFullFilepath(filename), JSON.stringify(data));
};

function buildFullFilepath(filename){
  return path.join(__dirname, `../../webapp/data/${filename}.json`);
}

module.exports = _public;