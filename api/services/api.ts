import { QueryRequest, QueryResponse, ProcessedQueryResponse, ParsedResponse } from '../types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function submitQuery(request: QueryRequest): Promise<ProcessedQueryResponse> {
  if (!API_URL) {
    throw new Error('API_URL is not defined');
  }
  console.log('API_URL:', `${API_URL}/query`);
  const response = await fetch(`${API_URL}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      message: request.query
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const rawResponse: QueryResponse = await response.json();
  console.log('Raw response:', rawResponse);

  const parsedData: ParsedResponse = rawResponse.response;
  console.log('Parsed data:', parsedData);

  return { parsedData };
}