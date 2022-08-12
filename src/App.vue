<template>
<div class="table-box">
  <div class="title">
    <h2>最简单的CRUD Demo</h2>
  </div>
  <div class="query-box">
    <el-input class="query-input" v-model="queryInput" placeholder="请输入姓名搜索" @input="handleQueryName"/>
     <div>
      <el-button type="primary" @click="handleAdd" >增加</el-button>
     <el-button type="danger" @click="handleDelete" >批量删除</el-button>
     </div>
  </div>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  > border>
    <el-table-column type="selection" width="55" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="email" label="email" width="150"/>
    <el-table-column prop="phone" label="phone" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="address" label="Address" width="600" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleRowDel(scope.row)" style="color:#f56c6c"
          >delete</el-button
        >
        <el-button link type="primary" size="small" @click="handleRowEdit(scope.row)">Edit</el-button>
      </template>
    </el-table-column>
 
  
  </el-table>
   <el-dialog v-model="dialogFormVisible" :title="dialogType==='add'?'新增':'编辑'">
    <el-form :model="tableForm">
      <el-form-item label="姓名" :label-width="60">
        <el-input v-model="tableForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="60">
        <el-input v-model="tableForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话" :label-width="60">
        <el-input v-model="tableForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="状态" :label-width="60">
        <el-input v-model="tableForm.state" autocomplete="off" />
      </el-form-item>
      <el-form-item label="地址" :label-width="60">
        <el-input v-model="tableForm.address" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogConfirm"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</div>


</template>

<script lang="ts" setup>
import { Row } from "element-plus/es/components/table-v2/src/components";
import { ref } from "vue";

let queryInput=ref("")
let tableData=ref([
  {
    id:"1",
    name: 'Tom',
    email:"123321@qq.com",
    phone:"123456789",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:"2",
    name: 'jack',
    email:"123321@qq.com",
    phone:"123456789",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:"3",
    name: 'rose',
    email:"123321@qq.com",
    phone:"123456789",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:"4",
    name: 'marry',
    email:"123321@qq.com",
    phone:"123456789",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
let multipleSelection=ref()
let dialogFormVisible=ref(false)
let tableForm=ref({
  id:"",
  name:'',
  email:'@.',
  phone:'123456',
  state:'在校',
  address:'华东院',
})
let dialogType=ref('add')
let tableDataCopy=Object.assign(tableData.value)
// 编辑
const handleRowEdit=(val)=>{
  dialogFormVisible.value=true
  dialogType.value="edit"
  // tableForm.value.name=val.name
  // tableForm.value.email=val.email
  // tableForm.value.phone=val.phone
  // tableForm.value.state=val.state
  // tableForm.value.address=val.address
  tableForm.value={...val}

}

const handleQueryName=(val)=>{
 if (val.length>0){
  tableData.value=tableData.value.filter(item=>(item.name).toLowerCase().match(val))
 }else{
  tableData.value=tableDataCopy
 }
  
}

// 删除一条
const handleRowDel = (val) => {
  // console.log(val.id);
  let index=tableData.value.findIndex(item=>item.id===val.id)
  // console.log(index)
  tableData.value.splice(index,1)
}
//批量删除
const handleDelete=()=>{
  multipleSelection.value.forEach(id=>{
    handleRowDel({id})
  })
  multipleSelection.value=[]
}
// 选中
const handleSelectionChange = (val) => {
  // multipleSelection.value = val
  // console.log(val.id)
  multipleSelection.value=[]
  
  val.forEach(element => {
    multipleSelection.value.push(element.id)
  });
  console.log(multipleSelection.value)
}
// 添加
const handleAdd=()=>{
  dialogFormVisible.value=true
  dialogType.value="add"
  tableForm.value={}
}

const dialogConfirm=()=>{
  dialogFormVisible.value=false
  if (dialogType.value=="add"){
    tableData.value.push({
    id:(tableData.value.length+1).toString(),
    ...tableForm.value
  })
  }else{
    let index=tableData.value.findIndex(item=>item.id===tableForm.value.id)
    tableData.value[index]=tableForm.value

  }

}
</script>

<style scoped>
.table-box{
  width: 800px;
margin: 200px auto;
}
.title{
  text-align: center;
}
.query-box{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.query-input{
  width: 200px;
}
</style>

