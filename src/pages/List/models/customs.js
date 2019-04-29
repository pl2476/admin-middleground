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
        // notification.success({
        //   message: 'success',
        //   description: 'success',
        //   onClick: () => {
        //     console.info('Notification Clicked!');
        //   },
        // });
        yield put({
          type: 'saveCustoms',
          payload: {
            list: res.data,
            pagination: {},
          },
        });
      } else {
        notification.error({
          message: 'error',
          description: 'error',
          onClick: () => {
            console.info('error!');
          },
        });
      }
    },
  },

  reducers: {
    saveCustoms(state, action) {
      // console.log('dataUpdate', new Date().getTime(), state)
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
