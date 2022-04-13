const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { Area, State } = require("../../db/models");
const { recreationGovAPIKey } = require("../../config");

const asyncHandler = require("express-async-handler");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const areas = await Area.findAll({ include: State });

    res.json(areas);
  })
);

router.get(
  "/from-rec-gov/organizations",
  asyncHandler(async (req, res) => {
    const recGovRes = await fetch(
      "https://ridb.recreation.gov/api/v1/organizations?limit=50&offset=0",
      {
        method: "GET",
        headers: {
          apiKey: recreationGovAPIKey,
        },
      }
    );
    const recGovJson = await recGovRes.json();
    const recData = recGovJson["RECDATA"];
    const orgArray = recData.map((org) => ({
      name: org["OrgName"],
      id: org["OrgID"],
    }));

    res.json(orgArray);
  })
);

router.post(
  "/search",
  asyncHandler(async (req, res) => {
    // first get the organizations to add the orgName key
    const organizationsJSON = await fetch(
      "https://ridb.recreation.gov/api/v1/organizations?limit=50&offset=0",
      {
        method: "GET",
        headers: {
          apiKey: recreationGovAPIKey,
        },
      }
    );
    const { RECDATA } = await organizationsJSON.json();

    // set orgNames into the organizations object for instant lookup later; there are likely to be fewer organizations than areas
    const organizations = {};
    RECDATA.forEach((org) => {
      organizations[org.OrgID] = org.OrgName;
    });

    // move on to the main work
    const organizationId = req.body.organization;
    const stateAbbreviation =
      req.body.location === undefined ? "" : req.body.location;
    const resultsPerPage = req.body.resultsPerPage;
    const offset = req.body.offset;

    const recGovRes = await fetch(
      `https://ridb.recreation.gov/api/v1/recareas?limit=${resultsPerPage}&state=${stateAbbreviation}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          apiKey: recreationGovAPIKey,
        },
      }
    );
    const recGovJson = await recGovRes.json();
    const recData = recGovJson["RECDATA"];
    const totalCount = recGovJson.METADATA.RESULTS.TOTAL_COUNT;

    let areaArray = recData.map((area) => ({
      name: area["RecAreaName"],
      id: area["RecAreaID"],
      orgID: area["ParentOrgID"],
      orgName: organizations[area["ParentOrgID"]],
      description: area["RecAreaDescription"],
      longitude: area["RecAreaLongitude"],
      latitude: area["RecAreaLatitude"],
    }));

    // the rec.gov API for /recareas does not offer organization(s) as a parameter.
    // in its current iteration, this API route takes the 50 areas that were returned by the given query and THEN filters on organization.
    // as a result (b/c rec.gov's db isn't organized by organization), as the user pages through results, each result page will feature varying numbers of areas.
    // TODO:
    // implement a more powerful search route.
    // 1. if the API req has an organizationId attached, query the database repeatedly to build our own array of areas
    // 2. filter that array as seen below
    // 3. ∆ totalCount's declaration to let; reassign its value here to the filtered array's length
    // but then, what to send?
    // // the first 25 results, and then page through -- but how? this sounds like cacheing...how to implement?
    if (organizationId) {
      areaArray = areaArray.filter((area) => area.orgID === organizationId);
    }
    res.json({ areaArray, totalCount });
  })
);

module.exports = router;
