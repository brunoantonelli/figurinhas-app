<template>
    <div className="Box-layout-noAuth">
        <div className="Box-ca-root">
            <div className="Box-card-blue">
                <MyTitle title='Conta inativa' />
                <p className="Text-sa">
                    Em breve chegará um e-mail para você.
                    Apartir dele ative sua conta, não se esqueça de verificar
                    na caixa de Span.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import MyTitle from '@/components/MyTitle.vue';

export default {
    name: 'EmailActiveAccount',
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