import { CopyrightLayout } from '../AppStyle';

interface Props {
  style?: React.CSSProperties;
}

export const Copyright: React.FC<Props> = (props) => {
  const { style } = props;

  return <CopyrightLayout style={style}>Copyright © {new Date().getFullYear()}</CopyrightLayout>;
};
