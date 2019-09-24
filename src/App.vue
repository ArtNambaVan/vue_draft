<script src="./App.js"></script>
<style src="./App.css"></style>
<template>
  <div id="app">
      <div class="list-row">

        <div class="list-col">
          <span>static</span>
          <ul class="list">
            <li v-for="item in static">
              <span>{{item.name}}</span>
              <el-input placeholder="Please input" v-model="item.name"></el-input>
            </li>
          </ul>
          <el-button @click="addStatic" type="primary">Add static item</el-button>
        </div>

        <div class="list-col">
          <span>dynamic</span>
          <ul class="list">
            <li v-for="item in dataForDynamic">
              <span v-for="test in createDynamic(item)">
                {{ test.name }}
                <el-input placeholder="Please input" v-model="test.name"></el-input>
              </span>
            </li>
          </ul>
          <el-button @click="addDynamic" type="primary">Add dynamic item</el-button>
        </div>

      </div>
  </div>
</template>
