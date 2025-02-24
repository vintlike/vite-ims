import api from './modules/api.json';
import layout from './modules/layout.json';
import login from './modules/login.json';
import msg from './modules/msg.json';

const en_US = {
  ...layout,
  ...api,
  ...login,
  ...msg
};

export default en_US;
