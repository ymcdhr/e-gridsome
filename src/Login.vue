<template>
  <div class="page-login">
        <div class="content">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账号">
                    <el-input v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
  </div>
</template>

<script>
// 登录页面
import axios from "axios";

export default {
    data() {
        return {
            form: {
                account: '',
                password: ''
            }
        }
    },
    methods: {
        onSubmmit() {
        // Request API.
        axios
            .post("http://localhost:1337/auth/local", {
                identifier: "ymcdhr",
                password: "",
            })
            .then((response) => {
                // Handle success.
                console.log("Well done!");
                console.log("User profile", response.data.user);
                console.log("User token", response.data.jwt);
            })
            .catch((error) => {
                // Handle error.
                console.log("An error occurred:", error.response);
            });
        },
    },
};
</script>

<style>
</style>