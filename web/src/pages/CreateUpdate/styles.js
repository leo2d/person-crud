import styled from 'styled-components';

export const PersonFormContainer = styled.div``;
export const InputsContainer = styled.div``;

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
