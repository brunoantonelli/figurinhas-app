<template>
    <div className="Box-layout-noAuth">
        <div className="Box-cc-root">
            <div className="Box-card-blue">
                <MyTitle title='Trocar de senha' />
                <form className="Form-geral" autoComplete="on">
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
                        <button className="Button-my-button" @click.prevent="updatePassword">
                            Trocar
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
    name: 'ChangePassword',
    data() {
        return {
            passWar: undefined,
            confPassWar: undefined,
        }
    },
    components: {
        MyTitle,
    },
    methods: {
        async updatePassword() {
            const pass = document.getElementById('i-pass').value.toString();
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');
            if (this.validFields()) {
                api.updatePassword(pass, token)
                    .then(() => {
                        this.$router.push('/sucess-change-password');
                    })
                    .catch(() => {
                        this.$router.push('/critical-error');
                    })
            }
        },

        validFields() {
            this.passWar = undefined;
            this.confPassWar = undefined;

            const pass = document.getElementById('i-pass').value.toString();
            const confPass = document.getElementById('i-confPass').value.toString();
            if (pass === '' || pass.length < 6) {
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

.Box-card-blue {
    height: 280px;
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