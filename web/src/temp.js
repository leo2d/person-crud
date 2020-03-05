import React, { useState, useRef, useCallback } from 'react';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import 'bootstrap/dist/css/bootstrap.min.css';
import saveAs from 'file-saver';

import {
  Grid,
  Table,
  TableHeaderRow,
  Toolbar,
  ExportPanel,
  VirtualTable,
} from '@devexpress/dx-react-grid-bootstrap4';
import { generateRows } from './demo-data/generator';

const Acoes = function(props) {
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

const Cell = props => {
  const { column } = props;
  if (column.name === 'acoes') {
    return <Acoes {...props} />;
  }
  return <Table.Cell {...props} />;
};

function App() {
  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
    { name: 'acoes', title: 'Ações' },
  ]);
  const [rows] = useState(generateRows({ length: 8 }));
  const exporterRef = useRef(null);

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  const onSave = workbook => {
    workbook.xlsx.writeBuffer().then(buffer => {
      saveAs(
        new Blob([buffer], { type: 'application/octet-stream' }),
        'DataGrid.xlsx'
      );
    });
  };

  return (
    <>
      <Grid rows={rows} columns={columns}>
        <VirtualTable />
        <SortingState />
        <IntegratedSorting />
        <Table cellComponent={Cell} />
        <TableHeaderRow showSortingControls />
        <Toolbar />
        <ExportPanel startExport={startExport} />
      </Grid>
      <GridExporter
        ref={exporterRef}
        rows={rows}
        columns={columns}
        onSave={onSave}
      />
    </>
  );
}

export default App;
