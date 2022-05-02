<template>
  <div>
    <quill-editor
      class="ql-editor"
      ref="myQuillEditor"
      :value="contentLocal"
      :options="editorOption"
      @change="onEditorChange($event)"
      @focus="focus($event)"
    >
      {{ content }}
    </quill-editor>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  props: {
    content: {
      type: String,
      default: "",
    },
    disable: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    quillEditor,
  },
  data() {
    return {
      contentLocal: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式
            ["clean"], //清除字体样式
            ["image", "video"], //上传图片、上传视频
          ],
        },
      },
    };
  },
  computed: {
    //当前富文本实例
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  created() {
    this.test();
  },
  watch: {
    content() {
      this.test();
    },
  },
  methods: {
    test() {
      this.contentLocal = this.content;
    },
    onEditorChange(e) {
      this.$emit("getContent", e.html);
    },
    //获取焦点事件
    focus(event) {
      event.enable(this.disable); //设置富文本编辑器不可编辑
    },
  },
};
</script>

<style lang="scss" scoped>
.ql-editor {
  height: 20rem;
}
</style>>

