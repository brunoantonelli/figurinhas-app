<template>
    <div className="Box-layout-noAuth">
        <div className="Box-cc-root">
            <div className="Box-card-blue">
                <MyTitle title='Problemas ao logar' />
                <form className="Form-geral" autoComplete="on">
                    <div className="Box-mi-root">
                        <div className="Box-mi-title">
                            <span className="Span-mi-title">
                                E-MAIL
                            </span>
                        </div>
                        <input className="Input-mi" id="i-email" name="email" type="text"
                            placeholder="Digite seu e-mail" />
                        <div className="Box-mi-warning">
                            <span className="Span-mi-warning">
                                {{ emailWar }}
                            </span>
                        </div>
                    </div>
                    <div className="Container-my-button">
                        <div className="Container-span-my-link">
                            <a className="Link-my-link" href="/create-account"> Criar uma conta</a>
                        </div>
                        <div className="Container-span-my-link">
                            <a className="Link-my-link" href="/login-user"> Fazer login</a>
                        </div>
                        <button className="Button-my-button" @click.prevent="createAccount">
                            Verificar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import MyTitle from '@/components/MyTitle.vue';
import api from '@/service/api';

export default {
    name: 'LoginProblem',
    data() {
        return {
            emailWar: undefined,
        }
    },
    components: {
        MyTitle,
    },
    methods: {
        async createAccount() {
            const email = document.getElementById('i-email').value.toString();

            if (this.validFields()) {
                api.userActive(email)
                    .then((res) => {
                        if (res.status === 204) {
                            this.emailWar = 'E-mail não está cadastrado';
                        } else {
                            if (res.data.message) {
                                api.sendEmail(email, 'http://localhost:8080/change-password')
                                    .then(() => {
                                        this.$router.push('/email-change-password');
                                    })
                                    .catch(() => {
                                        this.$router.push('/critical-error');
                                    });
                            } else {
                                api.sendEmail(email, 'http://localhost:8080/confirm-account')
                                    .then(() => {
                                        this.$router.push('/email-active-account');
                                    })
                                    .catch(() => {
                                        this.$router.push('/critical-error');
                                    });
                            }
                        }
                    })
                    .catch(() => {
                        this.$router.push('/critical-error');
                    })
            }
        },

        validFields() {
            this.emailWar = undefined;

            const email = document.getElementById('i-email').value.toString();
            if (email === '' || !email.includes('@')) {
                this.emailWar = 'E-mail inválido';
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>

<style scoped>
.Box-cc-root {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

.Box-card-blue {
    height: 220px;
}

.Box-mi-root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.Box-mi-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 85%;
    margin-bottom: 3px;
}

.Span-mi-title {
    color: #707070;
    font-weight: bold;
    font-size: 12px;
}

.Input-mi {
    width: 90%;
    border: none;
    border-bottom: 2px solid #b0b0b0;
    height: 35px;
    font-size: 15px;
    border-radius: 5px;
    padding-left: 5px;
}

.Input-mi:focus {
    outline: none;
}

.Box-mi-warning {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 90%;
    margin-top: 3px;
}

.Span-mi-warning {
    color: #f84848;
    font-weight: bold;
    font-size: 12px;
}
</style>