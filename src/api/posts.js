import axios from "axios";

export const getPostsRequest = async () => await axios.get("https://backpublicacionescrudmern-production.up.railway.app/posts");

export const getPostRequest = async (id) => await axios.get("https://backpublicacionescrudmern-production.up.railway.app/posts/" + id);


export const deletePostRequest = async (id) =>
  await axios.delete("https://backpublicacionescrudmern-production.up.railway.app/posts/" + id);

export const createPostRequest = async (post) => {
  const form = new FormData();
  for (let key in post) {
    form.append(key, post[key]);
  }
  return await axios.post("https://backpublicacionescrudmern-production.up.railway.app/posts", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatePostRequest = async (id, newPostFields) => {
  const form = new FormData();
  for (let key in newPostFields) {
    form.append(key, newPostFields[key]);
  }
  return axios.put("https://backpublicacionescrudmern-production.up.railway.app/posts/" + id, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


