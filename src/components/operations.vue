<template>
  <div class="container">
    <div class="row d-flex align-items-end">
      <div class="col-3 form-group">
        <label class="text-white">Дата начала</label>
        <datepicker 
          :format="formatStartDate"
          v-model="startDate"
          :bootstrap-styling="true"
          :monday-first="true"
        ></datepicker>
      </div>
      <div class="col-3 form-group">
        <label class="text-white">Дата окончания</label>
        <datepicker :format="formatEndDate" v-model="endDate" :bootstrap-styling="true" :monday-first="true"></datepicker>
      </div>
      <div class="col-2 form-group">
        <button class="btn btn-success" @click="getAllOperations">Обновить</button>
      </div>
    </div>
    <h3 class="text-white">Сумма на начало: {{totalStart}}</h3>
    
    <section id="timeline">
      
      <article v-for="operation of operations" :key="operation.id">
        <div class="inner" :class="positionRight(operation.typeId)">
          <span class="date">
            <span class="day">{{dateToDate(operation.createdAt)}}</span>
            <span class="month">{{dateToMonth(operation.createdAt)}}</span>
            <span class="year">{{dateToDay(operation.createdAt)}}</span>
          </span>
          <h2 :style="colorArticle(operation.nameId)"><span class="operation-type">{{operation.type}} ({{operation.name}})</span><span class="operation-name">{{operation.total}} руб. </span></h2>
          <p class="comment">{{operation.comment}}</p>
          <div class="info">
            <div class="operator">
              <i class="fas fa-user"></i>
              {{operation.operatorName}}
            </div>
            <div class="action-block">
              <edit-operation class="operation-edit"></edit-operation>
            </div>            
            
          </div>
          
        </div>
      </article>
    </section>
    <h3 class="text-white">Сумма на конец: {{totalEnd}}</h3>
    <h4 :class="setColor(totalDay)">За период: {{totalDay}}</h4>
    <add-operation
      @addOperation="getAllOperations"
      ></add-operation>
    
  </div>

</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "operations",
  data() {
    return {
      operations: [],
      articles: [],
      startDate: moment().startOf().format('MM.DD.YYYY 00:00:00'),
      endDate: moment().endOf().format('MM.DD.YYYY 00:00:00'),
      totalStart: 0,
      totalDay: 0,
      totalEnd: 0
    };
  },
  created() {
    this.getAllOperations ();
    this.getAllArticles ();
  },
  computed: {
  },
  methods: {
    formatStartDate (date) {
      return moment(date).format('DD.MM.YYYY 00:00:00');
    },
    formatEndDate (date) {
      return moment(date).format('DD.MM.YYYY 23:59:59');
    },
    colorArticle (id) {
      return 'background: ' + this.articles.find(el=>el.id === id).color
    },
    getAllArticles () {
      axios
        .get(`http://${this.$store.state.host}/articles`)
        .then(res => (this.articles = res.data.article))
        .catch(err => console.log(err));
    },
    getAllOperations() {
      let startOfDay = moment(this.startDate).startOf('day');
      startOfDay = moment(startOfDay).unix();
      let endOfDay = moment(this.endDate).endOf('day');
      endOfDay = moment(endOfDay).unix();
      const getUrl = `http://${this.$store.state.host}/operations/startdate/${+startOfDay}/enddate/${+endOfDay}`
      axios
        .get(getUrl)
        .then(res => {
          this.operations = res.data.operation
          this.totalStart = res.data.totalStart
          this.totalDay = res.data.totalDay
          this.totalEnd = res.data.totalEnd
        })
        .catch(err => console.log(err));
    },
    dateToDate(date) {
      return moment(date).format("DD.MM");
    },
    dateToMonth(date) {
      return moment(date).format("HH:mm:ss");
    },
    dateToDay(date) {
      return moment(date)
        .locale("ru")
        .format("ddd");
    },
    positionRight(type) {
      if (type === 1) {
        return "right";
      } else {
        return "left";
      }
    },
    setColor(item) {
      if (item > 0) {
        return 'text-success'
      } else {
        return 'text-danger'
      }
    }
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  font-family: Helvetica, sans-serif;
}
body {
  background: #25303b;
}
section {
  width: 80%;
  margin: 20px auto;
  position: relative;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: 0;
    margin: 0 0 0 -1px;
    width: 2px;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
  }

  article {
    width: 100%;
    margin: 0 0 20px 0;
    position: relative;

    &:after {
      content: "";
      display: block;
      clear: both;
    }

    .right {
      float: right;

      h2 {
        &:after {
          content: "";
          position: absolute;
          top: 20px;
          left: -5px;
          width: 10px;
          height: 10px;
          transform: rotate(45deg);
        }
      }
    }

    .left {
      float: left;

      h2 {
        &:after {
          content: "";
          position: absolute;
          top: 20px;
          right: -5px;
          width: 10px;
          height: 10px;
          transform: rotate(-45deg);
        }
      }
    }

    .inner {
      width: 40%;
      margin: 5px 0 0 0;
      border-radius: 6px;

      .date {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 60px;
        height: 60px;
        position: absolute;
        top: 0;
        left: 50%;
        margin: 0 0 0 -32px;
        border-radius: 100%;
        font-size: 12px;
        font-weight: 900;
        text-transform: uppercase;
        background: #25303b;
        color: rgba(255, 255, 255, 0.5);
        border: 2px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 0 7px #25303b;

        span {
          display: block;
          text-align: center;
        }

        .day {
          font-size: 0.8em;
        }

        .month {
          font-size: 1.05em;
        }

        .year {
          font-size: 10px;
        }
      }

      h2 {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        margin: 0;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: -1px;
        border-radius: 6px 6px 0 0;
        position: relative;

        .operation {

          &-type {
            font-size: 0.5em;
            font-weight: bold;
          }

          &-name {
            font-size: 0.7em;
            font-weight: normal;
            text-transform: lowercase;
          }
          
        }
      }

      .comment {
        padding: 15px;
        margin: 0;
        font-size: 14px;
        background: #fff;
        color: #656565;
      }

      .info {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 5px 15px;
        margin: 0;
        background: rgb(224, 220, 220);
        color: #656565;
        border-radius: 0 0 6px 6px;

        .operation-edit {
          cursor: pointer;
        }
      }
    }
  }
}


section#timeline article div.inner h2:after {
  background: inherit;
}
</style>

