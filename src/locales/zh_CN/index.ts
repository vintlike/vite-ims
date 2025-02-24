import api from './modules/api.json';
import layout from './modules/layout.json';
import login from './modules/login.json';
import msg from './modules/msg.json';

const zh_CN = {
  ...layout,
  ...api,
  ...login,
  ...msg
};

export default zh_CN;
