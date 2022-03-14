const fs = require('fs');
const path = require('path');

exports.createDir = async function (dirPath) {
    createDir(dirPath)
}

exports.sortFiles = async function (dirPath) {
    let sortedFilesStat = await sortFiles(dirPath);
    console.log(`# files sorted : ${sortedFilesStat}`);
    return sortedFilesStat;
}

async function sortFiles(dirPath, count = 0) {
    try {
        let files = fs.readdirSync(dirPath);
        console.log(`files logs : ${JSON.stringify(files)}`);
        for (let fileName of files) {
            let fromPath = path.join(__dirname, `../${dirPath}/${fileName}`);
            let is_dir = fs.lstatSync(fromPath).isDirectory();
            console.log(`is_dir : ${is_dir}`)
            if (!is_dir) {
                let fileExt = fileName.slice((Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1);
                let newDir = path.join(__dirname, `../loot/${fileExt}`);
                let targetPath = path.join(__dirname, `../loot/${fileExt}/${fileName}`);
                createDir(newDir);
                moveFile(fromPath, targetPath);
                count++;
            } else { 
                console.log(`dir name : ${fileName} : DIR PATH : #${fromPath}# [RECURSION TRUE]`);
                sortedFilesStat = sortFiles(`${dirPath}/${fileName}`, count);
            }
        }
        return count;
    } catch (error) {
        console.log(`ERROR CAUGHT IN [sortFiles()]`);
        console.log(error);
        throw error;
    }
}

function moveFile(fromPath, targetPath) {
    try {
        console.log(`MOVE FILE FROM #${fromPath}# -> #${targetPath}#`);
        fs.renameSync(fromPath, targetPath)
    } catch (error) {
        console.log(`ERROR CAUGHT IN [moveFile()]`);
        console.log(error);
        throw error;
    }
}

function createDir(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) {
            console.log(`DIR -> ${dirPath} EXISTS : FALSE`);
            console.log(`${dirPath} CREATE`);
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`DIR -> ${dirPath} CREATE`);
        } else {
            console.log(`DIR -> ${dirPath} EXISTS : TRUE`);
        }
    } catch (error) {
        console.log(`ERROR CAUGHT IN [createDir()]`);
        console.log(error);
        throw error;
    }
}

