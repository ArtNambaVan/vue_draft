import * as d3 from "d3";

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