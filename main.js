const fs = require("fs");
const path = require("path");
const errors = require("./errors")
const {
    errorPrint,
    ERROR_READ_FILE} = require("./errors");

// main dir patch
let mainPatch = null;

/**
 * Function checks repeat path and checks path exists
 * @param patch
 */
const checkPatch = (patch) => {
    if(mainPatch != null){
        const errorText = "arguments not correct";
        errors.errorPrint(errors.ERROR_ARGUMENTS, errorText, true);
    }

    if(!fs.existsSync(patch)){
        const errorText = "patch not exist";
        errors.errorPrint(errors.ERROR_PATCH, errorText, false);
    }

    mainPatch = patch;
}

//todo move to another file
//loop for check arguments
for(let i = 2; i < process.argv.length; i++){
    switch (process.argv[i]){
        case '-p':
            checkPatch(process.argv[++i]);
            break;
        case '-m':
            checkPatch(process.argv[1])
            break;
        case '-h':
            errors.helpPrint();
            break;
        default:
            errors.errorPrint(errors.ERROR_ARGUMENTS,null, true);
    }
}

/**
 * Function find recursive all js files
 * @param dir main dir path
 */
const readDir =  dir => {
   let filesList = []
   const dirs = fs.readdirSync(dir);
   dirs.forEach( files => {
       const pathFile = path.join(dir,files);
       const fileStat = fs.statSync(pathFile);
       if(fileStat.isDirectory()){
        readDir(pathFile);
       }else if(fileStat.isFile()){
           if(path.extname(pathFile) === '.js'){
               filesList.push(pathFile);
               // console.log(`File: ${pathFile}`);
           }
       }else{
           const errorText = "failed to read file";
           errorPrint(ERROR_READ_FILE, errorText, false);
       }
   })
    return filesList;
}

// readDir(mainPatch)
console.log(readDir(mainPatch))

//todo async read files -> parsing -> save ".md"
