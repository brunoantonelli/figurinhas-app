<template>
    <div className="Box-layout-noAuth">
        <div className="Box-ca-root">
            <div className="Box-card-blue">
                <MyTitle title='Trocar senha' />
                <p className="Text-sa">
                    Em breve chegará um e-mail para você.
                    Apartir dele troque sua senha de acesso. Se esse não
                    for seu problema ignore o e-mail e entre em contato com a gente.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import MyTitle from '@/components/MyTitle.vue';

export default {
    name: 'EmailChangePassword',
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
    height: 150px;
    padding: 10px;
}

.Text-sa {
    font-size: 17px;
    text-align: center;
}
</style>