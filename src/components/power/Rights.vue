<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <!-- 标签 -->
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag v-else-if="scope.row.level === '1'" type="success">二级</el-tag>
            <el-tag v-else-if="scope.row.level === '2'" type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 权限列表
      rightsList: [
        {
          authName: '商品管理',
          level: '0',
          path: 'goods'
        },
        {
          authName: '订单管理',
          level: '0',
          path: 'orders'
        },
        {
          authName: '权限管理',
          level: '0',
          path: 'rights'
        },
        {
          authName: '商品列表',
          level: '1',
          path: 'goods'
        },
        {
          authName: '添加商品',
          level: '2',
          path: 'goods'
        },
        {
          authName: '订单列表',
          level: '1',
          path: 'orders'
        },
        {
          authName: '添加订单',
          level: '2',
          path: 'orders'
        },
        {
          authName: '用户列表',
          level: '1',
          path: 'users'
        },
        {
          authName: '角色列表',
          level: '1',
          path: 'roles'
        }
      ]
    }
  },
  created() {
    this.getRightList()
  },
  methods: {
    async getRightList() {
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败')
      }
      this.rightsList = res.data
    }
  }
}
</script>

<style>
</style>
