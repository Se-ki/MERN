import { fileURLToPath } from 'url';
import { dirname } from 'path';

//need to import this to use __filename and __dirname

const getDirName = (moduleUrl) => {
    const __filename = fileURLToPath(moduleUrl);
    return dirname(__filename);
}

export {
    getDirName
};