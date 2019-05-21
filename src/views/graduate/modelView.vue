<template>
  <div>
    <div class="imgDialog">
      <el-dialog title="数据集图像"
                 :visible.sync="
                 imgDialogVisible"
                 width="100%">
        <viewImgs v-if="imgDialogVisible"
                  :imgId="19318105756"></viewImgs>
      </el-dialog>
    </div>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column label="日期"
                       width="220"
                       prop="saveTime"
                       sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.saveTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标识"
                       width="160">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者"
                       width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据标识"
                       width="160">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.dataName }} <el-button type="text"
                       @click="imgDialogVisible=true">查看</el-button></span>
        </template>
      </el-table-column>
      <el-table-column label="训练准确率">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.trainAccuracy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="测试准确率">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.testAccuracy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="训练loss">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.trainLoss }}</span>
        </template>
      </el-table-column>
      <el-table-column label="测试loss">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.testLoss }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-show="choose !== scope.$index">
            <el-button size="mini"
                       v-if="!visiType"
                       @click="chooseModel(scope.$index, scope.row)">选择</el-button>
          </div>
          <el-button v-show="choose === scope.$index"
                     size="mini"
                     icon="el-icon-check"
                     circle>
          </el-button>
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
import 'element-ui/lib/theme-chalk/display.css'
import viewImgs from '@/components/viewImgs'

export default {
  name: 'mView',

  components: {
    viewImgs
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
      modelsLists: [],
      choose: -1,
      dialogVisible: false,
      flag: false,
      pageSizes: [5, 10, 15],
      pageSize: 5,
      totalNum: 0,
      currentPage: 1,
      imgDialogVisible: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.post('/api/getAllModels.action').then(
        function (res) {
          let result = JSON.parse(res.bodyText)
          console.log(result)
          if (result.status === 1) {
            this.$message({
              message: '服务器请求失败:' + result.msg,
              type: 'warning'
            })
          } else {
            this.modelsLists = JSON.parse(result.datas)
            // for (let x in this.modelsLists) {
            //   this.modelsLists[x].saveTime = new Date(this.modelsLists[x].saveTime)
            // }
            console.log(this.modelsLists)
            this.totalNum = this.modelsLists.length
            this.handleCurrentChange(1)
          }
        }, function (err) {
          this.$message.error('服务器请求错误')
        }
      )
    },
    // 选择模型
    chooseModel (index, row) {
      this.choose = index
      this.tolkToFather(row)
    },
    // 删除模型
    handleDelete (index, row) {
      this.$confirm('此操作将删除该模型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteModel(row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteModel (id) {
      let form = {}
      form.id = id
      let posts = {
        datal: JSON.stringify(form)
      }
      this.$http.post('/api/deleteModel.action', posts).then(
        function (res) {
          let result = JSON.parse(res.bodyText)
          console.log(result)
          if (result.status === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getData()
          }
        },
        function (err) {
          this.$message.error('服务器请求错误')
        }
      )
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.handleCurrentChange(1)
    },
    handleCurrentChange (val) {
      this.tableData = this.modelsLists.slice((val - 1) * this.pageSize, val * this.pageSize)
    },
    tolkToFather (data) {
      this.$emit('showbox', data)
    }
  }
}
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
.cell {
  text-align: center;
}
</style>
