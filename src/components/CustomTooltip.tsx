import { styled } from '@/global';
import { Tooltip } from 'antd';
import React from 'react';
import type { TooltipProps } from 'antd';

const TipTitleLayout = styled.div`
  color: #353535;
  word-break: break-all;
  max-height: 300px;
  overflow-y: auto;
`;

type Props = TooltipProps & {
  title: string | React.ReactNode;
  children: React.ReactNode;
};

export const CustomTooltip: React.FC<Props> = (props) => {
  const { title, children, placement = 'topLeft', arrowPointAtCenter, color, ...rest } = props;
  return (
    <Tooltip
      {...rest}
      styles={{ root: { maxWidth: 500 } }}
      placement={placement}
      arrow={arrowPointAtCenter ?? true}
      color={color ?? '#fff'}
      title={!title ? null : <TipTitleLayout>{title}</TipTitleLayout>}
    >
      {children}
    </Tooltip>
  );
};
