import type { Product } from "../pages/HomePage/HomePage";

export async function fetchServices(query: string = ''): Promise<Product[]> {
  const url = query ? `/api/services/?query=${encodeURIComponent(query)}` : '/api/services/';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

export async function fetchServiceById(id: string) {
  const response = await fetch(`/api/services/${id}/`, {
    headers: {
      'Accept': 'application/json',
    },
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}