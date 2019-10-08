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

      data4: [
        {"key":"Lombardia","interactions":8600,"unique_authors":9900,
        "topics":[
            {"key":"positive","interactions":12300,"unique_authors":9500},
            {"key":"negative","interactions":3300,"unique_authors":2900},
            {"key":"neutral","interactions":3100,"unique_authors":2700},
        ]},
        {"key":"Lombardia","interactions":3600,"unique_authors":9900,
        "topics":[
            {"key":"positive","interactions":1300,"unique_authors":9500},
            {"key":"negative","interactions":3300,"unique_authors":2900},
            {"key":"neutral","interactions":3100,"unique_authors":2700},
        ]},
        {"key":"Lombardia","interactions":6600,"unique_authors":9900,
        "topics":[
            {"key":"positive","interactions":2300,"unique_authors":9500},
            {"key":"negative","interactions":3300,"unique_authors":2900},
            {"key":"neutral","interactions":3100,"unique_authors":2700},
        ]},
        {"key":"Lombardia","interactions":4600,"unique_authors":9900,
        "topics":[
            {"key":"positive","interactions":2300,"unique_authors":9500},
            {"key":"negative","interactions":3300,"unique_authors":2900},
            {"key":"neutral","interactions":3100,"unique_authors":2700},
        ]},
        {"key":"Lombardia","interactions":9600,"unique_authors":9900,
        "topics":[
            {"key":"positive","interactions":2300,"unique_authors":9500},
            {"key":"negative","interactions":3300,"unique_authors":2900},
            {"key":"neutral","interactions":3100,"unique_authors":2700},
        ]}
      ]
    };
  },
  mounted() {
    var metorScale =  d3.scalePow().domain([0, 300]);




    var m = 10,
    r = 25,
    z = d3.scaleLinear()
    .domain([10, 100000])
    .range(["brown", "steelblue"]);

    var svg = d3.select("#test").append("svg")
    .attr("width", this.width)
    .attr("height", this.height)

    var g = svg.selectAll("g")
    .data(this.data4)
    .enter().append("g")
    .attr("width", (r + m) * 2)
    .attr("height", (r + m) * 2)
    // .append("svg")
    .attr("transform", d => {
        this.positionX += 70;
        return "translate(" + (this.positionX) + "," + (r + m) + ")"
    });

    var pieData = d3.pie()
          .value(function(d) { ; return d.interactions; });

    g.selectAll("path")
    .data( d => { //console.log(d)
        //console.log(d)
        var pieSize = metorScale(d.interactions);
        //console.log(pieSize)
        //d.pieSize = pieSize;
         if (d.topics)
             d.topics.map(function (t) { t.pieSize = pieSize; return t; })
        return d.topics ? pieData(d.topics) : []
    })
    .enter().append("path")
    .attr("d", d3.arc()
      .innerRadius(0)
      .outerRadius(d => {
        console.log(d.data.pieSize);
        
        var r = 25;
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

