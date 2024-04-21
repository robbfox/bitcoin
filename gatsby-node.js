const { MongoClient } = require('mongodb');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type BitcoinData {
      _id: String
      time: Time
      disclaimer: String
      chartName: String
      bpi: Bpi
    }

    type Time {
      updated: String
      updatedISO: String
      updateduk: String
    }

    type BpiCurrency {
      code: String
      symbol: String
      rate: String
      description: String
      rate_float: Float
    }

    type Bpi {
      USD: BpiCurrency
      GBP: BpiCurrency
      EUR: BpiCurrency
    }

    type Query {
      bitcoinData: BitcoinData
    }
  `;
  createTypes(typeDefs);
};
