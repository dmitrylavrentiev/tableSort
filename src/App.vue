<template>
    <div id="app">
        <div class="container">
            <div id="nav" class="nav">
                <router-link class="nav__item" to="/">Table</router-link>
            </div>
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {},
    }
</script>

<style lang="scss" scoped>
    .container{
        padding: 20px;
    }
</style>