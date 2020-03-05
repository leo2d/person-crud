import styled from 'styled-components';

export const Container = styled.div``;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background: #3498db;
  &::after,
  ::before {
    content: '';
    display: table;
    clear: both;
  }
`;

export const Button = styled.button`
  float: right;

  button:link {
    text-decoration: none !important;
    color: #fff !important;
  }
`;
