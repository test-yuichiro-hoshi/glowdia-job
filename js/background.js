const loginUrl = 'https://kmtbsgroup.jp/Gkinmu_Glowdia/AAFA0100Login.aspx?ReturnUrl=%2fGkinmu_Glowdia%2f';
const loginJs = 'js/login.js';
let state = 'init';

let workSchedule = [];

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    console.log('received: ' + request);
    switch (request.cmd) {
        case 'state':
            console.log('current state: ' + state);
            sendResponse(state);
            break;
        case 'goto-input':
            state = 'goto-input';
            console.log('changed goto-input');
            sendResponse('ok');
            break;
        case 'setSchedule':
            const tmp = request.value.trim().split('\n').reverse();
            for (let i = 0; i < tmp.length; i++) {
                const arr = tmp[i].split('\t');
                workSchedule.push({
                    start: arr[0],
                    genre: arr[1],
                    project: arr[2] || '',
                    content: arr[3] || '',
                    place: arr[4] || ''
                });
            }
            state = 'setSchedule';
            sendResponse('ok');
            break;
        case 'popSchedule':
            const ret = workSchedule.pop();
            if (!ret) {
                state = 'end';
            }
            sendResponse(ret);
            break;
    }
});

chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({url: loginUrl}, tab => {
        chrome.tabs.executeScript(tab.id, {file: loginJs},
            () => {
                state = 'login';
            });
    });
});
