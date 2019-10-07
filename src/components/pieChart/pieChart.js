import * as d3 from "d3";
import {birthData} from './data'

export default {
  props: ["tweetData"],
  data() {
    return {
      sucessColor: '#5CB85C',
      dangerColor: '#D9534F',
      colorGray: '#757373',


      minYear: birthData[0].year,
      maxYear: birthData[birthData.length - 1].year,

      width: 1000,
      height: 200,

      pieWidth: 30,
      pieHeight: 30,

      dataPie: [
        { type: 'positive', value: 2502 },
        { type: 'negative', value: 2005 },
        { type: 'neutral', value: 1968 },
      ],

    };
  },
  mounted() {
    var svg = d3.select('#svg-pie');
    var margin = { top:20, left:30, bottom:30, right:0 };
    var chartWidth = this.pieWidth;
    var chartHeight = this.pieHeight;

    this.chartLayer = svg
      .append('g')
      // .attr(
      //   "transform",
      //   `translate(${margin.left}, ${margin.top})`
      // );
  
    this.arc = d3.arc()
      .outerRadius(50)
      .innerRadius(0)

    this.pieG = this.chartLayer
      .append("g")
      .attr(
        "transform",
        `translate(${chartWidth * 3}, ${chartHeight * 3})`
      )

      this.drawChart(this.dataPie);
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




















/*import * as d3 from "d3";

export default {
  props: ["tweetData"],
  data() {
    return {
      msg: "👋 from the Chart Component",
      height: 400,
      width: 1000
    };
  },
  created() {
    this.colourScale = d3
      .scaleOrdinal()
      .range(["#5EAFC6", "#FE9922", "#93c464", "#75739F"]);
  },
  methods: {
    packChart() {
      const packChart = d3.pack();
      console.log(packChart)
      packChart.size([400, 300]);
      packChart.padding(10);
      const output = packChart(this.packData).descendants();
      return output.map((d, i) => {
        const fill = this.colourScale(d.depth);
        return {
          id: i + 1,
          r: d.r,
          x: d.x,
          y: d.y,
          fill,
          stroke: "grey"
        };
      });
    }
  },
  computed: {
    packData() {
      const nestedTweets = d3
        .nest()
        .key(d => d.user)
        .entries(this.tweetData);
      const packableTweets = { id: "All Tweets", values: nestedTweets };
      return d3
        .hierarchy(packableTweets, d => d.values)
        .sum(d =>
          d.retweets ? d.retweets.length + d.favorites.length + 1 : 1
        );
    },
    output() {
      return this.packChart();
    }
  }
};
*/