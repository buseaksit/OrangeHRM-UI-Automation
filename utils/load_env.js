import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { cleanEnv, str, url, bool } from 'envalid';


// load chain
const ENV_FILES = [
    path.resolve('config/defaults.env'), // lowest priority
    path.resolve('config/secrets.env')
];

// step throught the file in order

ENV_FILES.forEach( file =>{
    if(fs.existsSync(file)){
        dotenvExpand.expand(dotenv.config({path:file}));
    }
});

// validate & freeze
export const env = cleanEnv(
    process.env,
    {
        BASE_URL:url({default:"https://opensource-demo.orangehrmlive.com"}),
        HEADLESS:bool({default:true}),
        TRACE: str({choices:['off','on','on-first-retry','only-on-failure'],default:'off'}),
        STORAGE_PATH: str({default:'auth/orangeHrm.auth.json'}),
        OHRM_USER:str(),
        OHRM_PASS:str()
    }
)

Object.freeze(env); // guard against accidental mutation of env.