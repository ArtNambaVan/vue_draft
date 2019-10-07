<script src="./pieChart2.js"></script>

<template>
  <div>
    <h1>Circle Pack in D3</h1>
    <div id="test"></div>
    <svg
      id="svg-pie"
      :height='height'
      :width='width'
      background="pink"
    >
    </svg>
  </div>
</template>




        <!-- <rect x="300" y="100" fill="blue" width="100" height="200"></rect>
<template>
  <div>
    <h1>Circle Pack in D3</h1>
    <h2>{{ msg }}</h2>
    <svg
      :height='height'
      :width='300'
    >
      <g transform="translate(50,50)">
        
        
        <circle
          v-for="c in output"
          :key="c.id"
          :r="c.r"
          :cx="c.x"
          :cy="c.y"
          :fill="c.fill"
          :stroke="c.stroke"
        >
        </circle>
        <path d="M 750 50 L 800 200 L 700 200 C 700 200 650 150 750 50" fill="orange"></path> 
      </g>
    </svg>
  </div>
</template>-->