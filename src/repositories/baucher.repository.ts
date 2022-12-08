import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Baucher, BaucherRelations, Detallebaucher} from '../models';
import {DetallebaucherRepository} from './detallebaucher.repository';

export class BaucherRepository extends DefaultCrudRepository<
  Baucher,
  typeof Baucher.prototype.id,
  BaucherRelations
> {

  public readonly detallebauchers: HasManyRepositoryFactory<Detallebaucher, typeof Baucher.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('DetallebaucherRepository') protected detallebaucherRepositoryGetter: Getter<DetallebaucherRepository>,
  ) {
    super(Baucher, dataSource);
    this.detallebauchers = this.createHasManyRepositoryFactoryFor('detallebauchers', detallebaucherRepositoryGetter,);
    this.registerInclusionResolver('detallebauchers', this.detallebauchers.inclusionResolver);
  }
}
