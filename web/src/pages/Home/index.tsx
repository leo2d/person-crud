import React, { useState, useEffect } from 'react';
import { DateSingleInput } from '@datepicker-react/styled';

import { Container } from './styles';
import Api from '../../services/api';
import Person from '../../types/person';

interface state {
  focusedInput?: boolean;
  birthDate?: Date;
}

const Home: React.FC = () => {
  const [people, setPeople] = useState(new Array<Person>());

  const initialState: state = {
    focusedInput: undefined,
    birthDate: undefined,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function loadPeople() {
      const response = await Api.get(`/person`);
      const { data } = response?.data;

      if (data) {
        setPeople(data);
      }
    }

    loadPeople();
  }, []);

  return (
    <>
      <DateSingleInput
        onDateChange={data => setState({ ...state, birthDate: data.date })}
        displayFormat="dd/MM/yyyy"
        showDatepicker={state.focusedInput}
        date={state.birthDate}
        onFocusChange={data => setState({ ...state, focusedInput: data })}
      />
      <Container>
        <br />

        <br />
        <h2>hello my friend</h2>

        {people.map((p, idx, people) => {
          return (
            <div key={p.id}>
              <h2>{p.name}</h2>
            </div>
          );
        })}

        <div>
          <h3>{`${state.birthDate}`}</h3>
        </div>
      </Container>
    </>
  );
};

export default Home;
