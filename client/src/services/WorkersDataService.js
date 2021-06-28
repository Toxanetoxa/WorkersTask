import http from "../http-common";

class WorkersDataService {
  getAll() {
    return http.get("/Workers");
  }

  get(id) {
    return http.get(`/Workers/${id}`);
  }

  create(data) {
    return http.post("/Workers", data);
  }

  update(id, data) {
    return http.put(`/Workers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Workers/${id}`);
  }

  deleteAll() {
    return http.delete(`/Workers`);
  }

  findByUserName(UserName) {
    return http.get(`/Workers?UserName=${UserName}`);
  }
}

export default new WorkersDataService();
