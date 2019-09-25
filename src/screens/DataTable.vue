<template>
    <div class="cars-table">
        <Table/>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    import Table from '../components/Table'

    export default {
        name: 'DataTable',
        data: () => {
            return {}
        },
        components: {
            Table,
        },
        methods: {
            ...mapActions(['getTable'])
        },
        created() {
            this.getTable()
        }
    }
</script>

