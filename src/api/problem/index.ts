import request from '@/utils/request';

enum API {
  LIST_PROBLEM_URL = '/problem/list',
  PROBLEM_URL = '/problem',
}

export const reqProblemList = (page: number, limit: number): Promise<any> => {
  return request.get(API.LIST_PROBLEM_URL + `/${page}/${limit}`);
};

export const reqProblem = (problemNumber: string): Promise<any> => {
  return request.get(API.PROBLEM_URL + `/${problemNumber}`);
};
