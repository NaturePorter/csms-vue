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
    <el-row style="margin-top: 5px; margin-bottom: 15px" :gutter="17">
      <el-col :span="5">
        年级：
        <el-select v-model="queryInfo.gradeId" filterable placeholder="请选择" @change="getclazzs">
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
        <el-select v-model="queryInfo.clazzId" filterable placeholder="请选择">
          <el-option
            v-for="item in clazzs"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            ref="clazz">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <!--搜索与添加区域-->
        <el-input placeholder="请考试名称" v-model="queryInfo.query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="getExams"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!--用户列表区域-->
    <el-table :data="examlist" border stripe>
      <el-table-column label="排序" type="index"></el-table-column>
      <el-table-column label="考试名次" prop="name"></el-table-column>
      <el-table-column label="考试时间" prop="time"></el-table-column>
      <el-table-column label="考试类别">
        <template v-slot="scope">
          {{ ( scope.row.type > 1 ) ? "平时考试":"年级统考" }}
        </template>
      </el-table-column>
      <el-table-column label="年级" prop="gradeid"></el-table-column>
      <el-table-column label="班级" prop="clazzid"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
    </el-table>
    <!--分页区域-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[3, 5, 10, 30]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: "exams",
  created() {
    this.getgrades();
    this.getExams();
  },
  data() {
    return {
      grades: [],//年级列表
      clazzs: [],//班级列表
      queryInfo: {
        query: '',
        gradeId: '',//年级id
        clazzId:'',//班级id
        //当前的页数
        pageNum: 1,
        //当前每页显示多少条数据
        pageSize: 5
      },
      examlist: [],
      total: 0,
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
      this.queryInfo.clazzId = ''
    },
    // 获取考试列表
    async getExams(){
      const {data: res} = await this.axios.get('exams', {params: this.queryInfo})
      if (res.meta.status !== 200) return this.$message.error('获取考试列表失败！');
      this.examlist = res.data.exams
      this.total = res.data.total
    },
    //监听 pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getExams()
    },
    //监听 pageSize改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getExams()
    },
  }
}
</script>

<style scoped>
.block {
  margin-top: 15px;
}
</style>
