<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="roleList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 栅格化 -->
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>

              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过 for 循环 嵌套渲染二级权限 -->
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2,i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                    >{{item2.authName}}</el-tag>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限的对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="30%"
      @close="setRightDialogColsed"
    >
      <!-- 树形控件 -->
      <el-tree
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有角色列表区域
      roleList: [
        {
          id: '30',
          roleName: '主管',
          roleDesc: '技术负责人',
          children: [
            {
              id: '101',
              authName: '商品管理',
              children: [
                {
                  id: '104',
                  authName: '商品列表',
                  children: [
                    {
                      id: '105',
                      authName: '添加商品'
                    },
                    {
                      id: '105',
                      authName: '添加商品'
                    },
                    {
                      id: '105',
                      authName: '添加商品'
                    },
                    {
                      id: '105',
                      authName: '添加商品'
                    }
                  ]
                },
                {
                  id: '104',
                  authName: '分类参数',
                  children: [
                    {
                      id: '105',
                      authName: '添加商品'
                    }
                  ]
                },
                {
                  id: '104',
                  authName: '商品分类',
                  children: [
                    {
                      id: '105',
                      authName: '添加商品'
                    }
                  ]
                }
              ]
            },
            {
              id: '101',
              authName: '订单管理',
              children: [
                {
                  id: '101',
                  authName: '订单列表',
                  children: [
                    {
                      id: '101',
                      authName: '添加订单'
                    }
                  ]
                }
              ]
            },
            {
              id: '101',
              authName: '权限管理',
              children: [
                {
                  id: '101',
                  authName: '权限列表',
                  children: [
                    {
                      id: '101',
                      authName: '添加权限'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          roleName: '测试角色',
          roleDesc: '测试负责人'
        },
        {
          roleName: '测试角色2',
          roleDesc: '技术负责人415'
        },
        {
          roleName: '主管第三方',
          roleDesc: '技术负责水电费人'
        }
      ],
      // 展示分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      // 权限列表
      rightsList: [
        {
          authName: '商品管理',
          level: '0',
          path: 'goods',
          children: [
            {
              authName: '商品管理',
              children: [
                {
                  authName: '商品管理'
                }
              ]
            }
          ]
        },
        {
          authName: '订单管理',
          level: '0',
          path: 'orders',
          children: [
            {
              authName: '商品管理',
              children: [
                {
                  authName: '商品管理'
                }
              ]
            }
          ]
        },
        {
          authName: '权限管理',
          level: '0',
          path: 'rights',
          children: [
            {
              authName: '商品管理',
              children: [
                {
                  authName: '商品管理'
                }
              ]
            }
          ]
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
      ],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点Id值
      defKeys: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取所有的角色列表
    async getRoleList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.roleList = res.data
    },
    // 根据Id删除对应的权限
    async removeRightById(role, rightId) {
      const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除')
      }
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      if (res.meta.status !== 200) {
        this.$message.error('删除权限失败')
      }
      this.$message.info('删除成功')
      // 删除之后重新赋值权限
      role.children = res.data
    },
    // 展示分配权限的对话框的显示与隐藏
    showSetRightDialog() {
      this.setRightDialogVisible = true
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogColsed() {
      // 清除Id
      this.defKeys = []
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

// 垂直居中对齐
.vcenter {
  display: flex;
  align-items: center;
}
</style>
