
document.getElementById('kakaoLoginBtn').addEventListener('click', function() {
    fetch('/config')
        .then(response => response.json())
        .then(config => {
//            const clientId = config.clientId;
//            const redirectUri = config.redirectUri;
            const clientId = '41ad8e26ac1e92bfcac84f788d229cef';
            const redirect_uri = protocol + FRONTEND_BASE_URL + '/login-wait';
            const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
            window.location.href = authUrl;
        })
        .catch(error => console.error('Error fetching config:', error));

});