import { Outlet } from 'react-router-dom';
import { Main } from 'src/layouts/Main';
import { SideBar } from 'src/components/SideBar';
import { Header } from 'src/components/Header';
import { ContainerStyle } from 'src/layouts/PageLayout/style';

export const PageLayout = () => {
  return (
    <>
      <Header />
      <ContainerStyle>
        <SideBar />
        <Main>
          <Outlet />
        </Main>
      </ContainerStyle>
    </>
  );
};
