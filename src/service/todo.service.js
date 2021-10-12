import http from "../http-common";

class TodoDataService {
  findAll() {
    return http.get("/todo");
  }

  findById(id) {
    return http.get(`/todo/${id}/id`);
  }

  findByName(name) {
    return http.get(`/todo/name?name=${name}`);
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
