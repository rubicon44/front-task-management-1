import { HeaderStyle, HeaderTitle, HeaderTitleLink } from 'src/components/Header/style';

export const Header = () => {
  return (
    <HeaderStyle>
      <HeaderTitle>
        <HeaderTitleLink to={`/`}>
          サービスアイコン
        </HeaderTitleLink>
      </HeaderTitle>
    </HeaderStyle>
  );
};
