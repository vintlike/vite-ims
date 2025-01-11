import { styled } from 'styled-components';

export const CopyrightLayout = styled.div`
  line-height: 40px;
  margin: 0 auto;
  font-size: 14px;
  text-align: center;
`;

interface Props {
  style?: React.CSSProperties;
}

export const Copyright: React.FC<Props> = (props) => {
  const { style } = props;

  return <CopyrightLayout style={style}>Copyright © {new Date().getFullYear()}</CopyrightLayout>;
};
