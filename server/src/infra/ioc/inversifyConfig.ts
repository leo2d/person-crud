import { Container, AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import TYPES from '../../constants/types/types';
import PersonService from '../../domain/person/services/personService';
import { getDbConnection } from '../db/config/dbConfig';
import Person from '../../domain/person/person';
import { getPersonRepository } from '../db/repositories/personRepository';

const bindings = new AsyncContainerModule(async bind => {
  await getDbConnection();

  bind<PersonService>(TYPES.services.PersonService)
    .to(PersonService)
    .inRequestScope();

  bind<Repository<Person>>(TYPES.repositories.PersonRepository)
    .toDynamicValue(() => {
      return getPersonRepository();
    })
    .inRequestScope();
});

const setupContainer = async () => {
  const newContainer = new Container();

  await newContainer.loadAsync(bindings);

  return newContainer;
};

export default setupContainer;
