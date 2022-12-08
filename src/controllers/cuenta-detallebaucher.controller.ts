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
  Cuenta,
  Detallebaucher,
} from '../models';
import {CuentaRepository} from '../repositories';

export class CuentaDetallebaucherController {
  constructor(
    @repository(CuentaRepository) protected cuentaRepository: CuentaRepository,
  ) { }

  @get('/cuentas/{id}/detallebauchers', {
    responses: {
      '200': {
        description: 'Array of Cuenta has many Detallebaucher',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Detallebaucher)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Detallebaucher>,
  ): Promise<Detallebaucher[]> {
    return this.cuentaRepository.detallebauchers(id).find(filter);
  }

  @post('/cuentas/{id}/detallebauchers', {
    responses: {
      '200': {
        description: 'Cuenta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Detallebaucher)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cuenta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallebaucher, {
            title: 'NewDetallebaucherInCuenta',
            exclude: ['id'],
            optional: ['cuentaId']
          }),
        },
      },
    }) detallebaucher: Omit<Detallebaucher, 'id'>,
  ): Promise<Detallebaucher> {
    return this.cuentaRepository.detallebauchers(id).create(detallebaucher);
  }

  @patch('/cuentas/{id}/detallebauchers', {
    responses: {
      '200': {
        description: 'Cuenta.Detallebaucher PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallebaucher, {partial: true}),
        },
      },
    })
    detallebaucher: Partial<Detallebaucher>,
    @param.query.object('where', getWhereSchemaFor(Detallebaucher)) where?: Where<Detallebaucher>,
  ): Promise<Count> {
    return this.cuentaRepository.detallebauchers(id).patch(detallebaucher, where);
  }

  @del('/cuentas/{id}/detallebauchers', {
    responses: {
      '200': {
        description: 'Cuenta.Detallebaucher DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Detallebaucher)) where?: Where<Detallebaucher>,
  ): Promise<Count> {
    return this.cuentaRepository.detallebauchers(id).delete(where);
  }
}
