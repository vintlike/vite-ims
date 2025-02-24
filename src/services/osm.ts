import { deffHttp } from '@/utils/axios';

export const getPlaceInfo = (keyword: string) =>
  deffHttp.get(
    {
      url: '/api/search',
      params: { keyword }
    },
    { errorMessageMode: 'modal', withToken: false }
  );
