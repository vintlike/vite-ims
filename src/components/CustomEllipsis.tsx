import { styled } from '@/global';
import { getNodeText } from '@/utils/DomUtil';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { TooltipProps } from 'antd';
import { CopyToClipboard } from './CopyToClipboard';
import { CustomTooltip } from './CustomTooltip';

interface ITextProps {
  lines?: number;
}

const EllipsisLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  .text-show-all,
  .text-copy {
    display: inline-flex;
    flex: 0 0 auto;
    cursor: pointer;
    color: var(--primary-color);
    padding: 0 8px;
    width: auto;
  }
`;

const TextLayout = styled.div<ITextProps>`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: normal;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => props.lines};
  line-clamp: ${(props) => props.lines};
`;

interface Props {
  /** 输入文本、数字 */ text: React.ReactNode;
  /** 行数，默认2行，溢出省略号 */ lines?: number;
  /** 个性化样式 */ style?: React.CSSProperties;
  /** 点击事件 */ onClick?: () => void;
  /** 提示组件参数 */ tooltipProps?: TooltipProps;
  /** 是否展示全部 */ showAll?: boolean;
  /** 展开文案 */ allText?: string;
  /** 是否展示复制 */ showCopy?: boolean;
  /** 复制文案 */ copyText?: string;
}

const CustomEllipsis: React.FC<Props> = (props) => {
  const { text, lines = 1, style, onClick, tooltipProps, showAll, showCopy, allText, copyText } = props;

  const ref = useRef<any>(null);
  const [needEllipsis, setNeedEllipsis] = useState(false);
  const [isShowAll, setIsShowAll] = useState(false);

  const onShowAll = useCallback((val: boolean) => {
    setIsShowAll(!val);
  }, []);

  const getText = useCallback(() => {
    let textStr = text ?? '';
    // 兼容获取dom节点文本
    if (typeof text === 'object' && ref.current) {
      const txt = ref.current;
      textStr = getNodeText(txt);
    }
    return `${textStr}`;
  }, [text]);

  useEffect(() => {
    const elem = ref.current;

    const lineHeight = parseFloat(window.getComputedStyle(elem).lineHeight);
    const maxHeight = lineHeight * lines;
    if (elem?.scrollHeight > maxHeight) {
      setNeedEllipsis(true);
    }
  }, [lines, text]);

  return (
    <EllipsisLayout>
      {isShowAll && needEllipsis ? (
        text
      ) : (
        <TextLayout ref={ref} lines={lines} onClick={onClick} style={style}>
          <CustomTooltip {...tooltipProps} title={!needEllipsis ? null : text}>
            <div className="text-content">{text}</div>
          </CustomTooltip>
        </TextLayout>
      )}

      {showAll && needEllipsis && (
        <div className="text-show-all" onClick={() => onShowAll(isShowAll)}>
          {allText ?? '展示全部'}
        </div>
      )}
      {showCopy && <CopyToClipboard className={'text-copy'} useIcon={!copyText} copyText={copyText} text={getText()} />}
    </EllipsisLayout>
  );
};

export default CustomEllipsis;
