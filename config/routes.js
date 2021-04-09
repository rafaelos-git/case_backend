module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getInfo)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getInfoById)
        .delete(app.api.user.remove)
        .put(app.api.user.update)

    app.route('/users/:id/toggle')
        .all(app.config.passport.authenticate())
        .put(app.api.user.toggleStatus)
}