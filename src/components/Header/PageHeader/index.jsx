import { BackArrow } from 'src/components/Arrow/BackArrow';
import { Title } from 'src/components/Title';
import { BasePageHeader, TitleCover } from 'src/components/Header/PageHeader/style';

export const PageHeader = ({ title }) => (
  <BasePageHeader>
    <BackArrow />
    <TitleCover>
      <Title>{title}</Title>
    </TitleCover>
  </BasePageHeader>
);
