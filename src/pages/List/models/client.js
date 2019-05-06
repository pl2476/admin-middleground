import queryCustoms from '@/services/customs';
import { notification } from 'antd';

export default {
  namespace: 'client',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *list({ payload }, { call, put, select }) {
      const oldData = yield select(state => state.client.data);
      const res = yield call(queryCustoms, payload);
      if (res.code === 200) {
        let { data } = res;
        if (payload.pageNumber > 1) {
          data = [...oldData.list, ...data];
        }
        console.log('client', data);
        yield put({
          type: 'saveClient',
          payload: {
            list: data,
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
    saveClient(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
