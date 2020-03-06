import React from 'react';
import { Table } from '@devexpress/dx-react-grid-bootstrap4';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Api from '../../services/api';

const Action = function(props) {
  const history = useHistory();

  const handleEdit = () => {
    history.push({ pathname: '/edit', state: { item: props.row } });
  };
  const handleDelete = async () => {
    const { id } = props.row;
    await Api.delete(`/person/${id}`);

    window.location.reload();
  };
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
      <Button onClick={handleDelete} size={'sm'} variant={'danger'}>
        Excluir
      </Button>
    </Table.Cell>
  );
};

export default Action;
