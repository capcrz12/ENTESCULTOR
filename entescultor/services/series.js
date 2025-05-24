import axios from "axios";
import { getToken } from "./token";

let token = null;

/*
export const setToken = newToken => {
  token = `Bearer ${newToken}`
}*/

export const createSerie = ({ name, image }) => {
  token = getToken();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);

  const config = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/series`, formData, config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating serie:", error);
      throw error;
    });
};

export const putTitleSerie = ({ name, id }) => {
  token = getToken();

  const config = {
    headers: {
      Authorization: token,
    },
  };

  axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/series/title/${id}`,
      { name },
      config
    )
    .then((response) => {
      const { data } = response;
      return data;
    });
};

export const putImageSerie = ({ image, id }) => {
  token = getToken();

  const config = {
    headers: {
      Authorization: token,
    },
  };

  axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/series/image/${id}`,
      { image },
      config
    )
    .then((response) => {
      const { data } = response;
      return data;
    });
};
export const getAllSeries = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/series`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("response", response);
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
// export const getAllSeries = () => {
//   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/series`)
//     .then(res => res.json())
// }

export const deleteSerie = ({ id }) => {
  token = getToken();

  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/series/${id}`, config)
    .then((response) => {
      const { data } = response;
      return data;
    });
};
