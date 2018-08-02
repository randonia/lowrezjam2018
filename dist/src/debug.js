const DEBUG = window.location.search.includes('debug=true');

if (DEBUG) {
  const DEBUG_TEXT = document.createElement('code');
  console.info('ＨＵＭＡＮ ＭＵＳＩＣ');
  console.info('...Ｉ ＬＩＫＥ ＩＴ');
  const DEBUG_INFO = document.createElement('p');
  DEBUG_INFO.innerText = 'DEBUG';
  DEBUG_INFO.setAttribute('class', 'debug-info');
  document.getElementById('div-debug-text').appendChild(DEBUG_INFO);
  DEBUG_TEXT.setAttribute('id', 'debug-text');
  document.getElementById('div-debug-text').appendChild(DEBUG_TEXT);
  const dbg_instructions = [];
  dbg_instructions.forEach((item) => {
    const newLI = document.createElement('li');
    newLI.innerText = `DEBUG: ${item}`;
    document.getElementById('ul-instructions').appendChild(newLI);
  });
}

function clearDebugText() {
  if (DEBUG) {
    DEBUG_TEXT.innerText = '';
  }
}

function dbgLog(msg, ...args) {
  if (DEBUG) {
    DEBUG_TEXT.innerText += `\n${sprintf(msg, ...args)}`;
  }
}
