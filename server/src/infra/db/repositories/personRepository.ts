import { getConnection } from 'typeorm';
import Person from '../../../domain/person/person';

export function getPersonRepository() {
  const conn = getConnection();
  const personRepository = conn.getRepository(Person);
  return personRepository;
}
