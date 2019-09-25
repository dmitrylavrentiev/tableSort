<template>
    <Info :item="getItem(id)"/>
</template>

<script>
    import {mapGetters} from 'vuex'

    import Info from '../components/Info'

    export default {
        name: 'DataInfo',
        props: ['id'],
        components: {
            Info,
        },
        computed: {
            ...mapGetters(['getItem']),
        },
    }
</script>

