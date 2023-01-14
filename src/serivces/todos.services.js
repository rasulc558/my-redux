import httpServices from "./http.services";

const todosEndpoint = "todos/";

const todosServices = {
  fetchAll: async () => {
    try {
      const { data } = await httpServices.get(todosEndpoint, {
        params: {
          _page: 1,
          _limit: 10,
        },
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default todosServices;
