const mongoose = require('mongoose');
const jwt = require('../middlewares/jwt');
const bcrypt = require('../cipher/cipher');
const sendEmail = require('../nodemailer/nodemailer');
const httpRes = require('../statusHttp');
const DisabledJWT = require('../db/collections/disabled_jwt');
const Client = require('../db/collections/client');

module.exports = {
    login: async (req, res) => {
        try {
            const { login, password } = req.body;
            if (!login || !password) {
                return res.status(httpRes.badRequest.status).json(httpRes.badRequest.message);
            }
            const client = await Client.findOne({ email: login });
            if (client) {
                const hash = client.password;
                const id_client = client._id;
                const email = client.email;
                const name = client.name;
                const activeAccount = client.activeAccount;

                bcrypt.compare(password, hash).then((result) => {
                    if (result && activeAccount) {
                        const token = jwt.createToken({ id: id_client, name: name, email: email }, { expiresIn: '30min' });
                        res.status(httpRes.ok.status).json({ token: token });
                    } else {
                        res.status(httpRes.noContent.status).json(httpRes.noContent.message);
                    }
                }).catch((_) => {
                    res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
                });
            } else {
                res.status(httpRes.noContent.status).json(httpRes.noContent.message);
            }
        } catch (error) {
            console.log(error);
            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
        }
    },

    createAccount: async (req, res) => {
        try {
            let { name, email, password, link } = req.body;
            if (!name || !email || !password || !link) {
                console.log(name, email, password, link)
                return res.status(httpRes.badRequest.status).json(httpRes.badRequest.message);
            }
            let emptyStickers = [];
            for (let i = 0; i < 670; i++) {
                emptyStickers.push({ code: i, amount: 0 });
            }
            Client.insertOne({
                name: name,
                email: email,
                tel: null,
                localization: null,
                stickers: emptyStickers,
                password: await bcrypt.cipher(password),
                activeAccount: false,
            }).then((_) => {
                const token = jwt.createToken({ email: email }, { expiresIn: '24h' });
                link = link + `?token=${token}`;
                sendEmail(email, link)
                    .then((_) => {
                        res.status(httpRes.created.status).json(httpRes.created.message);
                    })
                    .catch((_) => {
                        res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
                    })
            }).catch((_) => {
                res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
            });
        } catch (error) {
            console.log(error);
            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
        }
    },

    verifyEmail: async (req, res) => {
        try {
            const { tokenDecoded, token } = req.headers;
            if (!tokenDecoded || !token) {
                return res.status(httpRes.badRequest.status).json(httpRes.badRequest.message);
            }
            const login = tokenDecoded.email;
            Client.updateOne(
                {
                    email: login,
                },
                {
                    $set: {
                        activeAccount: true,
                    }
                }
            )
                .then((_) => {
                    DisabledJWT.insertOne({ token: token, expire: `${tokenDecoded.exp}000` })
                        .then((_) => {
                            res.status(httpRes.created.status).json(httpRes.created.message);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
                        })

                })
                .catch((_) => {
                    res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
                })
        } catch (error) {
            console.log(error);
            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
        }
    },

    updatePassword: async (req, res) => {
        try {
            const { tokenDecoded, token } = req.headers;
            const { newPassword } = req.body;

            if (!tokenDecoded || !newPassword || !token) {
                return res.status(httpRes.badRequest.status).json(httpRes.badRequest.message);
            }
            const login = tokenDecoded.email;
            Client.updateOne(
                {
                    email: login,
                },
                {
                    $set: {
                        password: await bcrypt.cipher(newPassword),
                    }
                }
            )
                .then((_) => {
                    DisabledJWT.insertOne({ token: token, expire: `${tokenDecoded.exp}000` })
                        .then((_) => {
                            res.status(httpRes.created.status).json(httpRes.created.message);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
                        })
                })
                .catch((_) => {
                    res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
                })
        } catch (error) {
            console.log(error);
            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
        }
    },

    existEmail: async (req, res) => {
        try {
            const { email } = req.headers;
            if (!email) {
                return res.status(httpRes.badRequest.status).json(httpRes.badRequest.message);
            }
            const client = await Client.findOne({ email: email });
            if (client) {
                res.status(httpRes.ok.status).json({ error: false, message: true });
            } else {
                res.status(httpRes.ok.status).json({ error: false, message: false });
            }
        } catch (error) {
            console.log(error);
            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
        }
    },

    ping: (req, res) => {
        res.status(httpRes.ok.status).json(httpRes.ok.message);
    },

    clientActive: async (req, res) => {
        try {
            const { login } = req.headers;
            if (!login) {
                return res.status(httpRes.badRequest.status).json(httpRes.badRequest.message);
            }
            const client = await Client.findOne({ email: login });

            if (client) {
                const activeAccount = client.activeAccount;
                if (activeAccount) {
                    res.status(httpRes.ok.status).json({ message: true });
                } else {
                    res.status(httpRes.ok.status).json({ message: false });
                }
            } else {
                res.status(httpRes.noContent.status).json(httpRes.noContent.message);
            }
        } catch (error) {
            console.log(error);
            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
        }
    },

    sendEmailConf: async (req, res) => {
        let { email, link } = req.body;
        if (!email || !link) {
            return res.status(httpRes.badRequest.status).json(httpRes.badRequest.message);
        }
        try {
            const token = jwt.createToken({ email: email }, { expiresIn: '24h' });
            link = link + `?token=${token}`;
            sendEmail(email, link)
                .then((_) => {
                    res.status(httpRes.created.status).json(httpRes.created.message);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
                })
        } catch (err) {
            console.log(err);
            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
        }
    },

    existLocalization: async (req, res) => {
        const { tokenDecoded } = req.headers;
        if (!tokenDecoded) {
            return res.status(httpRes.badRequest.status).json(httpRes.badRequest.message);
        }
        try {
            const id = tokenDecoded.id;
            const client = await Client.findOne({ _id: mongoose.Types.ObjectId(id) });
            if (client.localization) {
                res.status(httpRes.ok.status).json(httpRes.ok.message);
            } else {
                res.status(httpRes.noContent.status).json(httpRes.noContent.message);
            }
        }
        catch (err) {
            console.log(err);
            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
        }
    },

    infoPerfil: async (req, res) => {
        const { tokenDecoded } = req.headers;
        if (!tokenDecoded) {
            return res.status(httpRes.badRequest.status).json(httpRes.badRequest.message);
        }
        try {
            const id = tokenDecoded.id;
            const client = await Client.findOne({ _id: mongoose.Types.ObjectId(id) });
            res.status(httpRes.ok.status).json({ name: client.name, email: client.email, tel: client.tel, localization: client.localization })
        }
        catch (err) {
            console.log(err);
            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
        }
    },

    updatePerfil: async (req, res) => {
        const { token, tokenDecoded } = req.headers;
        const { name, email, tel, city, district, place } = req.body;

        if (!token || !tokenDecoded || !name || !email || !tel || !city || !district || !place) {
            return res.status(httpRes.badRequest.status).json(httpRes.badRequest.message);
        }
        try {
            const localization = { city: city, district: district, place: place };
            const login = tokenDecoded.email;
            Client.updateOne(
                {
                    email: login,
                },
                {
                    $set: {
                        name: name,
                        email: email,
                        tel: tel,
                        localization: localization
                    }
                })
                .then((_) => {
                    DisabledJWT.insertOne({ token: token, expire: `${tokenDecoded.exp}000` })
                        .then((_) => {
                            const newToken = jwt.createToken({ id: tokenDecoded.id, name: name, email: email }, { expiresIn: '30min' })
                            res.status(httpRes.ok.status).json({ newToken: newToken });
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
                        })
                })
                .catch((err) => {
                    console.log(err);
                    res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
                })
        }
        catch (err) {
            console.log(err);
            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
        }
    },

    getStickers: async (req, res) => {
        const { tokenDecoded } = req.headers;
        if (!tokenDecoded) {
            return res.status(httpRes.badRequest.status).json(httpRes.badRequest.message);
        }
        try {
            const id = tokenDecoded.id;
            Client.findOne({ _id: mongoose.Types.ObjectId(id) })
                .then((data) => {
                    res.status(httpRes.ok.status).json({ stickers: data.stickers })
                })
                .catch((err) => {
                    console.log(err);
                    res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
                })
        }
        catch (err) {
            console.log(err);
            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
        }
    },

    updateStickers: async (req, res) => {
        const { tokenDecoded } = req.headers;
        const { stickers } = req.body;
        if (!tokenDecoded || !stickers) {
            return res.status(httpRes.badRequest.status).json(httpRes.badRequest.message);
        }
        try {
            const id = tokenDecoded.id;
            Client.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
                $set: {
                    stickers: stickers
                }
            })
                .then(() => {
                    res.status(httpRes.ok.status).json(httpRes.ok.message)
                })
                .catch((err) => {
                    console.log(err);
                    res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
                })
        }
        catch (err) {
            console.log(err);
            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
        }
    }
}