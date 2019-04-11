<template>
  <div>
    <el-button type="text"
               @click="dialogVisible = true">+点击上传新数据</el-button>
    <el-dialog title="上传数据"
               :visible.sync="dialogVisible"
               width="80%">
      <upload></upload>
    </el-dialog>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column label="日期"
                       width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标识"
                       width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover"
                      placement="top">
            <p>标识: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="chooseModel(scope.$index, scope.row)">选择</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css";
import upload from "@/components/upload";

export default {
  name: "dView",
  components: {
    upload,
  },
  data () {
    return {
      tableData: [],
      dialogVisible: false
    }
  },
  mounted () {
  },
  methods: {
    //选择模型
    chooseModel (index, row) {

    },
    //删除模型
    handleDelete (index, row) {

    }
  }
};
</script>

<style>
* {
  text-decoration: none;
  margin: 0;
  padding: 0;
}
</style>
