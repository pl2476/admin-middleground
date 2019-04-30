import queryCustoms from '@/services/customs';
import { notification } from 'antd';

export default {
  namespace: 'customs',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const res = yield call(queryCustoms, payload);
      if (res.code === 200) {
        yield put({
          type: 'saveCustoms',
          payload: {
            list: res.data,
            pagination: {
              pageSize: res.pageSize,
              total: res.totalRecords,
              current: res.pageNumber,
            },
          },
        });
      } else {
        notification.error({
          message: 'error',
          description: 'error',
          onClick: () => {},
        });
      }
    },
  },

  reducers: {
    saveCustoms(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
