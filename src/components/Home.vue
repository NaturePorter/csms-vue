<template>
  <div class="home_container">
    <el-container class="home_container">
      <!--头部区域-->
      <el-header style="text-align: right; font-size: 12px">
        <img src="../assets/header_logo.png" height="60" width="120" style="float: left"/>
        <el-dropdown>
          <i class="el-icon-user" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <a @click="logout()"><el-dropdown-item>退出登录</el-dropdown-item></a>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!--页面主体区域-->
      <el-container>
        <!--侧边栏-->
        <el-aside style="width: auto">
        <div class="toggle-button" @click="collapseButton"><i class="el-icon-thumb"></i></div>
        <!--菜单栏-->
        <el-menu router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
                 default-openeds="/home/tabletop" text-color="#fff" active-text-color="#409bff" background-color="#333744" unique-opened router>
          <!--一级菜单-->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
        <!--右侧内容主体-->
        <el-main>
          <!--路由占位符-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "frame",
    created() {
      this.getMenuList()
    },
    data() {
      return {
        isCollapse: true,
        // 左侧菜单数据
        menulist: [],

      };
    },
    methods: {
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      },
      // 退出登录
      logout() {
        //清理掉token
        window.sessionStorage.clear()
        //重新定位到登录页面
        this.$router.push('login')
      },
      collapseButton(){
        this.isCollapse = !this.isCollapse;
      },
      // 获取所有的菜单
      async getMenuList(){
        const {data: res} = await this.$http.get('menus')
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.menulist = res.data
      }
    },
  };
</script>

<style scoped>
  .el-header {
    background-color: #333744;
    line-height: 65px;
  }

  .el-aside {
    background-color: #333744;
  }

  .el-main {
    background-color: #eaedf1;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    background-color: #333744;
    width: 200px;
    min-height: 400px;
    border: none;
  }

  .home_container {
    height: 100%;
  }
  .toggle-button{
    text-align: center;
  }
</style>
