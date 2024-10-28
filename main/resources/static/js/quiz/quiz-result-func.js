function quizResultOn(quizResultObject) {
    let quizResultContainer = document.getElementById('quizResultContainer');
    let statementContainer = document.getElementById('statement');
    let isCorrectContainer = document.getElementById('isCorrect');
    let quizAnswerContainer = document.getElementById('quizAnswer');
    let myAnswerContainer = document.getElementById('myAnswer');
    let quizWinnerNameContainer = document.getElementById('quizWinnerName');

    // 정답 여부에 따라 스타일 변경 및 이모지 추가
    if (quizResultObject.correct) {
        isCorrectContainer.innerText = "✅ 정답입니다!"; // 체크 마크 이모지
        isCorrectContainer.style.color = "green"; // 정답일 경우 초록색
    } else {
        isCorrectContainer.innerText = "❌ 오답입니다."; // 엑스 마크 이모지
        isCorrectContainer.style.color = "red"; // 오답일 경우 빨간색
    }

    // 문제, 정답과 사용자의 답변 표시
    statementContainer.innerText = "문제: " + quizResultObject.statement;
    quizAnswerContainer.innerText = "퀴즈 정답: " + quizResultObject.answer + " 🎉"; // 축하 이모지 추가
    if (quizResultObject.myAnswer != null) {
        myAnswerContainer.innerText = "내 답변: " + quizResultObject.myAnswer;
    } else {
        myAnswerContainer.innerText = "내 답변:정답을 입력하지 못했어요 😭"
    }

    // 결과를 표시
    showQuizResult()
}


function quizResultOff() {
    let quizResultContainer = document.getElementById('quizResultContainer');
    quizResultContainer.classList.add('hidden'); // hidden 클래스를 추가하여 요소를 숨김

}

function showQuizResult() {
    let quizResultContainer = document.getElementById('quizResultContainer');
    // 'hidden' 클래스가 있을 경우 제거
    if (quizResultContainer.classList.contains('hidden')) {
        quizResultContainer.classList.remove('hidden');
    }
}