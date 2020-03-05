import React from 'react';
import { Table } from '@devexpress/dx-react-grid-bootstrap4';

const Action = function(props: any) {
  const handleEdit = () => console.log(props.row);
  const handleDelete = () => console.log(props.row);
  return (
    <Table.Cell {...props}>
      <button onClick={handleEdit} className="btn btn-info mr-2">
        Editar
      </button>
      <button onClick={handleDelete} className="btn btn-danger">
        Excluir
      </button>
    </Table.Cell>
  );
};

export default Action;
