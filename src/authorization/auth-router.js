module.exports = (router, app, registerUser) => {
    router.post('/register-user', registerUser);
    router.post('/login', app.oauth.grant());

    return router;
}
