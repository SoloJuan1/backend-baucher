import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Baucher, BaucherRelations} from '../models';

export class BaucherRepository extends DefaultCrudRepository<
  Baucher,
  typeof Baucher.prototype.id,
  BaucherRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Baucher, dataSource);
  }
}
