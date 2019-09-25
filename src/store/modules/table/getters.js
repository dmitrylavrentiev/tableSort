const getTable = (state) => {
    return state.table;
};
const getItem = state => id => {
    return state.table.filter(el => el.id === id)[0];
};

export default {
    getTable,
    getItem,

}