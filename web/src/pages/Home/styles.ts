import styled from 'styled-components';
import { GridExporter } from '@devexpress/dx-react-grid-export';

export const Container = styled.div``;

export const Header = styled.div`
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

  a:link {
    text-decoration: none!important;
    color: #FFF!important
  }
`;


export const GridTest = styled(GridExporter)``;