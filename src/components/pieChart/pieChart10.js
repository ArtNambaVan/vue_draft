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

      positionX: 0,
      positionY: 0,

      pieWidth: 70,
      pieHeight: 70,

      maxRad: 35,

      index: null,
      data5: [
        [{"key":"Cims1","size": 100,
        "topics":[
            {"key":"positive","size": 70},
            {"key":"negative","size": 20},
            {"key":"neutral","size": 10},
        ]},
        {"key":"Cims2","size":150,
        "topics":[
            {"key":"positive","size":30},
            {"key":"negative","size":20},
            {"key":"neutral","size":100},
        ]},
        {"key":"Cims3","size":40,
        "topics":[
            {"key":"positive","size":10},
            {"key":"negative","size":20},
            {"key":"neutral","size":10},
        ]},
        {"key":"Cims4","size":76,
        "topics":[
            {"key":"positive","size":16},
            {"key":"negative","size":0},
            {"key":"neutral","size":60},
        ]},
        {"key":"Cims5","size":96,
        "topics":[
            {"key":"positive","size":23},
            {"key":"negative","size":33},
            {"key":"neutral","size":40},
        ]},
        {"key":"Cims6","size":123,
        "topics":[
            {"key":"positive","size":23},
            {"key":"negative","size":50},
            {"key":"neutral","size":50},
        ]}],

        [{"key":"Cims1","size": 60,
        "topics":[
            {"key":"positive","size": 10},
            {"key":"negative","size": 20},
            {"key":"neutral","size": 30},
        ]},
        {"key":"Cims2","size":120,
        "topics":[
            {"key":"positive","size":10},
            {"key":"negative","size":20},
            {"key":"neutral","size":90},
        ]},
        {"key":"Cims3","size":80,
        "topics":[
            {"key":"positive","size":50},
            {"key":"negative","size":20},
            {"key":"neutral","size":10},
        ]},
        {"key":"Cims4","size":96,
        "topics":[
            {"key":"positive","size":16},
            {"key":"negative","size":20},
            {"key":"neutral","size":60},
        ]},
        {"key":"Cims5","size":106,
        "topics":[
            {"key":"positive","size":33},
            {"key":"negative","size":33},
            {"key":"neutral","size":40},
        ]},
        {"key":"Cims6","size":113,
        "topics":[
            {"key":"positive","size":13},
            {"key":"negative","size":50},
            {"key":"neutral","size":50},
        ]}],

        [{"key":"Cims1","size": 100,
        "topics":[
            {"key":"positive","size": 70},
            {"key":"negative","size": 20},
            {"key":"neutral","size": 10},
        ]},
        {"key":"Cims2","size":150,
        "topics":[
            {"key":"positive","size":30},
            {"key":"negative","size":20},
            {"key":"neutral","size":100},
        ]},
        {"key":"Cims3","size":40,
        "topics":[
            {"key":"positive","size":10},
            {"key":"negative","size":20},
            {"key":"neutral","size":10},
        ]},
        {"key":"Cims4","size":76,
        "topics":[
            {"key":"positive","size":16},
            {"key":"negative","size":0},
            {"key":"neutral","size":60},
        ]},
        {"key":"Cims5","size":96,
        "topics":[
            {"key":"positive","size":23},
            {"key":"negative","size":33},
            {"key":"neutral","size":40},
        ]},
        {"key":"Cims6","size":123,
        "topics":[
            {"key":"positive","size":23},
            {"key":"negative","size":50},
            {"key":"neutral","size":50},
        ]}],
        
        [{"key":"Cims1","size": 60,
        "topics":[
            {"key":"positive","size": 10},
            {"key":"negative","size": 20},
            {"key":"neutral","size": 30},
        ]},
        {"key":"Cims2","size":120,
        "topics":[
            {"key":"positive","size":10},
            {"key":"negative","size":20},
            {"key":"neutral","size":90},
        ]},
        {"key":"Cims3","size":80,
        "topics":[
            {"key":"positive","size":50},
            {"key":"negative","size":20},
            {"key":"neutral","size":10},
        ]},
        {"key":"Cims4","size":96,
        "topics":[
            {"key":"positive","size":16},
            {"key":"negative","size":20},
            {"key":"neutral","size":60},
        ]},
        {"key":"Cims5","size":106,
        "topics":[
            {"key":"positive","size":33},
            {"key":"negative","size":33},
            {"key":"neutral","size":40},
        ]},
        {"key":"Cims6","size":113,
        "topics":[
            {"key":"positive","size":13},
            {"key":"negative","size":50},
            {"key":"neutral","size":50},
        ]}],
        
        [{"key":"Cims1","size": 60,
        "topics":[
            {"key":"positive","size": 10},
            {"key":"negative","size": 20},
            {"key":"neutral","size": 30},
        ]},
        {"key":"Cims2","size":120,
        "topics":[
            {"key":"positive","size":10},
            {"key":"negative","size":20},
            {"key":"neutral","size":90},
        ]},
        {"key":"Cims3","size":80,
        "topics":[
            {"key":"positive","size":50},
            {"key":"negative","size":20},
            {"key":"neutral","size":10},
        ]},
        {"key":"Cims4","size":96,
        "topics":[
            {"key":"positive","size":16},
            {"key":"negative","size":20},
            {"key":"neutral","size":60},
        ]},
        {"key":"Cims5","size":106,
        "topics":[
            {"key":"positive","size":33},
            {"key":"negative","size":33},
            {"key":"neutral","size":40},
        ]},
        {"key":"Cims6","size":113,
        "topics":[
            {"key":"positive","size":13},
            {"key":"negative","size":50},
            {"key":"neutral","size":50},
        ]}],
      ]
    };
  },
  mounted() {
      let arr = [];
      this.data5.forEach((e,i) => {
          console.log(e,i)
          e.forEach((e, i) => {
            arr.push(e)
          }) 
      })
      console.log(arr)
    this.renderPies(this.data5)

  },
  created() {

  },
  methods: {
    renderPies: function(data) {
        //var metorScale =  d3.scalePow().domain([1, 4.5]);
        var metorScale =  d3.scaleLinear().domain([0, 200]).range([1, 40]);
        var pieData = d3.pie()
        .value(function(d) { ; return d.size; }).sort(null);

        const block = d3.select("#test")
                .selectAll("div")
                .data(data)
                .enter()
                .append("div")
                    .attr("class","pie_row")
                    .attr('id', d => {
                        this.index == null ? this.index = 0 : this.index++
                        return `pie_row_${this.index}`
                    })

        block._groups[0].forEach((e, index) => {
            let svg = d3.select(`#pie_row_${index}`).selectAll("svg")
            .data(d => {
                return d
            })
            .enter().append("svg")
            .attr("width", this.pieWidth)
            .attr("height", this.pieHeight)
            .append("g")
            .attr("transform", d => {
                return `translate(${this.pieWidth / 2}, ${this.pieHeight / 2 })`
            });

            svg.selectAll("path")
            .data( d => {
                var pieSize = metorScale(d.size);
                if (d.topics)
                    d.topics.map((t) => {
                        t.total = d.size;
                        t.pieSize = pieSize; 
                        return t; 
                    })
                return d.topics ? pieData(d.topics) : []
            })
            .enter().append("path")
            .on("click", this.click)
            .on("mouseover", function(d) {
                div.attr('class', (d => {
                    console.log(d.data);
                    if (d.data.key === "positive") {
                        return 'pie-tooltip pie-tooltip--success'
                    } else if (d.data.key === "negative") {
                        return 'pie-tooltip pie-tooltip--danger'
                    } else {
                        return 'pie-tooltip pie-tooltip--default'
                    }
                })(d))
                div.transition()		
                    .duration(200)		
                    .style("opacity", .9);

                div.html(`${d.data.key}: ${d.data.size} </br> of </br> ${d.data.total}`)	
                    .style("left", (d3.event.layerX + 10) + "px")
                    .style("top", (d3.event.layerY - 20) + "px");
                })					
            .on("mouseout", d => {		
                div.transition()		
                    .duration(500)		
                    .style("opacity", 0);	
            })
            .style('cursor', 'pointer')
            .attr("d", d3.arc()
            .innerRadius(d => {
                
                return d.data.pieSize > 20 ?  (d.data.pieSize - 8 ) : (d.data.pieSize - 4 )
                return 0
            })
            .outerRadius(d => {

                //return 34
                return d.data.pieSize
            }))
            .style("fill", d => {
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

