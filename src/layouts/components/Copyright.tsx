interface Props {
  style?: React.CSSProperties;
}

export const Copyright: React.FC<Props> = (props) => {
  const { style } = props;

  return (
    <div className="copyright" style={style}>
      Copyright © {new Date().getFullYear()}
    </div>
  );
};
