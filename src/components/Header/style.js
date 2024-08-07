import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderStyle = styled.header`
  width: 100%;
  padding: 12px 15px;
  box-sizing: border-box;
  background-color: #eeeff1;
`;

export const HeaderTitle = styled.h1`
  // width: 40px;
  // height: 40px;
  width: 120px;
  height: 25px;
  border-radius: 35px;
  font-size: 12px;
  color: rgb(255, 255, 255);
  background: rgb(237, 128, 119);
`;

export const HeaderTitleLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
`;
