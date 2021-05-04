<template>
    <div>
        <el-form label-width="100px">
            <el-form-item>
                <el-table
                    ref="multipleTable"
                    :data="bannerlist"
                    border
                    
                    highlight-current-row
                    style="width: 100%; margin-bottom: 100px"
                >
                    <el-table-column
                        type="index"
                        width="60"
                        align="center"
                        label="序号"
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
                        label="操作"
                        width="100"
                        align="center"
                        
                    >
                        <template slot-scope="scope">
                            <el-tooltip
                                effect="dark"
                                content="删除"
                                placement="bottom-start"
                            >
                                <el-button
                                    type="danger"
                                    size="mini"
                                    icon="el-icon-delete"
                                    @click="handleRemove(scope.row)"
                                    circle
                                ></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-upload
                    class="upload-demo"
                    :action="uploadAddress"
                    :on-success="handleUploadSuccess"
                    :show-file-list="false"
                >
                    <el-button slot="trigger" type="primary"
                        >增加图片</el-button
                    >
                    <el-button
                        type="primary"
                        style="margin-left: 10px"
                        @click="handlePostOrder"
                        >保存顺序</el-button
                    >
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Sortable from "sortablejs";
import axios from "axios";
import request from "@/utils/request";
import { getToken } from "@/utils/auth";
export default {
    data() {
        return {
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
            token: "",
            bannerlist: [],
            uploadAddress: "",
            newList: [],

            fileList: [],
            token: "",
        };
    },
    mounted() {
        let el = document.querySelectorAll(
            ".el-table__body-wrapper > table > tbody"
        )[0];
        let sortable = Sortable.create(el, {
            onEnd: (evt) => {
                //监听end事件 手动维护列表
                // console.log(this.bannerlist)
                const tempIndex = this.bannerlist.splice(evt.oldIndex, 1)[0];
                this.bannerlist.splice(evt.newIndex, 0, tempIndex);
                // console.log(this.bannerlist)
            },
        });
        this.token = getToken();
        this.uploadAddress =
            process.env.VUE_APP_BASE_API + "/banner?token=" + this.token
            // this.getBannerList().then(res=>{
            //     let bannlist=res.data;

            // });
            this.getBannerList();
    },
    methods: {
        async getBannerList() {
            let token = getToken();
            // console.log(token)
            let bannerlist = await request({
                url: "/banner",
                method: "get",
                params: { token },
            });
            // this.bannerlist=bannerlist.data;

            this.bannerlist = [];
            bannerlist.data.forEach((item) => {
                this.bannerlist.push(item);
            });
            console.log(this.bannerlist);
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(row) {
            let token = getToken();
            console.log(row);
            this.$confirm("请确认删除该图片?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                axi({
                    url: `/banner/${row.id}`,
                    method: "delete",
                    params: { token },
                }).then(() => {
                    this.getBannerList();
                });
            });
        },
        handlePostOrder() {
            let newlist = [];

            this.bannerlist.forEach((item) => {
                newlist.push({ id: item.id, sort: item.sort });
            });
            // axios
            //     .put("/banner?token="+this.token, {pics:JSON.stringify(newlist)},)
            //     .then(function (response) {
            //         console.log(response);
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
            request({
                url: `/banner`,
                method: "put",
                params: {
                    token: this.token
                },
                data: {pics:JSON.stringify(newlist) },
            }).then(() => {
                this.getBannerList();
            });
        },
        // handlePreview(file) {
        //     console.log(file);
        // },
        // handlePictureCardPreview(file) {
        //     console.log(file, this.fileList);
        //     this.dialogImageUrl = file.url;
        //     this.dialogVisible = true;
        // },
        // handleChange(file, fileList) {
        //     console.log("filelist", fileList);
        //     console.log("this.filelist", this.fileList);
        //     //    this.fileList=fileList
        // },
        handleUploadSuccess(response, file, fileList) {
            this.getBannerList();
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