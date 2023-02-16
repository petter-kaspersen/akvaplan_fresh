export interface SlimPublication {
  doi?: string;
  published?: string;
  printed?: string;
  type?: string;
  container?: string;
  title?: string;
  authors?: Author[];
  license?: string;
  cites?: number;
}

export interface Author {
  name?: string;
  family?: string;
  given?: string;
  first?: boolean;
}
