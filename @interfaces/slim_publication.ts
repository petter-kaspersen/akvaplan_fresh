export interface SlimPublication {
  doi: string;
  published: string;
  printed?: string;
  type: string;
  container: string;
  title: string;
  authors: Author[];
  license?: string;
  cites?: number;
}

export interface Author {
  family: string;
  given: string;
  first?: boolean;
}
