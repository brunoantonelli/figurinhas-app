import axios from "axios";

const instance = axios.create(
    {
        baseURL: process.env.VUE_APP_API,
        timeout: 20000,
    }
)
const api = {

    ping: (token) => {
        return new Promise((resolve, reject) => {
            instance.get('/v1/client/ping', { headers: { token: token } })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    userActive: (login) => {
        return new Promise((resolve, reject) => {
            instance.get('/v1/client/client-active', { headers: { login: login } })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    existThisEmail: (email) => {
        return new Promise((resolve, reject) => {
            instance.get('/v1/client/exist-email', { headers: { email: email } })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    createAccount: (name, email, password, link) => {
        return new Promise((resolve, reject) => {
            instance.post('/v1/client/create-account', { name: name, email: email, password: password, link: link })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    sendEmail: (email, link) => {
        return new Promise((resolve, reject) => {
            instance.post('/v1/client/send-email-confirm', { email: email, link: link })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    confirmEmail: (token) => {
        return new Promise((resolve, reject) => {
            instance.post('/v1/client/verify-email', { token: token })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    login: (login, password) => {
        return new Promise((resolve, reject) => {
            instance.post('/v1/client/login', { login: login, password: password })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    updatePassword: async (newPassword, token) => {
        return new Promise((resolve, reject) => {
            instance.post('/v1/client/update-password', { newPassword: newPassword, token: token })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    existLocalization: async (token) => {
        return new Promise((resolve, reject) => {
            instance.get('/v1/client/exist-localization', { headers: { token: token } })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    getUserPerfil: async (token) => {
        return new Promise((resolve, reject) => {
            instance.get('/v1/client/info-perfil', { headers: { token: token } })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    updatePerfil: async (name, email, tel, city, district, place, token) => {
        return new Promise((resolve, reject) => {
            instance.post('/v1/client/update-perfil', { name: name, email: email, tel: tel, city: city, district: district, place: place, token: token })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    updateStickers: async (stickers, token) => {
        return new Promise((resolve, reject) => {
            instance.post('/v1/client/update-stickers', { stickers: stickers, token: token })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    stickers: async (token) => {
        return new Promise((resolve, reject) => {
            instance.get('/v1/client/stickers', { headers: { token: token } })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
}

export default api;