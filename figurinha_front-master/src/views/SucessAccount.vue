<template>
    <div className="Box-layout-noAuth">
        <div className="Box-ca-root">
            <div className="Box-card-blue">
                <MyTitle title='Conta ativa' />
                <p className="Text-sa">
                    Sua conta foi ativada com sucesso!
                </p>
                <div className="Box-sa-link">
                    <a className="Link-my-link" href="/login-user">Fazer login</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyTitle from '@/components/MyTitle.vue';

export default {
    name: 'SucessAccount',
    components: {
        MyTitle,
    },
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
    text-align: center;
}
</style>