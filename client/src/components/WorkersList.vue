<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Сотрудники:</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(Workers, index) in Workers"
            :key="index"
            @click="setActiveWorkers(Workers, index)"
        >

          <h6>{{ Workers.WorkPosition }}</h6>
          <hr>
           <p> ФИО: {{ Workers.LastName }}
            {{ Workers.UserName }}
             {{ Workers.Patronymic }}</p>


        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllWorkers">
        Удалить всех сотрудников!
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentWorkers" class="Worker">
        <h4> {{ currentWorkers.WorkPosition }} </h4>
          <div>
            <label><strong>Фамилия:</strong></label> {{ currentWorkers.LastName }}
          </div>
          <div>
            <label><strong>Имя:</strong></label> {{ currentWorkers.UserName }}
          </div>
          <div>
            <label><strong>Отчество:</strong></label> {{ currentWorkers.Patronymic }}
          </div>
          <div>
            <label><strong>ЗП:</strong></label> {{ currentWorkers.Salary }}
          </div>
          <div>
            <label><strong>Статус:</strong></label> {{ currentWorkers.Status }}
          </div>
          <div>
            <label><strong>Дата приёма на работу:</strong></label> {{ currentWorkers.UpdatedAt }}
          </div>

        <router-link :to="'/Workers/' + currentWorkers.id" class="badge badge-warning">Изменить данные</router-link>
      </div>
      <div v-else>
        <br/>
        <p> Пожалуйста, нажмите на сотрудника...</p>
      </div>
    </div>
  </div>
</template>

<script>
import WorkersDataService from "../services/WorkersDataService";

export default {
  name: "Workers-list",
  data() {
    return {
      Workers: [],
      currentWorkers: null,
      currentIndex: -1,
      WorkPosition: "",
      UserName: "",
      LastName: "",
      Patronymic: "",
      UpdatedAt: "",
    };
  },
  methods: {
    retrieveWorkers() {
      WorkersDataService.getAll()
          .then(response => {
            this.Workers = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrieveWorkers();
      this.currentWorkers = null;
      this.currentIndex = -1;
    },

    setActiveWorkers(Workers, index) {
      this.currentWorkers = Workers;
      this.currentIndex = index;
    },

    removeAllWorkers() {
      WorkersDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    },

    searchWorkers() {
      WorkersDataService.findByUserName(this.UserName)
          .then(response => {
            this.tutorials = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.retrieveWorkers();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

.badge {
  color: black;
}

p {
  margin-bottom: 2px;
  display: flex;
}

.badge-warning {
  margin-top: 10px;
  font-size: 15px;
  border: 1px solid black;
  color: white;
  background-color: black;
}

.badge-warning:hover {
  color: black;
  background: white;
}

.list-group-item {
  color: black;
  background: white;
  border: 1px solid black;
}

.Worker {
  margin-top: 35px;
  border: 1px solid black;
  height: 270px;
  width: 320px;
  border-radius: 5px;
  padding: 5px 5px 5px 20px;
  position: sticky;
  top: 0;
}
</style>
