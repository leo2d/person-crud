import Person from '../../domain/person/person';

const mapFromRequest = (body: any): Person => {
  const person = new Person();

  person.id = body?.id;
  person.status = body?.status;
  person.name = body.name;
  person.address = body.address;
  person.phoneNumber = body.phoneNumber;
  person.birthDate = body?.birthDate;

  return person;
};

export { mapFromRequest };
