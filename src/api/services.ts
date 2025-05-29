export interface Product {
  id: number;
  name: string;
  image: string;
  mini_description: string;
  price: string;
  is_active: boolean;
}

export async function fetchServices(): Promise<Product[]> {
  const response = await fetch('/api/services/', {
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