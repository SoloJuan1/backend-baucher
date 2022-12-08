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
import {Baucher} from '../models';
import {BaucherRepository} from '../repositories';

export class BaucherController {
  constructor(
    @repository(BaucherRepository)
    public baucherRepository : BaucherRepository,
  ) {}

  @post('/bauchers')
  @response(200, {
    description: 'Baucher model instance',
    content: {'application/json': {schema: getModelSchemaRef(Baucher)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Baucher, {
            title: 'NewBaucher',
            exclude: ['id'],
          }),
        },
      },
    })
    baucher: Omit<Baucher, 'id'>,
  ): Promise<Baucher> {
    return this.baucherRepository.create(baucher);
  }

  @get('/bauchers/count')
  @response(200, {
    description: 'Baucher model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Baucher) where?: Where<Baucher>,
  ): Promise<Count> {
    return this.baucherRepository.count(where);
  }

  @get('/bauchers')
  @response(200, {
    description: 'Array of Baucher model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Baucher, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Baucher) filter?: Filter<Baucher>,
  ): Promise<Baucher[]> {
    return this.baucherRepository.find(filter);
  }

  @patch('/bauchers')
  @response(200, {
    description: 'Baucher PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Baucher, {partial: true}),
        },
      },
    })
    baucher: Baucher,
    @param.where(Baucher) where?: Where<Baucher>,
  ): Promise<Count> {
    return this.baucherRepository.updateAll(baucher, where);
  }

  @get('/bauchers/{id}')
  @response(200, {
    description: 'Baucher model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Baucher, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Baucher, {exclude: 'where'}) filter?: FilterExcludingWhere<Baucher>
  ): Promise<Baucher> {
    return this.baucherRepository.findById(id, filter);
  }

  @patch('/bauchers/{id}')
  @response(204, {
    description: 'Baucher PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Baucher, {partial: true}),
        },
      },
    })
    baucher: Baucher,
  ): Promise<void> {
    await this.baucherRepository.updateById(id, baucher);
  }

  @put('/bauchers/{id}')
  @response(204, {
    description: 'Baucher PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() baucher: Baucher,
  ): Promise<void> {
    await this.baucherRepository.replaceById(id, baucher);
  }

  @del('/bauchers/{id}')
  @response(204, {
    description: 'Baucher DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.baucherRepository.deleteById(id);
  }
}
