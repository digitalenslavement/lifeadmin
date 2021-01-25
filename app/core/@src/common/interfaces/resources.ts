// Identifier Having Resource
export interface IdResource {
  _id: string;
}

// Minimal Default Resource
export interface TimestampedIdResource extends IdResource {
  createdAt: Date;
  updatedAt: Date;
}
