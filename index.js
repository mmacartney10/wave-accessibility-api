import fetch from 'node-fetch';
import urls from './urls.js';
import waveApiKey from './waveApiKey.js';

function logError(str) {
    console.log('\x1b[31m', str);
}

function logSuccess(str) {
    console.log('\x1b[32m', str);
}

async function waveUrl(url) {

    const fetchUrl = `https://wave.webaim.org/api/request?key=${waveApiKey}&reporttype=1&url=${url}`;
    const response = await fetch(fetchUrl);
    const data = await response.json();

    const hasErrors = data.categories.error.count > 0;
    const hasAlerts = data.categories.alert.count > 0;
    const hasIssues = hasErrors || hasAlerts;

    const log = hasIssues ? logError : logSuccess;

    log(url);
}

urls.forEach(url => waveUrl(url));



