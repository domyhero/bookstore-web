<template>
<el-form label-position="top" :model="review" :rules="rules" ref="review" label-width="100px" class="x-book-review-form">
  <h2>个人书评</h2>
  <!-- <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item> -->
  <!-- <el-form-item label="活动区域" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item> -->
  <!-- <el-form-item label="活动时间" required>
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item> -->
  <!-- <el-form-item label="即时配送" prop="delivery">
    <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
  </el-form-item> -->
  <!-- <el-form-item label="活动性质" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item> -->
  <el-form-item label="评论">
    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 20}" v-model="review.content"></el-input>
  </el-form-item>
  <el-form-item label="评分">
    <el-rate
      v-model="review.rating"
      show-text>
    </el-rate>
  </el-form-item>
  <el-form-item>
    <!-- <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button> -->
  </el-form-item>
</el-form>
</template>

<script>
import DoubanAnnotationList from '../components/DoubanAnnotationList' // why need go back import
// http://element.eleme.io/#/zh-CN/component/tag

export default {
  name: 'book-review-form',
  data () {
    return {
      bookId: '25782902',
      review: {
        rating: null,
        content: ''
      },
      rules: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
