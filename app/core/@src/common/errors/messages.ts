import Id from '../json-model/id';

export const ErrorIds = {
  DB: {
    FileNotFound: new Id().id,
    RecordNotFound: new Id().id,
    DuplicateID: new Id().id,
  },
};
