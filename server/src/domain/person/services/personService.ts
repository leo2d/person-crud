import Person from '../person';

import { injectable, inject } from 'inversify';
import { Repository } from 'typeorm';
import TYPES from '../../../constants/types/types';

@injectable()
export default class PersonService {
  private personRepository: Repository<Person>;

  constructor(
    @inject(TYPES.repositories.PersonRepository)
    personRepository: Repository<Person>
  ) {
    this.personRepository = personRepository;
  }

  async create(person: Person): Promise<void> {
    person.setInitialStatus();

    await this.save(person);
  }

  async update(person: Person): Promise<void> {
    const result = await this.personRepository.findByIds([person.id], {
      take: 1,
    });

    if (!result || !(result?.length > 0))
      throw new Error(`There is no record with the ID:: ${person.id}`);

    const updatedperson = { id: result[0].id, ...person };

    this.personRepository.update({ id: updatedperson.id }, updatedperson);
  }

  async deletePerson(id: string): Promise<void> {
    const result = await this.personRepository.findByIds([id], { take: 1 });

    if (!result || !(result?.length > 0))
      throw new Error(`There is no record with the ID:: ${id}`);

    const person = result[0];
    person.markDeleted();

    await this.save(person);
  }

  async getById(id: any): Promise<Person> {
    const result = await this.personRepository.findByIds([id], { take: 1 });

    if (!result || !(result?.length > 0)) return null;

    return result[0];
  }

  async get(): Promise<Person[]> {
    const result = await this.personRepository.find();
    return result;
  }

  private save(person: Person): Promise<Person> {
    return this.personRepository.save(person);
  }
}
