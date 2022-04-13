"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Agencies",
      [
        { name: "Bureau of Land Management", id: "126" },
        { name: "Fish and Wildlife Service", id: "127" },
        { name: "National Park Service", id: "128" },
        { name: "Bureau of Reclamation", id: "129" },
        { name: "US Army Corps of Engineers", id: "130" },
        { name: "Tennessee Valley Authority", id: "132" },
        { name: "Department of Transportation", id: "133" },
        { name: "Smithsonian Institution", id: "135" },
        { name: "Department of the Interior", id: "139" },
        { name: "National Register of Historic Places", id: "143" },
        { name: "FEDERAL", id: "157" },
        {
          name: "National Oceanic and Atmospheric Administration",
          id: "137",
        },
        { name: "Smithsonian Institution Affiliations Program", id: "138" },
        { name: "Department of Commerce", id: "161" },
        { name: "Department of Defense", id: "162" },
        { name: "Department of Agriculture", id: "163" },
        { name: "Department of the Treasury", id: "234" },
        { name: "Bureau of Engraving and Printing", id: "236" },
        { name: "Historic Hotels of America", id: "238" },
        { name: "STATE PARKS", id: "240" },
        { name: "United States Geological Survey", id: "5000" },
        { name: "USDA Forest Service", id: "131" },
        { name: "Maryland", id: "241" },
        { name: "Texas", id: "243" },
        { name: "Utah", id: "244" },
        { name: "New Mexico", id: "245" },
        { name: "Virginia", id: "5001" },
        { name: "US Air Force", id: "159" },
        { name: "National Archives and Records Administration", id: "192" },
        { name: "American Battle Monuments Commission", id: "206" },
        { name: "National Historic Landmark", id: "239" },
        { name: "Presidio Trust", id: "250" },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Agencies", null, {});
  },
};
