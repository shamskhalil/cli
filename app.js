const { promisify } = require('util');
const rp = require('request-promise');
const prompt = require('prompt');
const promptg = promisify(prompt.get);

prompt.message = '';

let endpoint = '';
let verb = '';
let resource = '';


async function getRootEnpoint() {
    const req = {
        properties: {
            ep: {
                message: 'REST endpoint eg `localhost:3000`'
            }
        }
    };
    const { ep } = await promptg(req);
    endpoint = ep;
    getVerb();
}

async function getVerb() {
    const req = {
        properties: {
            v: {
                message: 'REST VERB 1=GET, 2=POST, 3=PUT, 4=DELETE and 5=Exit App'
            }
        }
    };
    let { v } = await promptg(req);
    v = parseInt(v);
    switch (v) {
        case 1:
            verb = 'GET';
            break;
        case 2:
            verb = 'POST';
            break;
        case 3:
            verb = 'PUT';
            break;
        case 4:
            verb = 'DELETE';
            break;
        case 5:
            verb = 'EXIT APP';
            process.exit(0);
            break;
        default:
            console.log('Invalid input, please enter a number between 1 to 5!');
            getVerb();
    }
    getResource();
}

async function getResource() {
    const req = {
        properties: {
            v: {
                message: 'RESOURCE endpoint eg `/user....'
            }
        }
    };
    let { v } = await promptg(req);
    resource = v;
    const response = await doHttp();
    console.log('SERVER RESPONSE >>> ', response);
    getVerb();
}

function doHttp() {
    const option = {
        method: verb,
        uri: `http://${endpoint}${resource}`,
        json: true
    }
    return rp(option);
}


getRootEnpoint();













