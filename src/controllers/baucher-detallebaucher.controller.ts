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
  Baucher,
  Detallebaucher,
} from '../models';
import {BaucherRepository} from '../repositories';

export class BaucherDetallebaucherController {
  constructor(
    @repository(BaucherRepository) protected baucherRepository: BaucherRepository,
  ) { }

  @get('/bauchers/{id}/detallebauchers', {
    responses: {
      '200': {
        description: 'Array of Baucher has many Detallebaucher',
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
    return this.baucherRepository.detallebauchers(id).find(filter);
  }

  @post('/bauchers/{id}/detallebauchers', {
    responses: {
      '200': {
        description: 'Baucher model instance',
        content: {'application/json': {schema: getModelSchemaRef(Detallebaucher)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Baucher.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallebaucher, {
            title: 'NewDetallebaucherInBaucher',
            exclude: ['id'],
            optional: ['baucherId']
          }),
        },
      },
    }) detallebaucher: Omit<Detallebaucher, 'id'>,
  ): Promise<Detallebaucher> {
    return this.baucherRepository.detallebauchers(id).create(detallebaucher);
  }

  @patch('/bauchers/{id}/detallebauchers', {
    responses: {
      '200': {
        description: 'Baucher.Detallebaucher PATCH success count',
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
    return this.baucherRepository.detallebauchers(id).patch(detallebaucher, where);
  }

  @del('/bauchers/{id}/detallebauchers', {
    responses: {
      '200': {
        description: 'Baucher.Detallebaucher DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Detallebaucher)) where?: Where<Detallebaucher>,
  ): Promise<Count> {
    return this.baucherRepository.detallebauchers(id).delete(where);
  }
}
