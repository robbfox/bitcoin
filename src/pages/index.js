import React from "react";
import { graphql, StaticQuery } from "gatsby";

const BitcoinData = () => (
  <StaticQuery
    query={graphql`
      query {
        allMongodbBitcoinRobbcoin1 {
          edges {
            node {
              id
              time {
                updated
                updatedISO
                updateduk
              }
              disclaimer
              chartName
              bpi {
                USD {
                  code
                  symbol
                  rate
                  description
                  rate_float
                }
                GBP {
                  code
                  symbol
                  rate
                  description
                  rate_float
                }
                EUR {
                  code
                  symbol
                  rate
                  description
                  rate_float
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div style={{ background: "#f0f0f0", padding: "20px" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Robb's Bitcoin Data Page</h1>
        {data.allMongodbBitcoinRobbcoin1.edges.map(({ node }) => (
          <div key={node.id} style={{ fontSize: "20px", marginBottom: "20px" }}>
            <p>Updated: {node.time.updated}</p>
            <p>USD: {node.bpi.USD.rate}</p>
            <p>GBP: {node.bpi.GBP.rate}</p>
            <p>EUR: {node.bpi.EUR.rate}</p>
            <p>Disclaimer: {node.disclaimer}</p>
          </div>
        ))}
      </div>
    )}
  />
);

export default BitcoinData;
