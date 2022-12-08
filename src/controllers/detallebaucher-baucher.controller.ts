import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Detallebaucher,
  Baucher,
} from '../models';
import {DetallebaucherRepository} from '../repositories';

export class DetallebaucherBaucherController {
  constructor(
    @repository(DetallebaucherRepository)
    public detallebaucherRepository: DetallebaucherRepository,
  ) { }

  @get('/detallebauchers/{id}/baucher', {
    responses: {
      '200': {
        description: 'Baucher belonging to Detallebaucher',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Baucher)},
          },
        },
      },
    },
  })
  async getBaucher(
    @param.path.string('id') id: typeof Detallebaucher.prototype.id,
  ): Promise<Baucher> {
    return this.detallebaucherRepository.baucher(id);
  }
}
