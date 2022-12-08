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
  Cuenta,
} from '../models';
import {DetallebaucherRepository} from '../repositories';

export class DetallebaucherCuentaController {
  constructor(
    @repository(DetallebaucherRepository)
    public detallebaucherRepository: DetallebaucherRepository,
  ) { }

  @get('/detallebauchers/{id}/cuenta', {
    responses: {
      '200': {
        description: 'Cuenta belonging to Detallebaucher',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cuenta)},
          },
        },
      },
    },
  })
  async getCuenta(
    @param.path.string('id') id: typeof Detallebaucher.prototype.id,
  ): Promise<Cuenta> {
    return this.detallebaucherRepository.cuenta(id);
  }
}
