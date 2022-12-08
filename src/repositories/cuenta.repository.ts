import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Cuenta, CuentaRelations, Empleado, Detallebaucher} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {DetallebaucherRepository} from './detallebaucher.repository';

export class CuentaRepository extends DefaultCrudRepository<
  Cuenta,
  typeof Cuenta.prototype.id,
  CuentaRelations
> {

  public readonly empleado: BelongsToAccessor<Empleado, typeof Cuenta.prototype.id>;

  public readonly detallebauchers: HasManyRepositoryFactory<Detallebaucher, typeof Cuenta.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('DetallebaucherRepository') protected detallebaucherRepositoryGetter: Getter<DetallebaucherRepository>,
  ) {
    super(Cuenta, dataSource);
    this.detallebauchers = this.createHasManyRepositoryFactoryFor('detallebauchers', detallebaucherRepositoryGetter,);
    this.registerInclusionResolver('detallebauchers', this.detallebauchers.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
  }
}
