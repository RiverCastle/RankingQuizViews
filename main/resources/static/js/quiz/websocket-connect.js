const wsUrl = 'ws://' + BACKEND_BASE_URL + '/ws/quiz';

// 버튼 클릭 이벤트 리스너 추가
document.getElementById('stop-button').addEventListener('click', function() {
    quizBoxOff();
    quizResultOff();
    guideMessageOff();
    socket.close(); // 웹소켓 연결 종료
});

const socket = new WebSocket(wsUrl);

socket.onopen = function() {
    backgroundColorChange();
};

socket.onerror = function(error) {
    console.error('웹소켓 오류:', error);
};

socket.onclose = function() {
    window.open('/feedback', '_blank'); // 새 창으로 feedback.html 열기
};

socket.onmessage = async function(event) {
    const message = event.data;
    const data = JSON.parse(message);
    const dataType = data.dataType;

    if (dataType === 'QuizDto') {
        quizResultOff();
        quizItemUpdate(data.object);
        quizBoxOn();
    } else if (dataType === 'QuizResultDto') {
        guideMessageOff();
        quizBoxOff();
        quizResultUpdate(data.object);
        quizResultOn();
        await sleep(3500);
        quizResultOff();
    } else if (dataType === 'GuideMessage') {
        console.log(data.object);
        guideMessageOn(data.object);
        await sleep(3500);
        guideMessageOff();
    }
}
