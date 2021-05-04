<template>
    <div class="app-container">

        <!-- 条件查询 -->
        <el-form :inline="true" :model="query" size="mini">
            <el-form-item label="菜单名称：">
                <el-input v-model.trim="query.name" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="fetchData">查询</el-button>
                <el-button icon="el-icon-refresh"  @click="reload">重置</el-button>
                <el-button icon="el-icon-circle-plus-outline" type="primary" @click="handleAdd(0)" >新增</el-button>
            </el-form-item>
        </el-form>

        <!-- row-key="id" 指定唯一标识的属性名，其中数据要包含children才会被渲染为树状 -->
        <el-table
            row-key="id"
            :data="list"
            stripe
            border
            style="width: 100%">
            <el-table-column  align="center" type="index" label="序号" width="60"></el-table-column>
            <el-table-column  align="center" prop="enterprise_name" label="单位名称" width="200" ></el-table-column>
            <el-table-column  align="center" prop="name" label="联系人" width="80"></el-table-column>
            <el-table-column  align="center" prop="contact_way" label="联系电话" width="100"></el-table-column>
            
            <el-table-column  align="center" prop="talks_type" label="建议类型" width="60" >
                <template slot-scope="scope">
                   
                    <span v-if="scope.row.talks_type === 1">建议</span>
                    <span v-if="scope.row.talks_type === 2">投诉</span>
                    <span v-if="scope.row.talks_type === 3">其他</span>
                </template>
            </el-table-column>
            <el-table-column  align="center" prop="detail" label="意见建议"  width="400"></el-table-column>
            <el-table-column  align="center" prop="url" label="图片列表" width="150" ></el-table-column>
            <el-table-column  align="center" prop="url" label="附件列表" width="150" ></el-table-column>
            <el-table-column  align="center" prop="url" label="处理状态" width="80">
                <template slot-scope="scope">
                   
                    <span v-if="scope.row.type === 1">待分配</span>
                    <span v-if="scope.row.type === 2">待处理</span>
                    <span v-if="scope.row.type === 3">已处理</span>
                </template>  
            </el-table-column>
            <el-table-column  align="center" label="操作" width="80" >
                <template slot-scope="scope">
                    
                    <el-button type="danger"  @click="handleDelete(scope.row.id)"  size="mini">分配</el-button>
                </template>
            </el-table-column>
        </el-table>

        
    </div>
</template>
<script>

import api from '@/api/menu'



export default {
    name: 'Menu', // 和对应路由表中配置的name值一致

    

    data() {
        return {
            list: [], // 列表数据
            query: {}, // 查询条件
            edit: {
                title: '',
                visible: false,
                formData: {}
            }
        }
    },

    created() {
        this.fetchData()
    },

    methods: {
        async fetchData() {
            const { data } = await api.getList(this.query)
            this.list = data
        },

        // 新增菜单, id作为 新菜单 的 parentId
        handleAdd(id) {
            // id = 0 是在条件查询的地方点击的，是新增一级菜单 ，否则新增的是某菜单下的子菜单
            this.edit.formData.parentId = id
            this.edit.title = '新增'
            this.edit.visible = true
        },

        // 关闭弹窗
        remoteClose() {
            this.edit.formData = {}
            this.edit.visible = false
            this.fetchData()
        },

        // 编辑菜单
        handleEdit(id) {
            api.getById(id).then(response => {
                if(response.code === 20000) {
                    this.edit.formData = response.data
                    //设置标题
                    this.edit.title = '编辑'
                    this.edit.visible = true
                }
            })
        },

        // 删除菜单
        handleDelete(id) {
            this.$confirm('确认删除当前节点与子节点记录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 发送删除请求
                api.deleteById(id).then(response => {
                    // 处理响应结果提示
                    this.$message({
                        type: response.code === 20000 ? 'success': 'error',
                        message: response.message
                    })
                })
                // 刷新列表数据
                this.fetchData()
            }).catch(() => {
                // 取消删除，不用理会        
            })
        },

        // 重置
        reload() {
            this.query = {}
            this.fetchData()
        },

        
    }
}
</script>