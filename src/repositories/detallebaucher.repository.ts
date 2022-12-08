import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Detallebaucher, DetallebaucherRelations, Baucher, Cuenta} from '../models';
import {BaucherRepository} from './baucher.repository';
import {CuentaRepository} from './cuenta.repository';

export class DetallebaucherRepository extends DefaultCrudRepository<
  Detallebaucher,
  typeof Detallebaucher.prototype.id,
  DetallebaucherRelations
> {

  public readonly baucher: BelongsToAccessor<Baucher, typeof Detallebaucher.prototype.id>;

  public readonly cuenta: BelongsToAccessor<Cuenta, typeof Detallebaucher.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('BaucherRepository') protected baucherRepositoryGetter: Getter<BaucherRepository>, @repository.getter('CuentaRepository') protected cuentaRepositoryGetter: Getter<CuentaRepository>,
  ) {
    super(Detallebaucher, dataSource);
    this.cuenta = this.createBelongsToAccessorFor('cuenta', cuentaRepositoryGetter,);
    this.registerInclusionResolver('cuenta', this.cuenta.inclusionResolver);
    this.baucher = this.createBelongsToAccessorFor('baucher', baucherRepositoryGetter,);
    this.registerInclusionResolver('baucher', this.baucher.inclusionResolver);
  }
}
