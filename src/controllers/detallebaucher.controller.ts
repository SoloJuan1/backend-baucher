import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Detallebaucher} from '../models';
import {DetallebaucherRepository} from '../repositories';

export class DetallebaucherController {
  constructor(
    @repository(DetallebaucherRepository)
    public detallebaucherRepository : DetallebaucherRepository,
  ) {}

  @post('/detallebauchers')
  @response(200, {
    description: 'Detallebaucher model instance',
    content: {'application/json': {schema: getModelSchemaRef(Detallebaucher)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallebaucher, {
            title: 'NewDetallebaucher',
            exclude: ['id'],
          }),
        },
      },
    })
    detallebaucher: Omit<Detallebaucher, 'id'>,
  ): Promise<Detallebaucher> {
    return this.detallebaucherRepository.create(detallebaucher);
  }

  @get('/detallebauchers/count')
  @response(200, {
    description: 'Detallebaucher model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Detallebaucher) where?: Where<Detallebaucher>,
  ): Promise<Count> {
    return this.detallebaucherRepository.count(where);
  }

  @get('/detallebauchers')
  @response(200, {
    description: 'Array of Detallebaucher model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Detallebaucher, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Detallebaucher) filter?: Filter<Detallebaucher>,
  ): Promise<Detallebaucher[]> {
    return this.detallebaucherRepository.find(filter);
  }

  @patch('/detallebauchers')
  @response(200, {
    description: 'Detallebaucher PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallebaucher, {partial: true}),
        },
      },
    })
    detallebaucher: Detallebaucher,
    @param.where(Detallebaucher) where?: Where<Detallebaucher>,
  ): Promise<Count> {
    return this.detallebaucherRepository.updateAll(detallebaucher, where);
  }

  @get('/detallebauchers/{id}')
  @response(200, {
    description: 'Detallebaucher model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Detallebaucher, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Detallebaucher, {exclude: 'where'}) filter?: FilterExcludingWhere<Detallebaucher>
  ): Promise<Detallebaucher> {
    return this.detallebaucherRepository.findById(id, filter);
  }

  @patch('/detallebauchers/{id}')
  @response(204, {
    description: 'Detallebaucher PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallebaucher, {partial: true}),
        },
      },
    })
    detallebaucher: Detallebaucher,
  ): Promise<void> {
    await this.detallebaucherRepository.updateById(id, detallebaucher);
  }

  @put('/detallebauchers/{id}')
  @response(204, {
    description: 'Detallebaucher PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detallebaucher: Detallebaucher,
  ): Promise<void> {
    await this.detallebaucherRepository.replaceById(id, detallebaucher);
  }

  @del('/detallebauchers/{id}')
  @response(204, {
    description: 'Detallebaucher DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detallebaucherRepository.deleteById(id);
  }
}
