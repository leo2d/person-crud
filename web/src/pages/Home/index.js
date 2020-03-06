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
import { GridExporter } from '@devexpress/dx-react-grid-export';
import { saveAs } from 'file-saver';

import { ButtonContainer, Container, Header } from './styles';
import Api from '../../services/api';
import { formatToBRdate } from '../../utils/dateFormater';
import { getStatusLabel } from '../../utils/statusUtils';
import Cell from '../../components/Cell';
import { formatPhoneNumber } from '../../utils/phoneFormater';

const Home = () => {
  const [people, setPeople] = useState([]);
  const [columns] = useState([
    { name: 'name', title: 'Nome' },
    { name: 'birthDate', title: 'Data de Nascimento' },
    { name: 'phoneNumber', title: 'Telefone' },
    { name: 'address', title: 'Endereço' },
    { name: 'status', title: 'Status' },
    { name: 'id', title: 'Código' },
    { name: 'actions', title: 'Ações' },
  ]);

  useEffect(() => {
    async function loadPeople() {
      const response = await Api.get(`/person/existing`);
      const { data } = response?.data;

      if (data) {
        const formatedData = data.map(p => {
          const newPerson = {
            ...p,
            // birthDate: formatToBRdate(p.birthDate),
            phoneNumber: formatPhoneNumber(p.phoneNumber),
            status: getStatusLabel(p.status),
          };

          return newPerson;
        });

        setPeople(formatedData);
      }
    }

    loadPeople();
  }, []);

  const exporterRef = useRef();

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
      <Container>
        <Header>
          <ButtonContainer>
            <Link className="btn btn-dark" to="/new">
              Adicionar +
            </Link>
          </ButtonContainer>
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

        <GridExporter
          ref={exporterRef}
          rows={people}
          columns={columns.filter(c => c.title !== 'actions')}
          onSave={onSave}
        />
      </Container>
    </>
  );
};

export default Home;
