
const mixin = {
    data() {
        return {

        }
    },
    methods: {
        resetQuery() {
            console.log('111')
        },
        handleFilter() {
            console.log('22')
        },
        async getList() {
            const res = await this.$http.get(`${this.entityName}/get_list`);
            if (res.data.status == 0) {
                this.list = res.data.data;
                this.$message({
                    type: "success",
                    message: "获取客户数据成功",
                });
            } else {
                this.$message({
                    type: "error",
                    message: "获取客户数据失败",
                    duration: 1500,
                });
            }
        },
        //列表详情
        detailsHandle(row) {
            this.formDialog = true;
            Object.keys(this.form).forEach((key) => {
                this.form[key] = row[key];
            });
        },
        //编辑列表
        editHandle(row) {
            this.editFormDialog = true;
            Object.keys(this.form).forEach((key) => {
                this.form[key] = row[key];
            });
            console.log(this.form)
        },
        //新增列表
        addHandle() {
            this.resetForm();
            this.editFormDialog = true;
        },
        //重置列表
        resetForm() {
            Object.keys(this.form).forEach((key) => {
                this.form[key] = null;
            });
        },
        async deleteHandle(id) {
            const res = await this.$http.delete(
                `${this.entityName}/delete_form`, {
                params: {
                    id: id
                }
            }
            );
            if (res.data.status == 0) {
                this.editFormDialog = false;
                this.$notify({
                    title: "提示",
                    type: "success",
                    message: res.data.message,
                });
            } else {
                this.$notify.error({
                    title: "提示",
                    message: res.data.message,
                    duration: 1500,
                });
            }
            this.getList();
        },
        //提交列表
        async submitHandle() {
            let data = this.$qs.stringify(this.form);
            const res = await this.$http.put(`${this.entityName}/edit_form`, data);

            if (res.data.status == 0) {
                this.editFormDialog = false;
                this.$notify({
                    title: "提示",
                    type: "success",
                    message: res.data.message,
                });
            } else {
                this.$notify.error({
                    title: "提示",
                    message: res.data.message,
                    duration: 1500,
                });
            }
            this.getList();
        },
        /**
   * 格式化时间
   */
        formatTime(datetime) {
            var date = new Date(datetime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var year = date.getFullYear(),
                month = ("0" + (date.getMonth() + 1)).slice(-2),
                sdate = ("0" + date.getDate()).slice(-2);
            // hour = ("0" + date.getHours()).slice(-2),
            // minute = ("0" + date.getMinutes()).slice(-2),
            // second = ("0" + date.getSeconds()).slice(-2);
            // 拼接
            var result =
                year +
                "-" +
                month +
                "-" +
                sdate;
            // " " +
            // hour +
            // ":" +
            // minute +
            // ":" +
            // second;
            // 返回
            return result;
        },
        formatTime2(datetime) {
            var date = new Date(datetime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var year = date.getFullYear(),
                month = ("0" + (date.getMonth() + 1)).slice(-2),
                sdate = ("0" + date.getDate()).slice(-2),
                hour = ("0" + date.getHours()).slice(-2),
                minute = ("0" + date.getMinutes()).slice(-2),
                second = ("0" + date.getSeconds()).slice(-2);

            // 拼接
            var result =
                year +
                "-" +
                month +
                "-" +
                sdate +
                " " +
                hour +
                ":" +
                minute +
                ":" +
                second;
            // 返回
            return result;
        },
    },

}
export {
    mixin
}