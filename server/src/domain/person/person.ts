import { StatusPerson } from '../shared/enums/statusEnum';
import { BaseEntity } from '../shared/entities/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export default class Person extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 600 })
  address: string;

  @Column({ type: 'varchar', length: 11 })
  phoneNumber: number;

  @Column({ type: 'enum', enum: StatusPerson, default: StatusPerson.Active })
  status: StatusPerson;

  @Column({ type: 'date', default: null })
  birthDate?: Date;

  setInitialStatus() {
    this.enable();
  }
  disable() {
    this.status = StatusPerson.Inactive;
  }
  enable() {
    this.status = StatusPerson.Active;
  }
  markDeleted() {
    this.status = StatusPerson.Deleted;
  }
}
