<template>
  <div>
    <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content" :class="bgColor(this.typeId)">
          <div class="modal-header">
            <h5 class="modal-title">Добавление новой операции</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body container">
            <div class="row">
              <div class="form-group col-6">
                <label for="">Тип операции</label>
                <select class="custom-select" v-model="typeId">
                  <option v-for="type of types" :key="'type'+type.id" v-bind:value="type.id">{{type.name}}</option>
                </select>
              </div>
              <div class="form-group col-6">
                <label for="">Название операции</label>
                <select class="custom-select" v-model="name">
                  <option v-for="name of this.articles" :key="name.id">{{name.name}}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-12 form-group">
                <label for="">Сумма</label>
                <input type="text" class="form-control" v-model="total"/>
              </div>
              <div class="col-12 form-group">
                <label for="">Комментарии</label>
                <textarea class="form-control" row="5" v-model="comment"/>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addArticle">Сохранить</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-success add-button" data-toggle="modal" data-target="#exampleModal">
      <i class="fas fa-plus"></i>
    </button>
  </div>
  
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      articles: [],
      types: [
        {'id': 1, 'name' : 'Приход'},
        {'id': 2, 'name' : 'Расход'}
      ],
      typeId: 1,
      name: '',
      total: 0,
      comment: ''
    }
  },
  computed: {
    totalComputed () {
      if (this.typeId === 2) {
        return this.total*(-1);
      } else {
        return +this.total
      }
    },
    bonus () {
      if (this.typeId === 1 && this.nameId === 3) {
        return this.total/100*5
      } else {
        return 0
      }
    },
    typeName () {
      if (this.typeId > 0) {
        return this.types.find(el=>el.id === this.typeId).name
      } else {
        return ''
      }
    },
    nameId () {
      if (this.name === '') {
        return null
      } else {
         return this.articles.find(el=>el.name == this.name).id
      }     
    }
  },
  watch: {
    typeId () {
      this.getAllArticle()
    }
  },
  created () {
    this.getAllArticle()
  },
  methods: {
    bgColor(type) {
      if (type === 1) {
        return 'bg-success'
      } else {
        return 'bg-danger'
      }
    },
    getAllArticle () {
      axios.get(`http://${this.$store.state.host}/articles`)
        .then(articles=>this.articles = articles.data.article.filter(el=>el.type == this.typeId))
        .catch(err=>console.log(err))
    },
    clearRows () {
      this.typeId = 1;
      this.name = '';
      this.total = 0;
      this.comment = ''
    },
    addArticle() {
      axios({
        method: 'POST',
        url: `http://${this.$store.state.host}/operations`,
        data: {
          type: this.typeName,
          typeId: this.typeId,
          name: this.name,
          nameId: this.nameId,
          comment: this.comment,
          operatorName: 'Оператор 1',
          operatorId: 1,
          total: this.totalComputed,
          bonus: this.bonus
        }
      })
        .then(res=>{console.log(res); $('.modal').modal('hide'); this.$emit("addOperation"); this.clearRows()})
        .catch(err=>console.log(err))
    }
  }
};
</script>
<style>
  .add-button {
    position: fixed;
    left: 5%;
    bottom: 5%;
    width: 5em;
    height: 5em;
    border-radius: 50%;
  }

  .fa-plus {
    font-size: 2em;
  }
</style>
