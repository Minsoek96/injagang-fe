import { API } from '../../apis';

// eslint-disable-next-line no-shadow
export enum METHOD {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
  }

/** AXIOS를 좀더 오류 없이 사용하기위한 역할, GIT에 서버정보 노출을 방지하기위한역할 */
export const fetcher = async (
  method: METHOD,
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...rest: { [key: string]: any }[]
) => {
  const res = await API[method](url, ...rest);
  return res;
};
