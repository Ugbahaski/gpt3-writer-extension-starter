const insert = (content) => {
    const elements = document.getElementsByClassName('droid');

    if (elements.length === 0) {
      return;
    }
    
    const element = elements[0];

    const pToRemove = element.childNodes[0];
    pToRemove.remove();

    const splitContent = content.split('\n');

    splitContent.forEach((content) => {
        const p = document.createElement('p');
      
        if (content === '') {
          const br = document.createElement('br');
          p.appendChild(br);
        } else {
          p.textContent = content;
        }

        element.appendChild(p);
      });

  // On success return true
  return true;
};

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
    if (request.message === 'inject') {
      const { content } = request;
      const result = insert(content);
      console.log(content);
      if (!result) {
        sendResponse({ status: 'failed' });
      }
      sendResponse({ status: 'success' });
    }
  });