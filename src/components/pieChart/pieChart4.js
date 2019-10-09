import * as d3 from "d3";
import {birthData} from './data'
export default {
  props: ["tweetData"],
  data() {
    return {
      sucessColor: '#5CB85C',
      dangerColor: '#D9534F',
      colorGray: '#757373',
      
      width: 1000,
      height: 200,

      pieWidth: 30,
      pieHeight: 30,

      positionX: 0,
      positionY: 0,

      data5: [
        [{"key":"CimsKek","size": 18700,
        "topics":[
            {"key":"positive","size": 12300},
            {"key":"negative","size": 3300},
            {"key":"neutral","size": 3100},
        ]},
        {"key":"Cims2","size":9600,
        "topics":[
            {"key":"positive","size":5300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]},
        {"key":"Cims3","size":6600,
        "topics":[
            {"key":"positive","size":2300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]},
        {"key":"Cims4","size":4600,
        "topics":[
            {"key":"positive","size":2300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]},
        {"key":"Cims5","size":9600,
        "topics":[
            {"key":"positive","size":2300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]},
        {"key":"Cims6","size":9600,
        "topics":[
            {"key":"positive","size":2300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]}],
        [
            {"key":"Cims","size":8600,
        "topics":[
            {"key":"positive","size":12300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]},
        {"key":"Cims2","size":3600,
        "topics":[
            {"key":"positive","size":1300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]},
        {"key":"Cims3","size":6600,
        "topics":[
            {"key":"positive","size":2300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]},
        {"key":"Cims4","size":4600,
        "topics":[
            {"key":"positive","size":2300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]},
        {"key":"Cims5","size":9600,
        "topics":[
            {"key":"positive","size":2300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]},
        {"key":"Cims6","size":9600,
        "topics":[
            {"key":"positive","size":2300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]}
        ],
        [
            {"key":"Cims","size":8600,
        "topics":[
            {"key":"positive","size":12300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]},
        {"key":"Cims2","size":3600,
        "topics":[
            {"key":"positive","size":1300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]},
        {"key":"Cims3","size":6600,
        "topics":[
            {"key":"positive","size":2300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]},
        {"key":"Cims4","size":4600,
        "topics":[
            {"key":"positive","size":2300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]},
        {"key":"Cims5","size":9600,
        "topics":[
            {"key":"positive","size":2300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]},
        {"key":"Cims6","size":9600,
        "topics":[
            {"key":"positive","size":2300},
            {"key":"negative","size":3300},
            {"key":"neutral","size":3100},
        ]}
        ]
      ]
    };
  },
  mounted() {
    var metorScale =  d3.scalePow().domain([10, 400]);
    var pieData = d3.pie()
    .value(function(d) { ; return d.size; }).sort(null);



    var m = 10,
    r = 25,
    z = d3.scaleLinear()
    .domain([10, 100000])
    .range(["brown", "steelblue"]);

    let i = null;



    var block = d3.select("#test")
           .selectAll("div")
           .data(this.data5)
           .enter()
           .append("div")
               .attr("class","pie_row")
               .attr('id', d=> {
                   //console.log(d)
                   i == null ? i = 0 : i++
                   return `pie_row_${i}`
               })
    console.log(block._groups[0])
    block._groups[0].forEach((e, index) => {
        var svg2 = d3.select(`#pie_row_${index}`).selectAll("svg")
        .data(d => {
            console.log(d, 'test');
            return d
        })
        .enter().append("svg")
        .attr("width", 100)
        .attr("height", 100)
        .append("g")
        .attr("transform", d => {
            return "translate(" + 50 + "," + 50 + ")"
        });

        svg2.selectAll("path")
        .data( d => { //console.log(d)
            //console.log(d)
            var pieSize = metorScale(d.size);
            //console.log(pieSize)
            //d.pieSize = pieSize;
            if (d.topics)
                d.topics.map(function (t) { t.pieSize = pieSize; return t; })
            return d.topics ? pieData(d.topics) : []
        })
        .enter().append("path")
        .on("click", this.click)
        .on("mouseover", function(d) {
          console.log(d.data.size)
            div.style('border', (d => {
              console.log(d.data.key);
              if (d.data.key === "positive") {
                  return `2px solid #5CB85C`
              } else if (d.data.key === "negative") {
                  return `2px solid #D9534F`
              } else {
                  return `2px solid #757373`
              }

            })(d))
            div.transition()		
                .duration(200)		
                .style("opacity", .9)
                
            div.html(`${d.data.size} </br> of </br> 4000`)	
                .style("left", (d3.event.layerX + 10) + "px")		
                .style("top", (d3.event.layerY - 20) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        })
        .style('cursor', 'pointer')
        .attr("d", d3.arc()
        .innerRadius(0)
        .outerRadius(d => {
            return d.data.pieSize
        }))
        .style("fill", d => {
        //console.log(d.index);
        console.log(d.data.key)
        if (d.data.key === "positive") {
            return this.sucessColor
        } else if (d.data.key === "negative") {
            return this.dangerColor
        } else {
            return this.colorGray
        }
        });
    })

    var div = d3.select("#test").append("div")	
    .attr("class", "pie-tooltip")				
    .style("opacity", 0);

  },
  created() {

  },
  methods: {
    packChart: function() {
      console.log(this.minYear, this.maxYear)
      return 5
    },
    click: function(d) {
        console.log(d)
    },
    drawChart: function(data) {
      var arcs = d3.pie()
          .sort(null)
          .value( d => d.value )
          (data)
      var block = this.pieG.selectAll(".arc")
        .data(arcs)
      block.select('path').attr('d', this.arc)
      var newBlock = block
        .enter()
        .append("g")
        .classed("arc", true)
      newBlock.append("path")
        .attr("d", this.arc)
        .attr("id", function(d, i) { return "arc-" + i })
        .attr("stroke", "gray")
        .attr("fill", d => {
            //console.log(d.data)
          if (d.data.type === 'positive') {
            return this.sucessColor
          } else if (d.data.type === 'negative') {
            return this.dangerColor
          } else {
            return this.colorGray
          }
        })
      newBlock.append("text")
        .attr("dx", 10)
        .attr("dy", -5)
        .append("textPath")
        .attr("xlink:href", function(d, i) { return "#arc-" + i; })
        .text(function(d) { return d.data.type })
    }
  },
  computed: {
    output() {

      
    }
  }
};

