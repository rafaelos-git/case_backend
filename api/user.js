const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }
    const save = async (req, res) => {
        const user = await app.db('users')
                .where({ email: req.body.email })
                .first()

        obterHash(req.body.password, hash => {
            const password = hash

            if (!user){
                app.db('users')
                    .insert({name: req.body.name, cpf: req.body.cpf, email: req.body.email, password, nivel: req.body.nivel, toggle: true})
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(400).json(err))
            } else {
                const msg = `Usuario ja cadastrado`
                res.status(400).send(msg)
            }
        })
    }

    const getInfo = (req, res) => {
        app.db('users')
            .then(users => res.status(200).json(users))
            .catch(err => res.status(500).json(err))
    }

    const getInfoById = (req, res) => {
        app.db('users')
            .where({ id: req.params.id })
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err))
    }

    const remove = (req, res) => {
        app.db('users')
            .where({ id: req.params.id })
            .del()
            .then(rowDeleted => {
                if (rowDeleted > 0){
                    res.status(204).send()
                } else {
                    const msg = `Usuário de id ${req.params.id} não encontrado`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash

            app.db('users')
                .where({ id: req.params.id })
                .update({ password })
                .then(_ => res.status(204).send())
                .catch(err => res.status(400).json(err))
        })
    }

    const switchStatus = (req, res, state) => {
        app.db('users')
            .where({ id: req.params.id })
            .update({ toggle: state })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleStatus = (req, res) => {
        app.db('users')
            .where({ id: req.params.id })
            .first()
            .then(user => {
                if (!user) {
                    const msg = `Usuário de id ${req.params.id} não encontrado`
                    res.status(400).send(msg)
                }
                const state = user.toggle ? false : true
                switchStatus(req, res, state)
            })
            .catch(err => res.status(400).json(err))
    }

    return { save, getInfo, getInfoById, remove, update, toggleStatus }
}