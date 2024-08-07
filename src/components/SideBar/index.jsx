import { SideBarStyle } from 'src/components/SideBar/style';

export const SideBar = () => {
  return (
    <SideBarStyle>
      <h2>左サイドバー</h2>
      <nav>
        <ul>
          <li><a href="#">リンク1</a></li>
          <li><a href="#">リンク2</a></li>
          <li><a href="#">リンク3</a></li>
          <li><a href="#">リンク4</a></li>
        </ul>
      </nav>
    </SideBarStyle>
  );
};
