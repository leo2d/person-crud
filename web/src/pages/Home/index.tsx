import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Table,
  TableHeaderRow,
  Toolbar,
  ExportPanel,
  VirtualTable,
} from '@devexpress/dx-react-grid-bootstrap4';
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import { saveAs } from 'file-saver';
import { GridExporter } from '@devexpress/dx-react-grid-export';

import { Container, Header, Button, GridTest } from './styles';
import Api from '../../services/api';
import Person from '../../types/person';
import { formatToBRdateFromString } from '../../utils/dateFormater';
import Cell from '../../components/Cell';

export interface Dictionary {
  [key: number]: string;
}

const Home: React.FC = () => {
  const [people, setPeople] = useState(new Array<Person>());
  const [columns] = useState([
    { name: 'name', title: 'Nome' },
    { name: 'birthDate', title: 'Data de Nascimento' },
    { name: 'phoneNumber', title: 'Telefone' },
    { name: 'address', title: 'Endereço' },
    { name: 'status', title: 'Status' },
    { name: 'id', title: 'Código' },
    { name: 'acoes', title: 'Ações' },
  ]);

  useEffect(() => {
    async function loadPeople() {
      const response = await Api.get(`/person`);
      const { data } = response?.data;

      if (data) {
        const formatedData = data.map((p: Person) => {
          const newPerson = {
            ...p,
            // birthDate: p?.birthDate
            //   ? formatToBRdateFromString(p?.birthDate)
            //   : p?.birthDate,
            status: getStatusLabel(p.status),
          };

          return newPerson;
        });

        setPeople(formatedData);
      }
    }

    loadPeople();
  }, []);

  const exporterRef = useRef<any>();

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  const onSave = (workbook: any) => {
    workbook.xlsx.writeBuffer().then((buffer: any) => {
      saveAs(
        new Blob([buffer], { type: 'application/octet-stream' }),
        'DataGrid.xlsx'
      );
    });
  };

  const getStatusLabel = (code: number) => {
    const options: Dictionary = {
      1: 'Ativo',
      2: 'Inativo',
    };

    return options[code] || 'Excluido';
  };

  return (
    <>
      <Container>
        <Header>
          <Button ref={exporterRef} className="btn btn-dark">
            Exportar
          </Button>
          <Button className="btn btn-dark">
            <Link to="/new">Add</Link>
          </Button>
        </Header>

        <Grid rows={people} columns={columns}>
          <VirtualTable />
          <SortingState />
          <IntegratedSorting />
          <Table cellComponent={Cell} />
          <TableHeaderRow showSortingControls />
          <Toolbar />
          <ExportPanel startExport={startExport} />
        </Grid>

        {/* <GridTest
         ref={exporterRef}
         rows={people}
         columns={columns}
         onSave={onSave}
        /> */}
        <GridExporter
          // ref={exporterRef}
          rows={people}
          columns={columns}
          onSave={onSave}
        />
      </Container>
    </>
  );
};

export default Home;
