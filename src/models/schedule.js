import { notification } from 'antd';

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
];

export default {
  namespace: 'schedule',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *resource({ payload }, { put }) {
      setTimeout(() => {}, 1000);
      if (resourceMap.length > 0 && payload.pageSize > 0) {
        yield put({
          type: 'saveResourceMap',
          payload: {
            list: resourceMap,
            pagination: {
              pageSize: 10,
              total: 4,
              current: 1,
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
    saveResourceMap(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
