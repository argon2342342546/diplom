import * as d3 from "d3";
import { useEffect, useRef } from "react";

export function Graph({ data, header }) {
  let i = 0;

  const ref = useRef();

  useEffect(() => {
    if (i === 0) {
      const margin = { top: 10, right: 30, bottom: 30, left: 100 },
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const nodes = [],
        links = [];

      for (let i = 0; i < data.length; i++) {
        nodes.push({
          id: i,
          name: i,
          label: i + 1,
        });
        for (let j = 0; j < data[i].length; j++) {
          if (i != j && data[i][j] != 0) {
            links.push({
              source: i,
              target: j,
            });
          }
        }
      }

      const dataSource = {
        nodes,
        links,
      };

      console.log(header);
      console.log(dataSource);

      // Initialize the links
      const link = svg
        .selectAll("line")
        .data(dataSource.links)
        .join("line")
        .style("stroke", "#aaa");

      // Initialize the nodes
      const node = svg
        .selectAll("circle")
        .data(dataSource.nodes)
        .join("circle")
        .attr("r", 10)
        .style("fill", "#69b3a2");

      // Let's list the force we wanna apply on the network
      const simulation = d3
        .forceSimulation(dataSource.nodes) // Force algorithm is applied to data.nodes
        .force(
          "link",
          d3
            .forceLink() // This force provides links between nodes
            .id(function (d) {
              return d.id;
            })
            // This provide  the id of a node
            .links(dataSource.links) // and this the list of links
        )
        .force("charge", d3.forceManyBody().strength(-150)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
        .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
        .on("end", ticked);

      // This function is run at each iteration of the force algorithm, updating the nodes position.
      function ticked() {
        var text = svg
          .selectAll("text")
          .data(dataSource.nodes)
          .enter()
          .append("text");

        var textLabels = text
          .attr("x", function (d) {
            return d.x - 2.5;
          })
          .attr("y", function (d) {
            return d.y + 2.5;
          })
          .text(function (d) {
            return d.label;
          })
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .attr("fill", "black");
        link
          .attr("x1", function (d) {
            return d.source.x;
          })
          .attr("y1", function (d) {
            return d.source.y;
          })
          .attr("x2", function (d) {
            return d.target.x;
          })
          .attr("y2", function (d) {
            return d.target.y;
          });

        node
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          });
      }
      i++;
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      {header}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          padding: "16px",
        }}
        ref={ref}
      ></div>
    </div>
  );
}
