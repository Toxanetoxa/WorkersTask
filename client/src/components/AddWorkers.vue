<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="UserName">Имя:</label>
        <input
          type="text"
          class="form-control"
          id="UserName"
          required
          v-model="Workers.UserName"
          name="UserName"
        />
      </div>

      <div class="form-group">
        <label for="LastName">Фамилия</label>
        <input
          class="form-control"
          id="LastName"
          required
          v-model="Workers.LastName"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="Patronymic">Отчество</label>
        <input
            class="form-control"
            id="Patronymic"
            required
            v-model="Workers.Patronymic"
            name="description"
        />
      </div>

      <div class="form-group">
        <label for="Salary">Заработная плата</label>
        <input
            class="form-control"
            id="Salary"
            required
            v-model="Workers.Salary"
            name="description"
        />
      </div>

      <div class="form-group">
        <label for="Status">Статус</label>
        <input
            class="form-control"
            id="Status"
            required
            v-model="Workers.Status"
            name="description"
        />
      </div>

      <div class="form-group">
        <label for="WorkPosition">Должность</label>
        <input
            class="form-control"
            id="WorkPosition"
            required
            v-model="Workers.WorkPosition"
            name="description"
        />
      </div>

      <div class="form-group">
        <label for="UpdatedAt">Дата найма</label>
        <input
            type="date"
            class="form-control"
            id="UpdatedAt"
            required
            v-model="Workers.UpdatedAt"
            name="description"
        />
      </div>



      <button @click="saveWorkers" class="btn btn-success mt-2">Добавить сотрудника!</button>
    </div>

    <div v-else>
      <h4>Новый сотрудник успешно добавлен!</h4>
      <button class="btn btn-success" @click="newWorkers">Добавть нового сотрудника!</button>
    </div>
  </div>
</template>

<script>
import WorkersDataService from "../services/WorkersDataService";

export default {
  name: "add-Workers",
  data() {
    return {
      Workers: {
        id: null,
        UserName: "",
        LastName: "",
        Patronymic: "",
        Salary: "",
        WorkPosition: "",
        Status: "",
        UpdatedAt: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveWorkers() {
      var data = {
        UserName: this.Workers.UserName,
        LastName: this.Workers.LastName,
        Patronymic: this.Workers.Patronymic,
        Salary: this.Workers.Salary,
        WorkPosition: this.Workers.WorkPosition,
        Status: this.Workers.Status,
        UpdatedAt: this.Workers.UpdatedAt,
      };

      WorkersDataService.create(data)
        .then(response => {
          this.Workers.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newWorkers() {
      this.submitted = false;
      this.Workers = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
