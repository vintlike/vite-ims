import { Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
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
  const { title, children, placement = 'topLeft', arrow, color, ...rest } = props;
  return (
    <Tooltip
      {...rest}
      overlayStyle={{ maxWidth: 500 }}
      placement={placement}
      arrow={arrow ?? true}
      color={color ?? '#fff'}
      title={!title ? null : <TipTitleLayout>{title}</TipTitleLayout>}
    >
      {children}
    </Tooltip>
  );
};
