<template>
    <el-dialog
            title="用户注册"
            :visible.sync="dialogTableVisible"
            width="600px"
            :close-on-click-modal="false"
            :show-close="false"
            :close-on-press-escape="false"
    >
        <el-form :model="registerForm" :rules="rules" ref="ruleForm" class="register-form">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                <el-input v-model="registerForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="registerForm.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
                <el-input v-model="registerForm.age" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                <el-select v-model="registerForm.sex" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <!--<el-form-item label="头像" :label-width="formLabelWidth" prop="image_url">
                <el-upload
                        :limit="1"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :before-upload="handleBeforeUpload"
                >
                    <img v-if="fileList.length > 0" :src="previewImg" class="preview-img" alt="">
                    <i v-else class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleDialogVisible(false)">取 消</el-button>
            <el-button type="primary" @click="onRegisterUser('ruleForm')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {uploadPhoto} from "../service/DiagnosisService";

    export default {
        name: "RegisterDialog",
        props: {
            dialogTableVisible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                registerForm: {
                    name: "",
                    phone: "",
                    age: "",
                    sex: "",
                   /* image_url: '',*/
                },
                formLabelWidth: "100px",
                fileList: [],
                maskShow: false,
                previewImg: "",
                rules: {
                    name: [
                        {required: true, message: '请填写姓名', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请填写电话', trigger: 'blur'},
                    ],
                    age: [
                        {required: true, message: '请填写年龄', trigger: 'blur'},
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'blur'},
                    ],
                    /*image_url: [
                        {required: true, message: '请选择头像', trigger: 'blur'},
                    ],*/
                },
                /*avatarFile: null*/
            }
        },
        methods: {
            resetForm(formName) {
                this.fileList = [];
                this.$refs[formName].resetFields();
            },
           /* handleBeforeUpload(file) {
                this.avatarFile = file;
                let _this = this;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    _this.fileList = [Object.assign({}, file, {url: e.target.result})];
                    _this.previewImg = e.target.result;
                };
                return false;
            },*/
            handleDialogVisible(bool) {
                this.resetForm("ruleForm");
                this.$emit("handleDialogVisible", bool);
            },
            onRegisterUser(formName) {
                /*const formData = new FormData();
                formData.append("photo", this.avatarFile);
                uploadPhoto(formData)
                    .then(res => {
                        console.log(res);
                        // TO_DO 拿到返回的图片url之后,在调用保存用户信息接口即可!
                    });*/
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit("confirmAdd", this.registerForm);
                    } else {
                        return false;
                    }
                });

            }
        }
    }
</script>

<style scoped>
    .preview-img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
</style>
