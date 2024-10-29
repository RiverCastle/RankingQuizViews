// 버튼 클릭 이벤트 리스너 추가
const submitButton = document.getElementById('submit-btn');

submitButton.addEventListener('click', function() {
    const userFeedbackDtos = [];

    // 새로운 기능 건의 항목 수집
    const newFeatureTexts = document.querySelectorAll('#new-feature-container .feedback');
    newFeatureTexts.forEach(textarea => {
        const content = textarea.value.trim();
        if (content) {
            userFeedbackDtos.push({
                content: content,
                category: 'NewFeatureProposal'
            });
        }
    });

    // 불편한 점 항목 수집
    const inconvenienceItems = document.querySelectorAll('#inconvenience-container .feedback-item');
    inconvenienceItems.forEach(item => {
        const textarea = item.querySelector('.feedback');
        const select = item.querySelector('.feedback-category');
        const content = textarea.value.trim();
        const category = select.value;

        if (content) {
            userFeedbackDtos.push({
                content: content,
                category: category
            });
        }
    });

    // 서버에 데이터 전송
    if (userFeedbackDtos.length > 0) {
        fetch('https://' + BACKEND_BASE_URL + '/user-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userFeedbackDtos)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('네트워크 응답이 좋지 않습니다.');
        })
        .then(data => {
            console.log('서버 응답:', data);
            alert('피드백이 성공적으로 제출되었습니다.');
        })
        .catch(error => {
            console.error('문제가 발생했습니다:', error);
            alert('피드백 제출에 실패했습니다.');
        });
    } else {
        alert('제출할 피드백이 없습니다.');
    }
});