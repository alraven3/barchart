import * as d3 from "d3";

//defining the svg's dimensions and inner margins
const width = 500;
const height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 120 };

export const Barplot = ({ data }) => { // creating the Barplot component, which receives a data prop
  //sets up the inner area where the chart will be drawn, within the bounds of the svg's inner margins
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  //extracts the list of countries and the max number of students, for the axes
  const countries = data.map(d => d.country);
  const maxStudents = d3.max(data, d => d.students) ?? 0;
  //using D3's scales to translate data into pixels
  const yScale = d3.scaleBand() //vertical axis
    .domain(countries) //countries list to display
    .range([0, innerHeight]) //available height in pixels
    .padding(0.5); // adding some vertical spacing between bars

  const xScale = d3.scaleLinear() //horizontal axis
    .domain([0, maxStudents]) // highest number of students defines the length of that axis
    .range([0, innerWidth]); 

  return (
    //returning the svg, setting its width and height, and role and aria-label are for accessbility/screenreaders
    <svg width={width} height={height} role="img" aria-label="Horizontal bar chart">
      <g transform={`translate(${margin.left},${margin.top})`}>{/*Crée un groupe (<g>) et le décale vers la droite et le bas selon les marges définies. Tout ce qui est dessiné à l'intérieur aura pour origine (0,0) le coin intérieur gauche, simplifiant les calculs de position. */}
        {data.map(d => { // for each data point, this function computes the position and draws a group with a bar and text
          //calculating the positions
          const baseY = yScale(d.country) ?? 0; //starting position based on scale
          const defaultBand = yScale.bandwidth(); 
          const barHeight = defaultBand * 1.3; // thicker bars by 30%
          const y = baseY - (barHeight - defaultBand) / 2; // center in band
          const barWidth = xScale(d.students);

          return (
            <g key={d.country}>
              <rect //drawing the bars
                x={0}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="#4c78a8"
              />
              <text //showing the value on the right of the bar
                x={barWidth + 5}
                y={y + barHeight / 2}
                dy="0.35em" //centering the text relative to its Y position
                fontSize="14"
                fill="#333"
              >
                {d.students}
              </text>
              <text //showing the label on the left of the bar
                x={-10}
                y={y + barHeight / 2}
                dy="0.35em"
                textAnchor="end"
                fontSize="14"
                fill="#333"
              >
                {d.country}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};