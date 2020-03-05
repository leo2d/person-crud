import styled from 'styled-components';

export const PersonFormContainer = styled.div`
  padding-top: 40px;
`;
export const InputsContainer = styled.div``;

export const Header = styled.div`
  padding: 10px;
  background: #3498db;
  &::after,
  ::before {
    content: '';
    display: table;
    clear: both;
  }

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h3``;
export const AcionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StatusDropDown = styled.select``;
export const StatusOption = styled.option``;
