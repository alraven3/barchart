import * as d3 from "d3";

const width = 500;
const height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 120 };

export const Barplot = ({ data }) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const countries = data.map(d => d.country);
  const maxStudents = d3.max(data, d => d.students) ?? 0;

  const yScale = d3.scaleBand()
    .domain(countries)
    .range([0, innerHeight])
    .padding(0.5); // more vertical spacing

  const xScale = d3.scaleLinear()
    .domain([0, maxStudents])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height} role="img" aria-label="Horizontal bar chart">
      <g transform={`translate(${margin.left},${margin.top})`}>
        {data.map(d => {
          const baseY = yScale(d.country) ?? 0;
          const defaultBand = yScale.bandwidth();
          const barHeight = defaultBand * 1.3; // thicker bars
          const y = baseY - (barHeight - defaultBand) / 2; // center in band
          const barWidth = xScale(d.students);

          return (
            <g key={d.country}>
              <rect
                x={0}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="#4c78a8"
              />
              <text
                x={barWidth + 5}
                y={y + barHeight / 2}
                dy="0.35em"
                fontSize="14"
                fill="#333"
              >
                {d.students}
              </text>
              <text
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