import { getTimes } from '@/services/api';

export default {
  namespace: 'dnd',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *times({ payload }, { call, put }) {
      const res = yield call(getTimes, payload);
      yield put({
        type: 'saveTimes',
        payload: {
          list: res.list,
          pagination: res.pagination,
        },
      });
    },
  },

  reducers: {
    saveTimes(state, action) {
      return {
        ...state,
        times: action.payload,
      };
    },
  },
};
