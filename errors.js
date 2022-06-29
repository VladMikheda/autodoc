
const ERROR_ARGUMENTS = 1;
const ERROR_PATCH = 2;
const ERROR_READ_FILE = 3;

const helpPrint = () => {
    console.log("todo help")
}


const errorPrint = (error, text, help) => {
    if(text){
        console.error("ERROR: " + text);
    }

    if(help){
        helpPrint();
    }

    process.exit(error);
}

module.exports = {
    ERROR_ARGUMENTS,
    ERROR_PATCH,
    ERROR_READ_FILE,
    errorPrint,
    helpPrint
}