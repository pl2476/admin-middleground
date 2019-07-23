import { parse } from 'url';
import { prefixInteger } from '@/utils/utils';

const times = [{ id: 'id', time: '' }];
let hour = 0;
let min = '';
for (let i = 0; i < 48; i += 1) {
  if (i % 2 !== 0) {
    min = '30';
    times.push({
      id: i,
      time: `${prefixInteger(hour, 2)}:${min}`,
    });
    hour += 1;
  } else {
    min = '00';
    times.push({
      id: i,
      time: `${prefixInteger(hour, 2)}:${min}`,
    });
  }
}

let items = [];
items = [
  {
    id: 1,
    name: 'g',
    startTime: '00:30',
    duration: 60,
    description: 'Hold fast to dreams',
  },
  {
    id: 2,
    name: 'c',
    startTime: '01:00',
    duration: 30,
    description: 'For if dreams die',
  },
  {
    id: 3,
    name: 'i',
    startTime: '02:00',
    duration: 90,
    description: 'Life is a broken-winged bird That cannot fly',
  },
];

function getItems(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = items;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function getTimes(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = times;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}
function postItem(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, name, startTime, id, duration, description } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      items = items.filter(item => id.indexOf(item.id) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      items.unshift({
        id: i,
        name,
        startTime,
        duration,
        description,
      });
      break;
    case 'update':
      items = items.map(item => {
        if (item.id === id) {
          Object.assign(item, { startTime, name });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: items,
    pagination: {
      total: items.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/getTimes': getTimes,
  'GET /api/getItems': getItems,
  'POST /api/postItem': postItem,
};
