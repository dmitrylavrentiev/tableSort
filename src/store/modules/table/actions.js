import data from '../../../test'

const getTable = ({commit}) => {
    commit('setTable', data);
};

export default {
    getTable,
}
