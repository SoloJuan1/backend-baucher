import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cuenta,
  Empleado,
} from '../models';
import {CuentaRepository} from '../repositories';

export class CuentaEmpleadoController {
  constructor(
    @repository(CuentaRepository)
    public cuentaRepository: CuentaRepository,
  ) { }

  @get('/cuentas/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Cuenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Cuenta.prototype.id,
  ): Promise<Empleado> {
    return this.cuentaRepository.empleado(id);
  }
}
