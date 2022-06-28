const fs = require("fs");
const path = require("path");
const errors = require("./errors")
const ERROR_ARGUMENTS = 1;
const ERROR_PATCH = 2;



let mainPatch = null;


const checkPatch = (patch) => {
    if(mainPatch != null){
        console.log("help");
        process.exit(errors.ERROR_ARGUMENTS);
    }

    if(!fs.existsSync(patch)){
        console.log("ERROR: patch not exist");
        process.exit(ERROR_PATCH);
    }

    mainPatch = patch;
}

for(let i = 2; i < process.argv.length; i++){
    switch (process.argv[i]){
        case '-p':
            try {
                checkPatch(process.argv[++i]);
            }catch (e) {
                console.log("help");
                process.exit(ERROR_ARGUMENTS);
            }
            break;
        case '-h':
            checkPatch(process.argv[1])
            break;
        default:
            console.log("help");
            process.exit(ERROR_ARGUMENTS);
    }
}



// fs.readdir(mainPatch, (err, files) => {
//     files.forEach(file => {
//         const patchDir = path.join(mainPatch,file)
//         if(fs.statSync(patchDir).isDirectory()){
//             console.log(patchDir)
//         }
//     })
// })


const readDir =  dir => {
   const dirs = fs.readdirSync(dir);
   dirs.forEach( files => {
       const pathFile = path.join(dir,files);
       const fileStat = fs.statSync(pathFile);
       if(fileStat.isDirectory()){
        readDir(pathFile)
       }else if(fileStat.isFile()){
           if(path.extname(pathFile) === '.js'){
               console.log(`File: ${pathFile}`);
           }
       }else{
           console.log("ERROR: failed to read file")
       }
   })
}

readDir(mainPatch)
// let files = fs.readdirSync(mainPatch);
//
//
// files.forEach( file => {
//     const patchDir = path.join(mainPatch,file)
//     const fileStats = fs.statSync(patchDir)
//     if(fileStats.isDirectory()){
//         console.log("dir")
//     }else if(fileStats.isFile()){
//         console.log("file")
//     }else{
//         console.log("ERROR")
//     }
// } )

// const read = new Promise((resolve, reject) => {
//     fs.readdir(mainPatch, (err,files) => {
//         console.log(files)
//         files.forEach(file => {
//             const patchDir = path.join(mainPatch,file)
//             if(fs.statSync(patchDir).isDirectory()){
//                 console.log(patchDir)
//             }
//         })
//     })
//
//     resolve()
// })
//
// read.then(() => {
//
// })

// console.log(fs.readdirSync(mainPatch).filter( dir => dir.isDirectory()))


