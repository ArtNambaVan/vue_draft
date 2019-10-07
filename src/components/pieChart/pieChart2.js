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

      dataPie: [
        { type: 'positive', value: 2502 },
        { type: 'negative', value: 2005 },
        { type: 'neutral', value: 1968 },
      ],

      dataPie2: [
        [11975,  5871, 8916],
        [ 1951, 10048, 2060],
        [ 8010, 16145, 8090],
        [ 1013,   990,  940],
        [ 1013,   990,  940],
        [ 1013,   990,  940],
        [ 1013,   990,  940],
        [ 1013,   990,  940],
      ],

      dataPie3: [
        [{ type: 'positive', value: 11975}, { type: 'negative', value: 5871 }, { type: 'neutral', value: 5871 }],
        [{ type: 'positive', value: 1951}, { type: 'negative', value: 10048 }, { type: 'neutral', value: 5871 }],
        [{ type: 'positive', value: 8010}, { type: 'negative', value: 16145 }, { type: 'neutral', value: 5871 }],
        [{ type: 'positive', value: 1013}, { type: 'negative', value: 990 },  { type: 'neutral', value: 5871 }],
        [{ type: 'positive', value: 1013}, { type: 'negative', value: 990 },  { type: 'neutral', value: 5871 }],
        [{ type: 'positive', value: 1013}, { type: 'negative', value: 990 },  { type: 'neutral', value: 5871 }],
        [{ type: 'positive', value: 1013}, { type: 'negative', value: 990 },  { type: 'neutral', value: 5871 }],
        [{ type: 'positive', value: 1013}, { type: 'negative', value: 990 },  { type: 'neutral', value: 5871 }]
      ],
      

    };
  },
  mounted() {
    var m = 10,
    r = 25,
    z = d3.scaleLinear()
    .domain([10, 100000])
    .range(["brown", "steelblue"]);

    console.log(d3)

    var svg = d3.select("#test").selectAll("svg")
    .data(this.dataPie2)
    .enter().append("svg")
    .attr("width", (r + m) * 2)
    .attr("height", (r + m) * 2)
    .append("g")
    .attr("transform", "translate(" + (r + m) + "," + (r + m) + ")");

    svg.selectAll("path")
    .data(d3.pie().sort(null))
    .enter().append("path")
    .attr("d", d3.arc()
      .innerRadius(0)
      .outerRadius(r))
    .style("fill", d => {
      console.log(d.index);
      if (d.index === 0) {
        return this.sucessColor
      } else if (d.index === 1) {
        return this.dangerColor
      } else {
        return this.colorGray
      }
      return 'green'
    });
  },
  created() {

  },
  methods: {
    packChart: function() {
      console.log(this.minYear, this.maxYear)
      return 5
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

