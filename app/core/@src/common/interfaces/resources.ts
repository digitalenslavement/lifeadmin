import Id from '../json-model/id';

// Identifier Having Resource
export interface IdResource {
  _id: Id;
}

// Minimal Default Resource
export interface TimestampedIdResource extends IdResource {
  createdAt: Date;
  updatedAt: Date;
}
