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
    },

}
export {
    mixin
}