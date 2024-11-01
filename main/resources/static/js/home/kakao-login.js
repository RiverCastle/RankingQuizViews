
document.getElementById('kakaoLoginBtn').addEventListener('click', function() {
    fetch('/config')
        .then(response => response.json())
        .then(config => {
            const clientId = config.clientId;
            const redirectUri = config.redirectUri;
            const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
            window.location.href = authUrl;
        })
        .catch(error => console.error('Error fetching config:', error));

});