<template>
    <div className="Box-layout-noAuth">
        <div className="Box-ca-root">
            <div className="Box-card-blue">
                <MyTitle title='Ativar conta' />
                <button className="Button-my-button Button-ca-ativar" @click.prevent="confirmAccount">
                    Ativar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import MyTitle from '@/components/MyTitle.vue';
import api from '@/service/api';

export default {
    name: 'ConfirmAccount',
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
        async confirmAccount() {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');
            api.confirmEmail(token)
                .then(() => {
                    this.$router.push('/sucess-account');
                })
                .catch(() => {
                    this.$router.push('/critical-error');
                })
        },
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

.Box-mi-root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}
</style>