import React from 'react';
import { Table } from '@devexpress/dx-react-grid-bootstrap4';
import { Button } from 'react-bootstrap';

const Action = function(props) {
  const handleEdit = () => console.log(props.row);
  const handleDelete = () => console.log(props.row);
  return (
    <Table.Cell {...props}>
      <Button
        onClick={handleEdit}
        variant={'info'}
        size={'sm'}
        className="mr-2"
      >
        Editar
      </Button>
      {/* <Button
        onClick={handleEdit}
        variant={'warning'}
        size={'sm'}
        className="mr-2"
      >
        Inativar
      </Button> */}
      <Button onClick={handleDelete} size={'sm'} variant={'danger'}>
        Excluir
      </Button>
    </Table.Cell>
  );
};

export default Action;
