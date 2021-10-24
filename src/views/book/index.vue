<!--
 * @Author: tanzhiyu
 * @Date: 2021-10-24 21:05:06
 * @LastEditors: tanzhiyu
 * @LastEditTime: 2021-10-24 22:52:09
-->
<template>
  <div class="app-container">
    <el-row display="margin-top:10px">
      <el-input v-model="input_bookname" placeholder="请输入书名" style="display:inline-table; width: 30%; float:left" />
      <el-button type="primary" style="float:left; margin: 2px;" @click="addBook()">新增</el-button>
    </el-row>
    <el-row>
      <el-table :data="list_book" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="Book_name">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="Time" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import {
  getList,
  addbook
} from '@/api/book'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list_book: null,
      listLoading: true,
      input_bookname: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getList().then(response => {
        if (response.code === 0) {
          this.list_book = response.list
          this.listLoading = false
        } else {
          this.$message.error('查询书籍失败')
          console.log(response['msg'])
        }
      })
    },
    addBook() {
      addbook(this.input_bookname).then(response => {
        if (response.code === 0) {
          this.getList()
          this.input_bookname = ''
          this.$message.success('新增书籍成功')
        } else {
          this.$message.error('新增书籍失败，请重试')
          console.log(response['msg'])
        }
      })
    }
  }
}
</script>
