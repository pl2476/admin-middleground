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
    start: new Date(2019, 4, 14, 9, 0, 0),
    end: new Date(2019, 4, 14, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'MS training',
    allDay: true,
    start: new Date(2019, 3, 29, 14, 0, 0),
    end: new Date(2019, 3, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2019, 4, 14, 8, 30, 0),
    end: new Date(2019, 4, 14, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 3,
    title: 'High level',
    start: new Date(2019, 4, 17, 9, 30, 0),
    end: new Date(2019, 4, 17, 12, 30, 0),
    resourceId: 4,
    style: {
      backgroundColor: 'orange',
      borderColor: 'orange',
    },
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2019, 4, 15, 7, 0, 0),
    end: new Date(2019, 4, 15, 10, 30, 0),
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
          type: 'save',
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
          type: 'save',
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
    *add({ payload }, { put, select }) {
      setTimeout(() => {}, 1000);
      const eventsData = yield select(state => state.schedule.events);
      if (payload && payload.event) {
        // eventsData.push(payload.event)
        yield put({
          type: 'save',
          payload: {
            events: eventsData,
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
    *refresh({ payload }, { put }) {
      setTimeout(() => {}, 1000);
      if (payload) {
        yield put({
          type: 'save',
          payload,
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
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
