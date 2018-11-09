<template>
  <div>
    <div class="modal" id="exampleModalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content" >
          <div class="modal-header">
            <h5 class="modal-title">Редактирование операции</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body container">
            <div class="row">
              <div class="form-group col-6">
                <label for="">Тип операции</label>
                <!-- <select class="custom-select" v-model="typeId">
                  <option v-for="type of types" :key="'type'+type.id" v-bind:value="type.id">{{type.name}}</option>
                </select> -->
              </div>
              <div class="form-group col-6">
                <label for="">Название операции</label>
                <!-- <select class="custom-select" v-model="name">
                  <option v-for="name of this.articles" :key="name.id">{{name.name}}</option>
                </select> -->
              </div>
            </div>
            <div class="row">
              <div class="col-12 form-group">
                <label for="">Сумма</label>
                <!-- <input type="text" class="form-control" v-model="total"/> -->
              </div>
              <div class="col-12 form-group">
                <label for="">Комментарии</label>
                <!-- <textarea class="form-control" row="5" v-model="comment"/> -->
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" >Сохранить</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
          </div>
        </div>
      </div>
    </div>
    <span data-toggle="modal" data-target="#exampleModalEdit">
      <i class="fas fa-edit"></i>
    </span>
  </div>
</template>
<script>
export default {
  
}
</script>
<style>

</style>
