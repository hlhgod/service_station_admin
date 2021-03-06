<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" :model="query" size="mini">
                <el-form-item label="名称：">
                    <el-input
                        v-model="listQuery.name"
                        placeholder="名称"
                        style="width: 200px"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        v-waves
                        class="filter-item"
                        type="primary"
                        icon="el-icon-search"
                        @click="handleFilter"
                    >
                        查找
                    </el-button>
                    <el-button
                        class="filter-item"
                        style="margin-left: 10px"
                        type="primary"
                        icon="el-icon-edit"
                        @click="handleCreate"
                    >
                        增加
                    </el-button>
                    <el-button
                        v-waves
                        :loading="downloadLoading"
                        class="filter-item"
                        type="primary"
                        icon="el-icon-download"
                        @click="handleDownload"
                    >
                        导出
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%"
            @sort-change="sortChange"
        >
            <el-table-column
                label="ID"
                prop="id"
                sortable="custom"
                align="center"
                width="80"
                :class-name="getSortClass('id')"
            >
                <template slot-scope="{ row }">
                    <span>{{ row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="图片" prop="title" width="100" height="100">
                <template slot-scope="scope">
                    <span class="title-img">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.icon"
                            fit="fill"
                        ></el-image>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="名称" min-width="150px">
                <template slot-scope="{ row }">
                    <span class="link-type">{{ row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="网址" min-width="150px">
                <template slot-scope="{ row }">
                    <span class="link-type">{{ row.url }}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="操作"
                align="center"
                width="230"
                class-name="small-padding fixed-width"
            >
                <template slot-scope="{ row, $index }">
                    <el-button
                        type="primary"
                        size="mini"
                        @click="handleUpdate(row)"
                    >
                        编辑
                    </el-button>

                    <el-button
                        v-if="row.status != 'deleted'"
                        size="mini"
                        type="danger"
                        @click="handleDelete(row, $index)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
        />

        <el-dialog
            :title="textMap[dialogStatus]"
            :visible.sync="dialogFormVisible"
            fullscreen
        >
            <el-form
                ref="dataForm"
                :rules="rules"
                :model="temp"
                label-position="left"
                label-width="80px"
                style="width: 80%; margin-left: 50px"
            >
                <el-form-item label="图片" prop="title">
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="temp.icon"
                        fit="fill"
                    ></el-image>
                    <el-upload
                        class="upload-demo"
                        :action="uploadAddress"
                        :on-success="handleUploadSuccess"
                        :show-file-list="false"
                        :limit="1"
                    >
                        <el-button slot="trigger" type="primary"
                            >增加图片</el-button
                        >
                    </el-upload>
                </el-form-item>

                <el-form-item label="名称" prop="title">
                    <el-input v-model="temp.name" />
                </el-form-item>

                <el-form-item label="网址" prop="title">
                    <el-input v-model="temp.url" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false"> 取消 </el-button>
                <el-button
                    type="primary"
                    @click="
                        dialogStatus === 'create' ? createData() : updateData()
                    "
                >
                    确认
                </el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
            <el-table
                :data="pvData"
                border
                fit
                highlight-current-row
                style="width: 100%"
            >
                <el-table-column prop="key" label="Channel" />
                <el-table-column prop="pv" label="Pv" />
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogPvVisible = false"
                    >确认</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    fetchList,
    fetchPv,
    createArticle,
    deleteArticle,
    updateArticle,
} from "@/api/bridge";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { getToken } from "@/utils/auth";
import Tinymce from "@/components/Tinymce";
import request from "@/utils/request";

const calendarTypeOptions = [
    { key: "CN", display_name: "China" },
    { key: "US", display_name: "USA" },
    { key: "JP", display_name: "Japan" },
    { key: "EU", display_name: "Eurozone" },
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name;
    return acc;
}, {});

export default {
    name: "ComplexTable",
    components: { Pagination, Tinymce },
    directives: { waves },
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: "success",
                draft: "info",
                deleted: "danger",
            };
            return statusMap[status];
        },
        typeFilter(type) {
            return calendarTypeKeyValue[type];
        },
    },
    data() {
        return {
            tableKey: 0,
            list: null,
            total: 0,
            token: "",
            listLoading: true,
            uploadAddress: "",
            listQuery: {
                page: 1,
                limit: 20,
                importance: undefined,
                name: "",
                type: undefined,
                sort: "+id",
            },
            importanceOptions: [1, 2, 3],
            calendarTypeOptions,
            sortOptions: [
                { label: "ID Ascending", key: "+id" },
                { label: "ID Descending", key: "-id" },
            ],
            statusOptions: ["published", "draft", "deleted"],
            showReviewer: false,
            temp: {
                id: undefined,
                name: "",
                url: "",
            },
            dialogFormVisible: false,
            dialogStatus: "",
            textMap: {
                update: "编辑",
                create: "创建",
            },
            dialogPvVisible: false,
            pvData: [],
            rules: {},
            downloadLoading: false,
        };
    },
    created() {
        this.token = getToken();
        this.getList();
        this.uploadAddress =
            process.env.VUE_APP_BASE_API + "/upload/pic?token=" + this.token;
    },
    methods: {
        getList() {
            this.listLoading = true;
            this.listQuery["token"] = this.token;

            fetchList(this.listQuery).then((response) => {
                console.log(response);
                this.list = response.data.data;
                this.total = response.data.total;

                // Just to simulate the time of the request
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 1000);
            });
        },
        handleFilter() {
            this.listQuery.page = 1;
            this.getList();
        },
        handleModifyStatus(row, status) {
            this.$message({
                message: "操作成功",
                type: "success",
            });
            row.status = status;
        },
        sortChange(data) {
            const { prop, order } = data;
            if (prop === "id") {
                this.sortByID(order);
            }
        },
        sortByID(order) {
            if (order === "ascending") {
                this.listQuery.sort = "+id";
            } else {
                this.listQuery.sort = "-id";
            }
            this.handleFilter();
        },
        resetTemp() {
            this.temp = {
                id: undefined,
                importance: 1,
                remark: "",
                timestamp: new Date(),
                title: "",
                status: "published",
                type: "",
            };
        },
        handleCreate() {
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        createData() {
            this.$refs["dataForm"].validate((valid) => {
                if (valid) {
                    this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id

                    createArticle(this.temp).then(() => {
                        this.list.unshift(this.temp);
                        this.dialogFormVisible = false;
                        this.$notify({
                            title: "Success",
                            message: "增加成功",
                            type: "success",
                            duration: 2000,
                        });
                    });
                }
            });
        },
        handleUpdate(row) {
            this.temp = Object.assign({}, row); // copy obj
            console.log("temp:", this.temp);
            this.getContent(this.temp.id);
            this.temp.created_at = new Date(this.temp.created_at);
            this.dialogStatus = "update";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        getContent(id) {
            request({
                url: `/party-building/${id}?token=${this.token}`,
                method: "get",
                params: {
                    token: this.token,
                },
            }).then((res) => {
                console.log("content", res);
                this.$set(this.temp, "content", res.data.content);
                // this.temp.content=res.data.content;
                // console.log("temp",this.temp);
            });
        },
        updateData() {
            this.$refs["dataForm"].validate((valid) => {
                if (valid) {
                    const tempData = Object.assign({}, this.temp);
                    tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                    updateArticle(tempData).then(() => {
                        const index = this.list.findIndex(
                            (v) => v.id === this.temp.id
                        );
                        this.list.splice(index, 1, this.temp);
                        this.dialogFormVisible = false;
                        this.$notify({
                            title: "Success",
                            message: "更新成功",
                            type: "success",
                            duration: 2000,
                        });
                    });
                }
            });
        },
        handleDelete(row, index) {
            this.$confirm("请确认删除该条目?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                deleteArticle(row.id).then(() => {
                    this.$notify({
                        title: "成功",
                        message: "删除成功",
                        type: "success",
                        duration: 2000,
                    });
                    this.list.splice(index, 1);
                });
            });
        },
        handleFetchPv(pv) {
            fetchPv(pv).then((response) => {
                this.pvData = response.data.pvData;
                this.dialogPvVisible = true;
            });
        },
        handleDownload() {
            this.downloadLoading = true;
            import("@/vendor/Export2Excel").then((excel) => {
                const tHeader = [
                    "id",
                    "图标",
                    "名称",
                    "网址",
                    
                ];
                const filterVal = [
                    "id",
                    "icon",
                    "name",
                    "url"
                ];
                const data = this.formatJson(filterVal);
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "金融服务",
                });
                this.downloadLoading = false;
            });
        },
        formatJson(filterVal) {
            return this.list.map((v) =>
                filterVal.map((j) => {
                    if (j === "timestamp") {
                        return parseTime(v[j]);
                    } else {
                        return v[j];
                    }
                })
            );
        },
        getSortClass: function (key) {
            const sort = this.listQuery.sort;
            return sort === `+${key}` ? "ascending" : "descending";
        },
        handleUploadSuccess(res, file) {
            // console.log('res',res,'file',file)

            // let imageUrl = URL.createObjectURL(file.raw);
            console.log("res", res);
            this.$set(this.temp, "icon", res.data[0].file_url);
            console.log("temp", this.temp);
            // console.log('raw',file.raw);
        },
    },
};
</script>
