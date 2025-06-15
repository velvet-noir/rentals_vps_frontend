import axios from "axios";

export interface UserData {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
}

export async function fetchUserRole(): Promise<UserData> {
  const getCsrfToken = () => {
    const match = document.cookie.match(/csrftoken=([\w-]+)/);
    return match ? match[1] : "";
  };

  try {
    const response = await axios.get<UserData>("/api/user/", {
      headers: {
        "X-CSRFTOKEN": getCsrfToken(),
        Accept: "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Ошибка при получении данных пользователя");
  }
}

export async function logoutUser(): Promise<void> {
  const getCsrfToken = () => {
    const match = document.cookie.match(/csrftoken=([\w-]+)/);
    return match ? match[1] : "";
  };

  try {
    await axios.post(
      "/api/logout/",
      {},
      {
        headers: {
          "X-CSRFTOKEN": getCsrfToken(),
          Accept: "application/json",
        },
        withCredentials: true,
      },
    );
  } catch (error) {
    throw new Error("Ошибка при выходе из аккаунта");
  }
}
