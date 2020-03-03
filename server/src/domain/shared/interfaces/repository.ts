export default interface Repository<T> {
  create(entity: T): Promise<boolean>;
  update(entity: T): Promise<boolean>;
  delete(entity: T): Promise<boolean>;
  findAll(): Promise<T[]>;
}
