module.exports = (router, app, authRoutesMethods) => {
    router.post('/register-user', authRoutesMethods.registerUser);
    router.post('/login', app.oauth.grant());

    return router;
}
