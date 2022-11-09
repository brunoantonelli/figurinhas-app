<template>
    <div className="Box-layout-noAuth">
        <div className="Box-ca-root">
            <div className="Box-card-blue">
                <MyTitle title='Error' />
                <p className="Text-sa">
                    Ops, algo deu errado!
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import MyTitle from '@/components/MyTitle.vue';
import api from '@/service/api';

export default {
    name: 'CriticalError',
    data() {
        return {
            passWar: undefined,
            emailWar: undefined,
        }
    },
    components: {
        MyTitle,
    },
    methods: {
        async createAccount() {
            const email = document.getElementById('i-email').value.toString();
            const pass = document.getElementById('i-pass').value.toString();

            if (this.validFields()) {
                api.createAccount(email, pass, 'lala')
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },

        validFields() {
            this.emailWar = undefined;
            this.passWar = undefined;

            const email = document.getElementById('i-email').value.toString();
            const pass = document.getElementById('i-pass').value.toString();
            if (email === '' || !email.includes('@')) {
                this.emailWar = 'Email inválido'
                return false;
            } else if (pass === '' || pass.length < 6) {
                this.passWar = 'Senha deve conter no mínimo 6 carateres';
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>

<style scoped>
.Box-ca-root {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    width: 100%;
}

.Box-card-blue {
    height: 130px;
}

.Text-sa {
    font-size: 17px;
}
</style>