import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Container } from './styles';
import Api from '../../services/api';
import Person from '../../types/person';

const Home: React.FC = () => {
  const [people, setPeople] = useState(new Array<Person>());

  const [birthDate, setBirthDate] = useState(new Date());

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
      <Container>
        <br />

        <DatePicker
          selected={birthDate}
          onChange={date => setBirthDate(date || new Date())}
          placeholderText="Data de Nascimento"
          isClearable={true}
          dateFormat="dd/MM/yyyy"
          className="red-border"
        />

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
          <h3>{`${birthDate}`}</h3>
        </div>
      </Container>
    </>
  );
};

export default Home;
