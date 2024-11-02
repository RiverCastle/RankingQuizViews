document.getElementById('quizButton').addEventListener('click', function() {
    const userName = document.getElementById('nameInput').value.trim();
    if (userName === "") {
        alert("이름/별명을 입력해주세요.");
        return;
    }
    sessionStorage.setItem('userName', userName);
    window.location.href = protocol + FRONTEND_BASE_URL + '/quiz';
});
