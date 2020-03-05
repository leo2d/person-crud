import React from 'react';
import { Table } from '@devexpress/dx-react-grid-bootstrap4';
import Action from '../Action';

const Cell = props => {
  const { column } = props;
  if (column.name === 'actions') {
    return <Action {...props} />;
  }
  return <Table.Cell {...props} />;
};

export default Cell;
