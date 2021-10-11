import http from "../http-common";

class TodoDataService {
  getAll() {
    return http.get("/todo");
  }

  get(id) {
    return http.get(`/todo/${id}/id`);
  }

  findByName(title) {
    return http.get(`/todo/name?name=${title}`);
  }

  create(data) {
    return http.post("/todo", data);
  }

  update(data) {
    return http.put(`/todo`, data);
  }

  delete(id) {
    return http.delete(`/todo/${id}`);
  }

  deleteAll() {
    return http.delete(`/todo`);
  }




}

export default new TodoDataService();