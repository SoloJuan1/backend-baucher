import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Baucher} from './baucher.model';
import {Cuenta} from './cuenta.model';

@model()
export class Detallebaucher extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  baucherid: string;

  @property({
    type: 'string',
    required: true,
  })
  cuentaid: string;

  @property({
    type: 'string',
    required: true,
  })
  valor: string;

  @belongsTo(() => Baucher)
  baucherId: string;

  @belongsTo(() => Cuenta)
  cuentaId: string;

  constructor(data?: Partial<Detallebaucher>) {
    super(data);
  }
}

export interface DetallebaucherRelations {
  // describe navigational properties here
}

export type DetallebaucherWithRelations = Detallebaucher & DetallebaucherRelations;
