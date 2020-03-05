import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
} from 'react-bootstrap';

import { useHistory } from 'react-router-dom';

import { getStatusLabel } from '../../utils/statusUtils';
import { formatToBRdate } from '../../utils/dateFormater';
import { PersonFormContainer, InputsContainer, Header } from './styles';
import Api from '../../services/api';

const CreateUpdate = props => {
  const initialState = {
    focusedInput: undefined,
    person: {
      id: undefined,
      name: '',
      address: '',
      phoneNumber: undefined,
      birthDate: undefined,
      status: undefined,
    },
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function loadPerson() {
      const personId = props.location?.state?.item?.id;

      if (personId) {
        const response = await Api.get(`/person/${personId}`);
        const { data } = response?.data;

        if (data) {
          const serverPerson = data[0];
          const newPerson = {
            ...serverPerson,
            status: getStatusLabel(serverPerson.status),
            birthDate: serverPerson?.birthDate
              ? new Date(serverPerson?.birthDate)
              : null,
          };

          setState({ ...state, person: newPerson });
        }
      }
    }

    loadPerson();
  }, []);

  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();

    const phoneStr = state.person.phoneNumber.replace(/\D/g, '');

    const person = { ...state.person, phoneNumber: phoneStr };

    if (state.person.id) {
      await Api.put('/person', person);
    } else {
      await Api.post('/person', person);
    }

    history.push('/home');
  };

  const managePhone = e => {
    if (e.type && e.type === 'change') {
      if (e.target.value !== '') {
        setState({
          ...state,
          person: {
            ...state.person,
            phoneNumber: e.target.value,
          },
        });
      }
    }
  };

  return (
    <>
      <Header>
        <Link to="/">Home</Link>
      </Header>
      <Container>
        <PersonFormContainer>
          <Form>
            <FormGroup>
              <FormControl
                placeholder="Código:"
                readOnly={true}
                disabled
                value={state?.person?.id}
              />
            </FormGroup>
            <InputsContainer>
              <FormGroup>
                <FormControl
                  required
                  placeholder="Nome"
                  onChange={e =>
                    setState({
                      ...state,
                      person: { ...state.person, name: e.target.value },
                    })
                  }
                  value={state?.person?.name}
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  required
                  placeholder="Endereço"
                  onChange={e =>
                    setState({
                      ...state,
                      person: { ...state.person, address: e.target.value },
                    })
                  }
                  value={state?.person?.address}
                />
              </FormGroup>

              <Row>
                <Col md={6}>
                  <InputMask
                    className="form-control"
                    required
                    minLength={12}
                    alwaysShowMask={false}
                    placeholder="Telefone"
                    mask="99 9 9999-9999"
                    onChange={e => managePhone(e)}
                    value={state.person?.phoneNumber || ''}
                  />
                </Col>
                <Col md={6}>
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
                      onDateChange={data =>
                        setState({
                          ...state,
                          person: { ...state.person, birthDate: data.date },
                        })
                      }
                      displayFormat="dd/MM/yyyy"
                      showDatepicker={state.focusedInput}
                      date={state.person?.birthDate}
                      onFocusChange={data =>
                        setState({ ...state, focusedInput: data })
                      }
                    />
                  </ThemeProvider>
                </Col>
              </Row>
            </InputsContainer>
            <FormGroup></FormGroup>
            <FormGroup>
              <Button variant="success" onClick={handleSubmit}>
                Salvar
              </Button>
            </FormGroup>
          </Form>
        </PersonFormContainer>
      </Container>
    </>
  );
};

export default CreateUpdate;
