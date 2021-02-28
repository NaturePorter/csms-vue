<template>
<div>
  <!--导航区域-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>考试成绩分析</el-breadcrumb-item>
    <el-breadcrumb-item>考试列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!--卡片视图区域-->
  <el-card class="box-card">
    <el-row style="margin-top: 5px; margin-bottom: 15px">
      <el-col :span="5">
        年级：
        <el-select v-model="gradeId" filterable placeholder="请选择" @change="getclazzs">
          <el-option
            v-for="item in grades"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        班级：
        <el-select v-model="clazzId" filterable placeholder="请选择">
          <el-option
            v-for="item in clazzs"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <!--搜索与添加区域-->
        <el-input placeholder="请考试名称" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
export default {
  name: "exams",
  created() {
    this.getgrades();
  },
  data() {
    return {
      grades: [],//年级列表
      clazzs: [],//班级列表
      gradeId: '',//年级id
      clazzId:''//班级id
    }
  },
  methods: {
    // 获取年级列表
    async getgrades(){
      const {data: res} = await this.axios.get('grades')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.grades = res.data
    },
    // 获取班级列表
    async getclazzs(value){
      const {data: res} = await this.axios.get('clazzs?id=' + value,)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.clazzs = res.data
    }
  }
}
</script>

<style scoped>

</style>
