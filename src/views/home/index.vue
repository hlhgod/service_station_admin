<template>
    <div>
        <!-- <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            multiple
            :on-change="handleChange"
            :file-list="fileList"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
        >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
                <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                />
                <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                    >
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                    >
                        <i class="el-icon-download"></i>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                    >
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div> </el-upload
        >>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog> -->

        <el-form label-width="100px" >
            <el-form-item>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    border
                    :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#eee',
                    }"
                    highlight-current-row
                    style="width: 60%; margin-bottom: 100px"
                >
                    <el-table-column
                        type="index"
                        width="55"
                        align="center"
                    ></el-table-column>
                    <el-table-column label="图片" prop="title" width="400">
                        <template slot-scope="scope">
                            <span class="title-img">
                                <img
                                    :src="scope.row.pic_url"
                                    alt=""
                                    class="table-img"
                                />
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="显示顺序"
                        width="80"
                        prog="order"
                        align="center"
                    ></el-table-column>

                    <el-table-column
                        label="操作"
                        width="200"
                        align="center"
                        fixed="right"
                    >
                        <template slot-scope="scope">
                            <el-tooltip
                                effect="dark"
                                content="添加"
                                placement="bottom-start"
                            >
                                <el-button
                                    type="primary"
                                    size="mini"
                                    icon="el-icon-edit-outline"
                                    circle
                                ></el-button>
                            </el-tooltip>

                            <el-tooltip
                                effect="dark"
                                content="删除"
                                placement="bottom-start"
                            >
                                <el-button
                                    type="danger"
                                    size="mini"
                                    icon="el-icon-delete"
                                    circle
                                ></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
            tableData: [
                {
                    
                    pic_url: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2610523782,3633335031&fm=26&gp=0.jpg",
                    order: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄",
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄",
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄",
                },
            ],
            fileList: [
                {
                    name: "food.jpeg",
                    url:
                        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
                },
                {
                    name: "food2.jpeg",
                    url:
                        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
                },
            ],
        };
    },
    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handlePictureCardPreview(file) {
            console.log(file, this.fileList);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleChange(file, fileList) {
            console.log("filelist", fileList);
            console.log("this.filelist", this.fileList);
            //    this.fileList=fileList
        },
    },
};
</script>

<style lang="scss" scoped>
img {
    height: 150px;
    width: 350px;
}
</style>