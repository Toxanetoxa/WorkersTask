<template>
  <div v-if="currentWorkers" class="edit-form">
    <h4>Сотрудник</h4>
    <form>
      <div class="form-group">
        <label for="UserName">Имя:</label>
        <input type="text" class="form-control" id="UserName"
          v-model="currentWorkers.UserName"
        />
      </div>
      <div class="form-group">
        <label for="LastName">Фамилия:</label>
        <input type="text" class="form-control" id="LastName"
               v-model="currentWorkers.LastName"
        />
      </div>
      <div class="form-group">
        <label for="Patronymic">Отчество:</label>
        <input type="text" class="form-control" id="Patronymic"
               v-model="currentWorkers.Patronymic"
        />
      </div>
      <div class="form-group">
        <label for="Salary">Заработная плата:</label>
        <input type="number" class="form-control" id="Salary"
               v-model="currentWorkers.Salary"
        />
      </div>
      <div class="form-group">
        <label for="WorkPosition">Должность:</label>
        <input type="text" class="form-control" id="WorkPosition"
               v-model="currentWorkers.WorkPosition"
        />
      </div>
      <div class="form-group">
        <label for="Status">Статус:</label>
        <input type="text" class="form-control" id="Status"
               v-model="currentWorkers.Status"
        />
      </div>
      <div class="form-group">
        <label for="UpdatedAt">Дата найма:</label>
        <input type="date" class="form-control" id="UpdatedAt"
               v-model="currentWorkers.UpdatedAt"
        />
      </div>

<!-- ToDo Нужно переделать статус сотрудника, чтобы человек не писал, а выбирал и дропдауна или кнопкой.-->
    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteWorkers"
    >
      Удалить
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateWorkers"
    >
      Обновить
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Пожалуйста, кликните на сотрудника.</p>
  </div>
</template>

<script>
import WorkersDataService from "../services/WorkersDataService";

export default {
  name: "Workers",
  data() {
    return {
      currentWorkers: null,
      message: ''
    };
  },
  methods: {
    getWorkers(id) {
      WorkersDataService.get(id)
        .then(response => {
          this.currentWorkers = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      let data = {
        id: this.currentWorkers.id,
        UserName: this.currentWorkers.UserName,
        LastName: this.currentWorkers.LastName,
        Patronymic: this.currentWorkers.Patronymic,
        Salary: this.currentWorkers.Salary,
        WorkPosition: this.currentWorkers.WorkPosition,
        Status: this.currentWorkers.Status,
        UpdatedAt: this.currentWorkers.UpdatedAt,
        published: status
      };

      WorkersDataService.update(this.currentWorkers.id, data)
        .then(response => {
          this.currentWorkers.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateWorkers() {
      WorkersDataService.update(this.currentWorkers.id, this.currentWorkers)
        .then(response => {
          console.log(response.data);
          this.message = 'Запись успешно обновлена!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteWorkers() {
      WorkersDataService.delete(this.currentWorkers.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "Workers" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getWorkers(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
