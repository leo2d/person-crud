import React, { useState } from 'react';
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
  FormLabel,
} from 'react-bootstrap';

import { useHistory } from 'react-router-dom';

import { PersonFormContainer, InputsContainer } from './styles';
import Person from '../../types/person';
import Api from '../../services/api';

interface state {
  focusedInput?: boolean;
  person: Person;
}

const CreateUpdate = () => {
  const initialState: state = {
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

  const history = useHistory();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const phoneStr = state.person.phoneNumber.replace(/\D/g, '');

    const person: Person = { ...state.person, phoneNumber: phoneStr };

    await Api.post('/person', person);

    history.push('/home');
  };

  const managePhone = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
    <div>
      <Link to="/">Home</Link>
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
              <FormControl
                required
                placeholder="Nome"
                onChange={(e: any) =>
                  setState({
                    ...state,
                    person: { ...state.person, name: e.target.value },
                  })
                }
                value={state?.person?.name}
              />
              <FormControl
                required
                placeholder="Endereço"
                onChange={(e: any) =>
                  setState({
                    ...state,
                    person: { ...state.person, address: e.target.value },
                  })
                }
                value={state?.person?.address}
              />
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
      <h4>{state.person?.name}</h4>
      <h4>{state.person?.address}</h4>
      <h4>{`${state.person?.phoneNumber || ''}`}</h4>
      <h4>{`${state.person?.birthDate || ''}`}</h4>
    </div>
  );
};

export default CreateUpdate;
