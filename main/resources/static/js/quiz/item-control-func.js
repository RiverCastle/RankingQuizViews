function waitingStatusItemOn() {
    // 배경 설정
    document.body.style.background = "linear-gradient(135deg, #ff4e50, #fc913a)";

    const waitingStatusItemDiv = document.getElementById('waitingStatusItemDiv');

    if (waitingStatusItemDiv) {
        waitingStatusItemDiv.classList.remove('hidden'); // hidden 클래스를 제거하여 요소를 보임
    }
}


function waitingStatusItemOff() {
    const waitingStatusItemDiv = document.getElementById('waitingStatusItemDiv');

    if (waitingStatusItemDiv) {
        waitingStatusItemDiv.classList.add('hidden'); // hidden 클래스를 추가하여 요소를 숨김
    }
}


function quizItemOn(quizObject) {
    // 대기 상태 종료
    waitingStatusItemOff();
    document.body.style.background = "linear-gradient(135deg, #00b09b, #96c93d)";

    // 퀴즈 데이터 초기화
    const quizId = quizObject.quizId;
    const writtenAt = new Date().toISOString();
    let userAnswer = null;
    let userName = null;

    const answerData = {
        userName: name,
        quizId: quizId,
        writtenAt: writtenAt,
        userAnswer: userAnswer
    };

    const messageWrapper = {
        dataType: 'AnswerDto',
        object: answerData
    };

    // 퀴즈 컨테이너
    let quizContainer = document.getElementById('quizContainer');

    // QuizID 요소 재할당
    let quizIdElement = document.getElementById('quizId');
    quizIdElement.textContent = quizId; // 내용 재할당

    // 카운트다운 요소 재할당
    let countdownElement = document.getElementById('countdown');

    // 퀴즈 마감 시간 카운트다운 생성
    const finishedAt = new Date(quizObject.finishedAt[0], quizObject.finishedAt[1] - 1, quizObject.finishedAt[2],
                                 quizObject.finishedAt[3], quizObject.finishedAt[4], quizObject.finishedAt[5]);

    const countdownInterval = setInterval(() => {
        const now = new Date();
        const timeLeft = finishedAt - now;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = '0.0';
            console.log(answerData);
            console.log(messageWrapper);
            socket.send(JSON.stringify(messageWrapper));
            console.log("전송완료");
            console.log(JSON.stringify(messageWrapper));

            quizItemOff(); // 퀴즈 종료 시 요소 숨김
        } else {
            const secondsLeft = Math.ceil(timeLeft / 1000);
            countdownElement.textContent = (secondsLeft / 10).toFixed(1);
        }
    }, 100);

    // QuizStatement 요소 생성 또는 재할당
    let statementElement = document.getElementById('quizStatement');
    statementElement.textContent = quizObject.quizContentDto.statement; // 내용 재할당


    // 옵션 컨테이너 재할당
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    const options = quizObject.quizContentDto.options;
    options.sort(() => Math.random() - 0.5); // 임의의 순서로 섞기

    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'optionButton';

        button.onclick = function() {
            let userNameContainer = document.getElementById('nameInput');
            console.log(userNameContainer.value);
            answerData.userAnswer = option;
            answerData.writtenAt = new Date().toISOString();
            answerData.userName = userNameContainer.value;

            // 클릭된 버튼에 클래스 추가하여 가시적 변화
            this.classList.add('clicked');

            // 다른 버튼 비활성화
            const allButtons = document.querySelectorAll('.optionButton'); // 모든 버튼 선택
            allButtons.forEach(btn => {
                if (btn !== this) {
                    btn.disabled = true; // 비활성화
                }
            });
        };

        optionsContainer.appendChild(button);
    });

    showQuizItems(); // 퀴즈 항목 보이기
}

function quizItemOff() {
    // 퀴즈 관련 요소 숨김 처리
    const elements = [
        document.getElementById('quizId'),
        document.getElementById('quizStatement'),
        document.getElementById('optionsContainer'),
        document.getElementById('countdown')
    ];

    elements.forEach(element => {
        if (element) {
            element.classList.add('hidden'); // hidden 클래스를 추가하여 요소를 숨김
        }
    });
}


function showQuizItems() {
    const elements = [
        document.getElementById('quizId'),
        document.getElementById('quizStatement'),
        document.getElementById('optionsContainer'),
        document.getElementById('countdown')
    ];

    elements.forEach(element => {
        if (element) {
            element.classList.remove('hidden'); // hidden 클래스를 제거하여 요소를 보이게 함
        }
    });
}

