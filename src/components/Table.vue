<template>
    <div class="table">
        <div class="table__search">
            <input type="text" placeholder="name" v-model="search"/>
            <i class="fas fa-search"></i>
        </div>
        <table>
            <thead>
            <tr>
                <th>
                    name
                    <i @click="sortBy('name')" class="fas fa-sort-up"></i>
                    <i @click="sortBy('-name')" class="fas fa-sort-down"></i>
                </th>
                <th>
                    location
                    <i @click="sortBy('location')" class="fas fa-sort-up"></i>
                    <i @click="sortBy('-location')" class="fas fa-sort-down"></i>
                </th>
                <th>
                    currency
                    <i @click="sortBy('currency')" class="fas fa-sort-up"></i>
                    <i @click="sortBy('-currency')" class="fas fa-sort-down"></i>
                </th>
                <th colspan="2"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in rows" :key="item.id" class="table__row">
                <template v-if="item.id === idEditRow">
                    <td><input v-model="name"></td>
                    <td><input v-model="location"></td>
                    <td><input v-model="currency"></td>
                </template>
                <template v-else>
                    <td>{{item.name}}</td>
                    <td>{{item.location}}</td>
                    <td>{{item.currency}}</td>
                </template>
                <td>
                    <router-link :to="'/data/' + item.id">
                        <i class="fas fa-info-circle"></i>
                    </router-link>
                </td>
                <td>
                    <i v-if="item.id === idEditRow" @click="editTable(item, i)" class="fas fa-save"></i>
                    <i v-else @click="editTable(item, i)" class="fas fa-edit"></i>
                </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <td class="table__total" colspan="2">Total:</td>
                <td>{{total}}</td>
                <td colspan="2"></td>
            </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: 'Table',
        data: function () {
            return {
                rows: [],
                search: '',
                idEditRow: '',
                name: '',
                location: '',
                currency: '',
            }
        },
        watch: {
            search: function (value) {
                this.rowsFilter(value);
            }
        },
        methods: {
            ...mapGetters(['getTable']),
            ...mapMutations(['setTable']),
            compare: function (property) {
                let sortOrder = 1;
                if (property[0] === "-") {
                    sortOrder = -1;
                    property = property.substr(1);
                }
                return function (a, b) {
                    const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                    return result * sortOrder;
                }
            },
            sortBy: function (fieldName) {
                this.rows.sort(this.compare(fieldName))
            },
            rowsFilter: function (val) {
                this.rows = this.getTable().filter(el => el.name.toLowerCase().includes(val.toLowerCase()))
            },
            editTable: function ({id, name, location, currency}) {
                if (this.idEditRow === '') {
                    this.idEditRow = id;
                    this.name = name;
                    this.location = location;
                    this.currency = currency;
                } else {
                    if (this.validate()) {
                        this.rows = this.rows.map(el => {
                            if (el.id === this.idEditRow) {
                                return {
                                    id: this.idEditRow,
                                    name: this.name,
                                    location: this.location,
                                    currency: +this.currency,
                                }
                            } else {
                                return el;
                            }
                        });
                        this.setTable(this.rows);
                        this.idEditRow = '';
                    }

                }
            },
            validate: function () {
                // some validations
                if (this.name !== '' && this.location !== '' && this.currency !== '') {
                    if (!isNaN(parseFloat(this.currency)) && isFinite(this.currency)) {
                        return true;
                    }
                }
                return false;
            },
        },
        beforeMount() {
            this.rows = this.getTable();
        },
        computed: {
            total: function () {
                return this.rows.reduce((total, item) => total + item.currency, 0)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/scss/style';

    .table {
        table {
            border-collapse: collapse;
        }

        th, td {
            padding: 6px;
        }

        thead tr {
            background: $color-bg;
        }

        tbody tr {
            &:nth-child(even) {
                background: $color-bg;
            }

            transition: all 100ms;
            @include on-event() {
                transform: scale(1.01);
                box-shadow: 0 0 3px $color-boder;
            }
        }

        tfoot tr {
            font-weight: 600;
        }

        i:not(.fa-search) {
            margin: 0 6px;
            color: $color-black;
            transition: all 100ms;
            @include on-event() {
                color: $color-primary;
                cursor: pointer;
                transform: scale(1.3);
            }
        }
    }

    .table__search {
        [type=text] {
            width: 300px;
            padding: 10px;
            font-size: 1.2rem;
            margin: 20px 10px 20px 0;
            border: none;
            border-bottom: 1px solid $color-boder;
            transition: all 300ms;

            &:focus {
                outline: none;
                box-shadow: 0 1px $color-primary;
            }
        }
    }

    .table__total {
        text-align: right;
    }

    .table__row {
        input {
            max-width: 80px;
        }
    }

</style>
