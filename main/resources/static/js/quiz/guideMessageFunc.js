async function guideMessageOn(guideMessage) {
    if (guideMessage.display) {
        let guideMessageContainer = document.getElementById('guideMessageContainer');
        guideMessageContainer.innerText = guideMessage.message;
        // hidden 클래스를 제거하여 요소를 보이게 함
        if (guideMessageContainer) {
            guideMessageContainer.classList.remove('hidden');
        }
    }
    await sleep(3500);
}

function guideMessageOff() {
    let guideMessageContainer = document.getElementById('guideMessageContainer');
    if (guideMessageContainer) {
        guideMessageContainer.innerText = '';
        guideMessageContainer.classList.add('hidden'); // hidden 클래스를 추가하여 요소를 숨김
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
