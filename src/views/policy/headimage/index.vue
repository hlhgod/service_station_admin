<template>
    <div class="container">
      
        <el-form label-width="100px" >
            <el-image :src="imgSrc" fit="fill" class="headimg"></el-image>
            <el-form-item>
                <el-upload
                    class="upload-demo"
                    :action="uploadAddress"
                    :on-success="handleUploadSuccess"
                    :show-file-list="false"
                >
                    <el-button slot="trigger" type="primary"
                        >修改图片</el-button
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
            imgSrc: "",
            token: "",
            uploadAddress: "",
        };
    },
    mounted() {
      this.token = getToken();
        this.uploadAddress =
            process.env.VUE_APP_BASE_API +
            "/policies/cover?token=" +
            this.token;
        
        this.getPicurl();
    },
    methods: {
        handleUploadSuccess() {
          this.getPicurl();
        },
        
        async getPicurl() {
            let picdata = request({
                url: `/policies/cover?token=${this.token}`,
                method: "get",
                params: {
                    token: this.token,
                },
            }).then((res) => {
                this.imgSrc=res.data;
                // console.log(res);
            });
        },
       
    },
};
</script>

<style lang="scss" scoped>
.container{
  margin:30px;
}
.headimg{
  width:600px;
  height: 300px;
}
</style>