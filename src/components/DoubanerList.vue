<template>
  <div class="x-flex-list x-doubaner-list">
    <el-card :body-style="{ padding: '0px' }" :key="item.id" v-for="item in list">
      <img :src="item.avatar" class="image">
      <div style="padding: 14px;" v-on:click="selectDoubaner(item)">
        <span>{{item.name}}</span>
        <div class="bottom clearfix" v-on:click.self.stop="selectDoubaner(item, 'book')">
          ta的书<time class="time">{{ item.loc ? item.loc.name : '' }}/{{ item.followers_count }}</time>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'doubaner-list',
  props: ['list'],
  data() {
    return {
    }
  },
  methods: {
    selectDoubaner(item, type='following') {
      if(type === 'book') {
        // this.$router.push('/bookcase/'+item.id)
        this.$router.push('/booklist/'+item.id)
      } else {
        this.$router.push('/following/'+item.id)
        // this.$root.$data.$emit('doubaner-selected', item)
      }
    }
  },
  mounted(){
  },
}
</script>

<style scoped>
.x-doubaner-list .el-card {
  width: 165px;
}
</style>
