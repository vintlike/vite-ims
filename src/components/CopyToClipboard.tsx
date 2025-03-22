import { ReactComponent as CopyIcon } from '@/assets/icons/icon-copy.svg';
import { styled } from '@/global';
import copyTextToClipboard from '@/utils/DomUtil';

import Icon from '@ant-design/icons';

import React, { useCallback, useRef } from 'react';
import type { HTMLAttributes } from 'react';

const CopyWrap = styled.div`
  position: relative;
  display: inline-block;
  flex: 0 0 auto;
  cursor: pointer;
  color: var(--primary-color);
  padding: 0 8px;
  width: auto;
  line-height: inherit;
  font-size: inherit;
`;

interface Props<T> extends HTMLAttributes<T> {
  text?: string | number;
  useIcon?: boolean;
  style?: React.CSSProperties;
  /** 复制文案 */ copyText?: string;
  className?: string;
}

export const CopyToClipboard: React.FC<Props<any>> = (props) => {
  const { text = '', useIcon, style, onChange, copyText, className, children } = props;

  const ref = useRef(null);

  const copyClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, value: any) => {
      e.preventDefault();
      e.stopPropagation();
      copyTextToClipboard(value);
      if (onChange) {
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <CopyWrap ref={ref} className={className} onClick={(e) => copyClick(e, text)} style={{ ...style }}>
      {children || !useIcon ? (copyText ?? '复制') : <Icon component={CopyIcon} />}
    </CopyWrap>
  );
};
