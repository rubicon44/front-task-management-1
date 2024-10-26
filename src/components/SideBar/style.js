import styled from 'styled-components';

export const SideBarSection = styled.ul`
  > div {
    list-style: none;
  }
  > div:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const SideBarStyle = styled.aside`
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;
