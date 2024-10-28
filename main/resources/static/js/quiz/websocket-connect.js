const wsUrl = 'ws://' + BACKEND_BASE_URL + '/quiz';

const socket = new WebSocket(wsUrl);

socket.onopen = function() {
    console.log('웹소켓 연결 성공');
    waitingStatusItemOn();
};

socket.onerror = function(error) {
    console.error('웹소켓 오류:', error);
};

socket.onclose = function() {
    console.log('웹소켓 연결 종료');
};

socket.onmessage = function(event) {
    const message = event.data;
    const data = JSON.parse(message);

    const dataType = data.dataType;
    if (dataType === 'QuizDto') {
        quizResultOff();
        guideMessageOff();
        quizItemOn(data.object);
    } else if (dataType === 'QuizResultDto') {
        console.log('퀴즈결과:');
        console.log(data.object);
        quizResultOn(data.object);
    } else if (dataType === 'GuideMessage') {
        console.log(data);
        guideMessageOn(data.object);
        guideMessageOff();
    }
}