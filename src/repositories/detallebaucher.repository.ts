import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Detallebaucher, DetallebaucherRelations} from '../models';

export class DetallebaucherRepository extends DefaultCrudRepository<
  Detallebaucher,
  typeof Detallebaucher.prototype.id,
  DetallebaucherRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Detallebaucher, dataSource);
  }
}
