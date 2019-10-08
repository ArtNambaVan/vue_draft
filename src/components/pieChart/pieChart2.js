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
        [ 1013,   0,  940],
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

      data4: [{"key":"Lombardia","interactions":12600,"unique_authors":9900,"topics":[{"key":"Cars","interactions":12300,"unique_authors":9500},{"key":"Transportation","interactions":3300,"unique_authors":2900},{"key":"Interest","interactions":3100,"unique_authors":2700},{"key":"Company","interactions":1700,"unique_authors":1400},{"key":"City","interactions":1300,"unique_authors":1200}]},{"key":"Lazio","interactions":8400,"unique_authors":6700,"topics":[{"key":"Cars","interactions":8300,"unique_authors":6500},{"key":"Transportation","interactions":2100,"unique_authors":1800},{"key":"Interest","interactions":1800,"unique_authors":1500},{"key":"Company","interactions":1200,"unique_authors":1100},{"key":"City","interactions":800,"unique_authors":700}]},{"key":"Campania","interactions":7300,"unique_authors":5800,"topics":[{"key":"Cars","interactions":7200,"unique_authors":5700},{"key":"Transportation","interactions":2000,"unique_authors":1800},{"key":"Interest","interactions":1800,"unique_authors":1600},{"key":"Company","interactions":900,"unique_authors":800},{"key":"City","interactions":600,"unique_authors":600}]},{"key":"Sicilia","interactions":6600,"unique_authors":4900,"topics":[{"key":"Cars","interactions":6500,"unique_authors":4700},{"key":"Transportation","interactions":1900,"unique_authors":1600},{"key":"Interest","interactions":1700,"unique_authors":1400},{"key":"Company","interactions":900,"unique_authors":800},{"key":"City","interactions":500,"unique_authors":500}]},{"key":"Veneto","interactions":5500,"unique_authors":4200,"topics":[{"key":"Cars","interactions":5300,"unique_authors":4100},{"key":"Transportation","interactions":1500,"unique_authors":1300},{"key":"Interest","interactions":1300,"unique_authors":1200},{"key":"Company","interactions":700,"unique_authors":600},{"key":"City","interactions":400,"unique_authors":300}]},{"key":"Puglia","interactions":5200,"unique_authors":4000,"topics":[{"key":"Cars","interactions":5100,"unique_authors":3900},{"key":"Transportation","interactions":1400,"unique_authors":1200},{"key":"Interest","interactions":1300,"unique_authors":1100},{"key":"Company","interactions":700,"unique_authors":600},{"key":"City","interactions":400,"unique_authors":400}]},{"key":"Piemonte","interactions":4900,"unique_authors":3800,"topics":[{"key":"Cars","interactions":4800,"unique_authors":3700},{"key":"Transportation","interactions":1300,"unique_authors":1100},{"key":"Interest","interactions":1200,"unique_authors":1000},{"key":"Company","interactions":600,"unique_authors":600},{"key":"City","interactions":600,"unique_authors":500}]},{"key":"Emilia-Romagna","interactions":4900,"unique_authors":3700,"topics":[{"key":"Cars","interactions":4700,"unique_authors":3500},{"key":"Transportation","interactions":1200,"unique_authors":1000},{"key":"Interest","interactions":1200,"unique_authors":1000},{"key":"Company","interactions":600,"unique_authors":500},{"key":"City","interactions":400,"unique_authors":400}]},{"key":"Toscana","interactions":3500,"unique_authors":2800,"topics":[{"key":"Cars","interactions":3400,"unique_authors":2700},{"key":"Transportation","interactions":1000,"unique_authors":800},{"key":"Interest","interactions":900,"unique_authors":700},{"key":"Company","interactions":500,"unique_authors":500},{"key":"City","interactions":300,"unique_authors":200}]},{"key":"Sardegna","interactions":2300,"unique_authors":1900,"topics":[{"key":"Cars","interactions":2300,"unique_authors":1800},{"key":"Transportation","interactions":500,"unique_authors":500},{"key":"Interest","interactions":500,"unique_authors":400},{"key":"Company","interactions":300,"unique_authors":200},{"key":"City","interactions":200,"unique_authors":100}]},{"key":"Calabria","interactions":2300,"unique_authors":1800,"topics":[{"key":"Cars","interactions":2200,"unique_authors":1700},{"key":"Transportation","interactions":700,"unique_authors":600},{"key":"Interest","interactions":500,"unique_authors":500},{"key":"Company","interactions":300,"unique_authors":300},{"key":"City","interactions":200,"unique_authors":200}]},{"key":"Liguria","interactions":1600,"unique_authors":1200,"topics":[{"key":"Cars","interactions":1500,"unique_authors":1100},{"key":"Transportation","interactions":400,"unique_authors":300},{"key":"Interest","interactions":300,"unique_authors":200},{"key":"Company","interactions":200,"unique_authors":100},{"key":"City","interactions":100,"unique_authors":100}]},{"key":"Marche","interactions":1500,"unique_authors":1100,"topics":[{"key":"Cars","interactions":1500,"unique_authors":1100},{"key":"Interest","interactions":400,"unique_authors":400},{"key":"Transportation","interactions":400,"unique_authors":400},{"key":"City","interactions":200,"unique_authors":100},{"key":"Company","interactions":100,"unique_authors":100}]},{"key":"Abruzzo","interactions":1500,"unique_authors":1100,"topics":[{"key":"Cars","interactions":1400,"unique_authors":1100},{"key":"Transportation","interactions":400,"unique_authors":300},{"key":"Interest","interactions":400,"unique_authors":300},{"key":"Company","interactions":200,"unique_authors":200},{"key":"City","interactions":100,"unique_authors":100}]},{"key":"Trentino-Alto Adige","interactions":1200,"unique_authors":900,"topics":[]},{"key":"Friuli-Venezia Giulia","interactions":1200,"unique_authors":900,"topics":[]},{"key":"Umbria","interactions":800,"unique_authors":600,"topics":[]},{"key":"Basilicata","interactions":600,"unique_authors":400,"topics":[]},{"key":"Molise","interactions":300,"unique_authors":200,"topics":[]}]
      

    };
  },
  mounted() {
    var metorScale =  d3.scalePow().domain([0, 300]);




    var m = 10,
    r = 25,
    z = d3.scaleLinear()
    .domain([10, 100000])
    .range(["brown", "steelblue"]);



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
      .outerRadius(d => {
        console.log(d);
        var r = 25;
        return r
      }))
    .style("fill", d => {
      //console.log(d.index);
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

