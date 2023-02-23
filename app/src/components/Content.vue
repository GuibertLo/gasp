<template>
  <el-main>
    <el-row>
      <el-col :span="24" :lg="{ span: 16, offset: 4 }">
        <slot></slot>
      </el-col>
    </el-row>
  </el-main>
</template>
