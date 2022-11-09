<template>
    <div className="Box-mt-root">
        <span className="Span-mt-title">
            {{ title }}
        </span>
    </div>
</template>

<script>

export default {
    name: 'MyTitle',
    props: {
        title: String,
    },
}
</script>

<style scoped>
.Box-mt-root {
    display: flex;
    margin-top: 10px;
    width: 100%;
    height: 25px;
    justify-content: center;
    align-items: center;
}

.Span-mt-title {
    color: #ffffff;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
}
</style>