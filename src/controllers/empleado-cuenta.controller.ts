import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Empleado,
  Cuenta,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoCuentaController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/cuentas', {
    responses: {
      '200': {
        description: 'Array of Empleado has many Cuenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cuenta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cuenta>,
  ): Promise<Cuenta[]> {
    return this.empleadoRepository.cuentas(id).find(filter);
  }

  @post('/empleados/{id}/cuentas', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cuenta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cuenta, {
            title: 'NewCuentaInEmpleado',
            exclude: ['id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) cuenta: Omit<Cuenta, 'id'>,
  ): Promise<Cuenta> {
    return this.empleadoRepository.cuentas(id).create(cuenta);
  }

  @patch('/empleados/{id}/cuentas', {
    responses: {
      '200': {
        description: 'Empleado.Cuenta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cuenta, {partial: true}),
        },
      },
    })
    cuenta: Partial<Cuenta>,
    @param.query.object('where', getWhereSchemaFor(Cuenta)) where?: Where<Cuenta>,
  ): Promise<Count> {
    return this.empleadoRepository.cuentas(id).patch(cuenta, where);
  }

  @del('/empleados/{id}/cuentas', {
    responses: {
      '200': {
        description: 'Empleado.Cuenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cuenta)) where?: Where<Cuenta>,
  ): Promise<Count> {
    return this.empleadoRepository.cuentas(id).delete(where);
  }
}
