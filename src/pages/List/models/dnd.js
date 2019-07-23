import { getTimes, getItems, postItem } from '@/services/api';

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
    *items({ payload }, { call, put }) {
      const res = yield call(getItems, payload);
      yield put({
        type: 'saveItems',
        payload: {
          list: res.list,
          pagination: res.pagination,
        },
      });
    },
    *postItem({ payload }, { call, put }) {
      const res = yield call(postItem, payload);
      yield put({
        type: 'saveItems',
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
    saveItems(state, action) {
      return {
        ...state,
        items: action.payload,
      };
    },
  },
};
