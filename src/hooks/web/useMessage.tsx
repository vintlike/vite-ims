import { getIntlText } from '@/locales';
import { message, Modal } from 'antd';

import type { ModalFuncProps } from 'antd';

function createElMessageBox(content: string, title: string, options: ModalFuncProps) {
  Modal.error({ title, content, ...options });
}

export function createErrorModal(msg: string) {
  createElMessageBox(msg, getIntlText('api.errorTip'), { centered: true });
}

export function createErrorMsg(msg: string) {
  message.error(msg);
}

export function useMessage() {
  return {
    createErrorModal,
    createErrorMsg
  };
}
