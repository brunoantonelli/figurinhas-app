<template>
    <div className="Box-layout-noAuth">
        <div className="Box-cc-root">
            <div className="Box-card-blue">
                <MyTitle title='Criar uma conta' />
                <form className="Form-geral" autoComplete="on">
                    <div className="Box-mi-root">
                        <div className="Box-mi-title">
                            <span className="Span-mi-title">
                                NOME
                            </span>
                        </div>
                        <input className="Input-mi" id="i-name" name="fname" type="text"
                            placeholder="Digite seu nome" />
                        <div className="Box-mi-warning">
                            <span className="Span-mi-warning">
                                {{ nameWar }}
                            </span>
                        </div>
                    </div>
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
                    <div className="Box-mi-root">
                        <div className="Box-mi-title">
                            <span className="Span-mi-title">
                                SENHA
                            </span>
                        </div>
                        <input className="Input-mi" id="i-pass" name="pass" type="password"
                            placeholder="Crie uma senha" />
                        <div className="Box-mi-warning">
                            <span className="Span-mi-warning">
                                {{ passWar }}
                            </span>
                        </div>
                    </div>
                    <div className="Box-mi-root">
                        <div className="Box-mi-title">
                            <span className="Span-mi-title">
                                CONFIRME A SENHA
                            </span>
                        </div>
                        <input className="Input-mi" id="i-confPass" name="confPass" type="password"
                            placeholder="Repita a senha criada" />
                        <div className="Box-mi-warning">
                            <span className="Span-mi-warning">
                                {{ confPassWar }}
                            </span>
                        </div>
                    </div>
                    <div className="Container-my-button">
                        <div className="Container-span-my-link">
                            <a className="Link-my-link" href="/login-user"> Fazer login</a>
                        </div>
                        <button className="Button-my-button" @click.prevent="createAccount">
                            Criar
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
    name: 'CreateClient',
    data() {
        return {
            nameWar: undefined,
            passWar: undefined,
            emailWar: undefined,
            confPassWar: undefined,
        }
    },
    components: {
        MyTitle,
    },
    methods: {
        async createAccount() {
            const name = document.getElementById('i-name').value.toString();
            const email = document.getElementById('i-email').value.toString();
            const pass = document.getElementById('i-pass').value.toString();

            if (this.validFields()) {
                api.existThisEmail(email).then((res) => {
                    if (!res.data.message) {
                        api.createAccount(name, email, pass, 'http://localhost:8080/confirm-account')
                            .then(() => {
                                this.$router.push('/email-active-account');
                            })
                            .catch(() => {
                                this.$router.push('/critical-error');
                            })
                    } else {
                        this.emailWar = 'Este e-mail já está em uso'
                    }
                }).catch(() => {
                    this.$router.push('/critical-error');
                })
            }
        },

        validFields() {
            this.nameWar = undefined;
            this.emailWar = undefined;
            this.passWar = undefined;
            this.confPassWar = undefined;

            const name = document.getElementById('i-name').value.toString();
            const email = document.getElementById('i-email').value.toString();
            const pass = document.getElementById('i-pass').value.toString();
            const confPass = document.getElementById('i-confPass').value.toString();
            if (name === '') {
                this.nameWar = 'Nome inválido'
                return false;
            } else if (email === '' || !email.includes('@')) {
                this.emailWar = 'Email inválido'
                return false;
            } else if (pass === '' || pass.length < 6) {
                this.passWar = 'Senha deve conter no mínimo 6 carateres';
                return false;
            } else if (confPass !== pass) {
                this.confPassWar = 'A senha não corresponde';
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

.Box-card-blue {
  background-color: rgb(135, 43, 77);
}


</style>