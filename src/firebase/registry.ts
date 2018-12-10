export interface Registry {
  collections: {};
}

export class FirestoreRegistry {
  public registry: Registry = {
    collections: {}
  };

  public AddAppReferences(ref: any) {
    this.registry.collections[ref] = true;
  }

  public RemoveAppReferences(ref: any) {
    delete this.registry.collections[ref];
  }
}
