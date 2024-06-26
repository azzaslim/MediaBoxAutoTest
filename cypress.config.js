const { defineConfig } = require("cypress");
const fs = require('fs')
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        filesInDownload (folderName) {
          return fs.readdirSync(folderName)
        }//,
        // deleteFile(filePath) {
        //   fs.unlinkSync(filePath);
        //   return null;
        // }
      })
    },
  },
});
