import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Detallebaucher>) {
    super(data);
  }
}

export interface DetallebaucherRelations {
  // describe navigational properties here
}

export type DetallebaucherWithRelations = Detallebaucher & DetallebaucherRelations;
