import Person from '../../domain/person/person';

const mapFromRequest = (body: any): Person => {
  const person = new Person();

  console.log(body);

  person.id = body?.id;
  person.status = body?.status;
  person.name = body.name;
  person.address = body.address;
  person.phoneNumber = parseInt(body.phoneNumber);
  person.birthDate = body?.birthDate;

  console.log('person');
  console.log(person);
  return person;
};

export { mapFromRequest };
