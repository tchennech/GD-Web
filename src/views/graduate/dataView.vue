<template>
  <div>
    <el-button type="text"
               @click="dialogVisible = true">+点击上传新数据</el-button>
    <el-dialog title="上传数据"
               :visible.sync="dialogVisible"
               width="80%">
      <upload @showbox="getStatus"
              :flag="flag"></upload>
    </el-dialog>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column label="日期"
                       width="240"
                       sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.saveTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标识"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.flodName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片数量"
                       width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     v-if="!visiType"
                     @click="chooseData(scope.$index, scope.row)">选择</el-button>
          <el-button size="mini"
                     v-if="visiType"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="pageSizes"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalNum">
      </el-pagination>
    </div>
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
  props: {
    visiType: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tableData: [],
      imgsLists: [],
      dialogVisible: false,
      flag: false,
      pageSizes: [5, 10, 15],
      pageSize: 5,
      totalNum: 0,
      currentPage: 1,
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    //获取全部数据
    getData () {
      this.$http.post('/api/getAllData.action').then(
        function (res) {
          let result = JSON.parse(res.bodyText)
          console.log(result)
          if (result.status === 1) {
            this.$message({
              message: '服务器请求失败:' + result.msg,
              type: 'warning'
            })
          } else {
            console.log(result.datas)
            this.imgsLists = JSON.parse(result.datas)
            this.totalNum = this.imgsLists.length
            this.handleCurrentChange(1)
          }
        }, function (err) {
          this.$message.error('服务器请求错误')
        }
      )
    },
    //选择模型
    chooseData (index, row) {

    },
    //删除模型
    handleDelete (index, row) {

    },
    getStatus (flag) {
      console.log(flag)
      if (flag === true) {
        this.dialogVisible = false
        this.getData()
      } else if (flag === false) {

      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.handleCurrentChange(1)
    },
    handleCurrentChange (val) {
      this.tableData = this.imgsLists.slice((val - 1) * this.pageSize, val * this.pageSize)
    },

  }
};
</script>

<style>
* {
  text-decoration: none;
  margin: 0;
  padding: 0;
}
.pagination {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}
</style>
