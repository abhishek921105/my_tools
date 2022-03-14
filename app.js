const fs = require('fs');
const path = require('path');

const commonFunctions = require('./utils/commonFunctions');

commonFunctions.createDir("./loot");



// =========================TASKS======================
let sortFiles = commonFunctions.sortFiles('./input')

