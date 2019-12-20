<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert title="添加商品信息" type="info" show-icon center :closable="false"></el-alert>
      <!-- 步骤条区域 -->
      <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- tab栏区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs :tab-position="'left'" v-model="activeIndex" :before-leave="beforeTableave">
          <el-tab-pane label="基本信息" name="0">
            <!-- 基本信息表单 -->
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="catelist"
                :props="{ expandTrigger: 'hover',
                label: 'cat_name',
                value: 'cat_id',
                children: 'children'}"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染商品动态参数Item表单项 -->
            <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
              <!-- 复选框组 -->
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <!-- 静态属性 -->
            <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
              <!-- 输入框 -->
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- 图片上传 -->
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 复文本编辑器组件 -->
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <!-- 添加商品按钮 -->
            <el-button type="primary" class="btnAdd" @clicl="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      // 添加商品的表单数据对象
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 商品所属的分类数组
        goods_cat: [],
        // 商品的详情描述
        goods_introduce: ''
      },
      // 添加商品的表单验证规则
      addFormRules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '请选择商品分类', trigger: 'blur' }]
      },
      // 商品分类数据
      catelist: [
        {
          cat_id: '123',
          cat_name: '大家电',
          cat_level: 0,
          cat_delete: false,
          children: [
            {
              cat_id: '123',
              cat_name: '电视',
              cat_level: 1,
              cat_delete: false,
              children: [
                {
                  cat_id: '123',
                  cat_name: '创维',
                  cat_level: 2,
                  cat_delete: false
                }
              ]
            }
          ]
        },
        {
          cat_id: '123',
          cat_name: '大家电',
          cat_level: 2,
          cat_delete: true,
          children: [
            {
              cat_id: '123',
              cat_name: '电视',
              cat_level: 0,
              cat_delete: false
            }
          ]
        },
        {
          cat_id: '123',
          cat_name: '大家电',
          cat_level: 1,
          cat_delete: false,
          children: [
            {
              cat_id: '123',
              cat_name: '电视',
              cat_level: 1,
              cat_delete: false
            }
          ]
        },
        {
          cat_id: '123',
          cat_name: '大家电',
          cat_level: 0,
          cat_delete: false,
          children: [
            {
              cat_id: '123',
              cat_name: '电视',
              cat_level: 2,
              cat_delete: false
            }
          ]
        }
      ],
      // 动态参数列表
      manyTableData: [
        {
          attr_id: '1',
          attr_name: '颜色',
          attr_vals: '湖人总冠军'
        },
        {
          attr_id: '2',
          attr_name: '样式',
          attr_vals: '冲鸭'
        }
      ],
      // 静态属性列表
      onlyTableData: [
        {
          attr_name: '詹姆斯',
          attr_vals: '湖人总冠军'
        },
        {
          attr_name: '韦德',
          attr_vals: '闪电侠'
        },
        {
          attr_name: '浓眉',
          attr_vals: 'AD'
        },
        {
          attr_name: '秃曼巴',
          attr_vals: '秃过去就是一个暴扣'
        },
        {
          attr_name: '科比',
          attr_vals: '黑曼巴'
        },
        {
          attr_name: 'JR史密斯',
          attr_vals: '三分神射手'
        }
      ],
      // 默认选中的属性
      checkList: ['复选框 A'],
      // 上传图片的URL地址
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      // 图片上传组件的headers请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      previewPath: '',
      previewVisible: false
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取所有商品分类数据
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类数据失败')
      }
      this.catelist = res.data
    },
    // 预览
    handlePreview(file) {
      this.previewPath = file.response.data.url
      this.previewVisible = true
    },
    // 一定要选择商品三级分类 不然无法进入到下一级
    beforeTableave(activeName, oldActiveName) {
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类！')
        // 拒绝切换
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important; // 上左下右
}

.previewImg {
  width: 100%;
}

.btnAdd {
  margin-top: 15px;
}
</style>
