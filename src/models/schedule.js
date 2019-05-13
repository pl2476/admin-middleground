import { notification } from 'antd';

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
];

const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'MS training',
    allDay: true,
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
];

export default {
  namespace: 'schedule',

  state: {
    resourceMap: [],
    events: [],
  },

  effects: {
    *resource({ payload }, { put }) {
      setTimeout(() => {}, 1000);
      if (resourceMap.length > 0 && payload) {
        yield put({
          type: 'saveResourceMap',
          payload: {
            resourceMap,
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
    *events({ payload }, { put }) {
      setTimeout(() => {}, 1000);
      if (events.length > 0 && payload) {
        yield put({
          type: 'saveEvents',
          payload: {
            events,
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
        ...action.payload,
      };
    },
    saveEvents(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
