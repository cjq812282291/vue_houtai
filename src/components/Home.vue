<template>
  <el-container class="home-container">
    <!-- 页面头部区域 -->
    <el-header>
      <div>
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 页面侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px' ">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409BFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 只接受字符串 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/'+ subItem.path)"
            >
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authNanme }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <!-- 路由站位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 左侧菜单数据
      menuList: [
        {
          id: '125',
          authName: '用户管理',
          path: 'users',
          children: [
            {
              id: '110',
              authNanme: '用户列表',
              path: 'users'
            }
          ]
        },
        {
          id: '103',
          authName: '权限管理',
          path: 'rights',
          children: [
            {
              id: '103',
              authNanme: '角色列表',
              path: 'roles'
            },
            {
              id: '103',
              authNanme: '权限列表',
              path: 'rights'
            }
          ]
        },
        {
          id: '101',
          authName: '商品管理',
          path: 'goods',
          children: [
            {
              id: '101',
              authNanme: '商品列表',
              path: 'goods'
            },
            {
              id: '103',
              authNanme: '商品分类',
              path: 's'
            }
          ]
        },
        {
          id: '102',
          authName: '订单管理',
          path: 'orders',
          children: [
            {
              id: '102',
              authNanme: '订单列表',
              path: 'orders'
            }
          ]
        },
        {
          id: '145',
          authName: '数据统计',
          path: 'reports',
          children: [
            {
              id: '145',
              authNanme: '数据表',
              path: 'reports'
            }
          ]
        }
      ],
      // 自定义一级菜单图标
      iconsObj: {
        '125': 'iconfont icon-users',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  // 此时，页面上的元素，还没有被渲染  数据初始化
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 退出按钮
    logout() {
      // 清空token
      window.sessionStorage.clear()
      // 跳转到登录页
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    // 点击按钮 切换折叠效果
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保持链接的高亮状态
    saveNavState(activePath) {
      // 会话存储 浏览器一旦关闭了就消失
      window.sessionStorage.setItem('activePath', activePath)
      // 重新赋值 更新路径
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #373d41;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
