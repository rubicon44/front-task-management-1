import { BaseTitle } from 'src/components/Title/style';

export const Title = ({ children, className }) => (
  <BaseTitle className={className}>{children}</BaseTitle>
);
