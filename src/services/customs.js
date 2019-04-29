import request from '@/utils/request';

export default async function queryCustoms(params) {
  return request(
    `/proxy/clientView/searchClientList?userCode=${params.userCode}&pageNumber=${
      params.pageNumber
    }&pageSize=${params.pageSize}`
  );
}
