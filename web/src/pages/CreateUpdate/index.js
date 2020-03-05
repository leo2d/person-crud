import React, { useState, useEffect } from 'react';
import { DateSingleInput } from '@datepicker-react/styled';
import { ThemeProvider } from 'styled-components';
import InputMask from 'react-input-mask';
import {
  Button,
  Container,
  Form,
  FormControl,
  Row,
  Col,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';

import { useHistory } from 'react-router-dom';

import { getStatusLabel } from '../../utils/statusUtils';
import { formatToBRdate } from '../../utils/dateFormater';
import {
  PersonFormContainer,
  InputsContainer,
  Header,
  Title,
  AcionButtonsContainer,
  StatusDropDown,
  StatusOption,
} from './styles';
import Api from '../../services/api';

const CreateUpdate = props => {
  const initialPersonState = {
    person: {
      id: null,
      name: '',
      address: '',
      phoneNumber: null,
      birthDate: null,
      status: null,
    },
  };

  const InitialFormState = {
    focusedInput: null,
    isEditing: false,
    isValid: false,
  };

  const [person, setPerson] = useState(initialPersonState);
  const [formState, setFormState] = useState(InitialFormState);

  useEffect(() => {
    async function loadPerson() {
      const personId = props.location?.state?.item?.id;

      if (personId) {
        const response = await Api.get(`/person/${personId}`);
        const { data } = response?.data;

        if (data) {
          const serverPerson = data[0];
          const person = {
            ...serverPerson,
            // status: getStatusLabel(serverPerson.status),
            birthDate: serverPerson?.birthDate
              ? new Date(serverPerson?.birthDate)
              : null,
          };

          setPerson(person);
          setFormState({ focusedInput: undefined, isEditing: true });
        }
      }
    }

    loadPerson();
  }, []);

  const history = useHistory();

  const handleCancel = _ => {
    history.goBack();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const phoneStr = person.phoneNumber.replace(/\D/g, '');

    const newPerson = { ...person, phoneNumber: phoneStr };

    if (formState.isEditing) {
      await Api.put('/person', newPerson);
    } else {
      await Api.post('/person', newPerson);
    }

    history.push('/home');
  };

  const managePhone = e => {
    if (e.type && e.type === 'change') {
      if (e.target.value !== '') {
        setPerson({
          ...person,
          phoneNumber: e.target.value,
        });
      }
    }
  };

  return (
    <>
      <Header>
        <Title className="h3 text-white">
          {formState.isEditing ? 'Edição' : 'Cadastro'}
        </Title>
      </Header>

      <Container>
        <PersonFormContainer>
          <Form>
            <FormGroup hidden={!formState.isEditing}>
              <FormLabel>Código</FormLabel>
              <FormControl
                placeholder="Código:"
                readOnly={true}
                disabled
                value={person.id || ''}
              />
            </FormGroup>
            <InputsContainer>
              <FormGroup>
                <FormLabel>Nome</FormLabel>
                <FormControl
                  required
                  type="text"
                  placeholder="Nome"
                  onChange={e =>
                    setPerson({
                      ...person,
                      name: e.target.value,
                    })
                  }
                  value={person.name || ''}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Endereço</FormLabel>
                <FormControl
                  required
                  placeholder="Endereço"
                  onChange={e =>
                    setPerson({
                      ...person,
                      address: e.target.value,
                    })
                  }
                  value={person.address || ''}
                />
              </FormGroup>

              <Row>
                <Col md={4}>
                  <FormGroup>
                    <FormLabel>Telefone</FormLabel>
                    <InputMask
                      className="form-control has-error"
                      required
                      minLength={12}
                      alwaysShowMask={false}
                      placeholder="Telefone"
                      mask="(99) 99999-9999"
                      onChange={e => managePhone(e)}
                      value={person?.phoneNumber || ''}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <FormLabel>Data de Nascimento</FormLabel>

                    <ThemeProvider
                      theme={{
                        reactDatepicker: {
                          inputMinHeight: 'calc(1.5em + .75rem + 2px)',
                          datepickerBorderRadius: '0.25em',
                          inputLabelBorderRadius: '0.25em',
                        },
                      }}
                    >
                      <DateSingleInput
                        showResetDate={false}
                        onDateChange={data => {
                          setPerson({
                            ...person,
                            birthDate: data.date,
                          });
                        }}
                        displayFormat="dd/MM/yyyy"
                        showDatepicker={formState.focusedInput}
                        date={person?.birthDate}
                        onFocusChange={data =>
                          setFormState({ ...formState, focusedInput: data })
                        }
                      />
                    </ThemeProvider>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    {formState.isEditing && (
                      <>
                        <FormLabel>Status</FormLabel>
                        <StatusDropDown
                          className="form-control"
                          onChange={e =>
                            setPerson({ ...person, status: e.target.value })
                          }
                          value={person.status}
                        >
                          <StatusOption value={1}>Ativo</StatusOption>
                          <StatusOption value={2}>Inativo</StatusOption>
                          {person.status === 3 && (
                            <StatusOption value={3}>Excluido</StatusOption>
                          )}
                        </StatusDropDown>
                      </>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            </InputsContainer>
            <FormGroup></FormGroup>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <AcionButtonsContainer>
                    <Button
                      disabled={!formState.isValid}
                      variant="success"
                      onClick={handleSubmit}
                    >
                      Salvar
                    </Button>
                    <Button
                      variant="danger"
                      className="mr-2"
                      onClick={handleCancel}
                      size="md"
                    >
                      Cancelar
                    </Button>
                  </AcionButtonsContainer>
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup></FormGroup>
              </Col>
            </Row>
          </Form>
        </PersonFormContainer>
      </Container>
    </>
  );
};

export default CreateUpdate;
