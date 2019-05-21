import { notification } from 'antd';

export default {
  namespace: 'booking',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *list({ payload }, { put, select }) {
      const oldData = yield select(state => state.booking.data);
      const { list } = oldData;
      const res = {
        code: 200,
        data: [],
      };
      for (let i = list.length; i < list.length + 10; i += 1) {
        res.data.push({
          id: i,
          number: Math.floor(Math.random() * 1000),
          appointment: '2019-05-15',
          shop: 'HCSPA',
          fullName: 'LO Au /Ms Bowie Au',
          itemsDetail: '17:30 / Booked / Under Arm Waxing',
          status: Math.floor(Math.random() * 10) % 4,
        });
      }
      if (res.code === 200) {
        let { data } = res;
        if (payload.pageNumber > 1) {
          data = [...oldData.list, ...data];
        }
        yield put({
          type: 'saveBooking',
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
    saveBooking(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
