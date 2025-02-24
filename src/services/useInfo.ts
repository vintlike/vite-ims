import { deffHttp } from '@/utils/axios';

export interface UseInfoType {
  userName: string;
  userId: string;
  email: string;
  signature: string;
  introduction: string;
  title: string;
  token: string;
  power: 'test' | 'admin';
}

export const getUserInfo = (userName: string, password: string) =>
  deffHttp.post<UseInfoType>(
    {
      url: '/mock_api/login',
      data: { userName, password }
    },
    { errorMessageMode: 'modal', withToken: false }
  );
