import axios from "axios";

export async function addToCart(serviceId: number): Promise<void> {
  const getCsrfToken = () => {
    const match = document.cookie.match(/csrftoken=([\w-]+)/);
    return match ? match[1] : "";
  };

  await axios.post(
    "/api/app/draft/",
    { service_id: serviceId },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRFTOKEN": getCsrfToken(),
      },
      withCredentials: true,
    },
  );
}
