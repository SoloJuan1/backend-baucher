import {Entity, model, property, hasMany} from '@loopback/repository';
import {Detallebaucher} from './detallebaucher.model';

@model()
export class Baucher extends Entity {
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
  empleadoid: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @hasMany(() => Detallebaucher)
  detallebauchers: Detallebaucher[];

  constructor(data?: Partial<Baucher>) {
    super(data);
  }
}

export interface BaucherRelations {
  // describe navigational properties here
}

export type BaucherWithRelations = Baucher & BaucherRelations;
