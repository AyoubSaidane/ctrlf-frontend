export interface QueryRequest {
  query: string;
}

export interface Document {
  title: string;
  url: string;
  page: number;
}

export interface Expert {
  name: string;
  email: string;
  image: string;
  documents: string[];
}

export interface ParsedResponse {
  text: string;
  experts: Expert[];
  documents: Document[];
}

export interface QueryResponse {
  response: string; // This is a JSON string that needs to be parsed
}

export interface ProcessedQueryResponse {
  parsedData: ParsedResponse;
}
