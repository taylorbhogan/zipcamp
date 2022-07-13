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

    // set orgNames into the organizations object for instant lookup later
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

    let apiUrl = "";
    if (organizationId === undefined) {
      apiUrl = `https://ridb.recreation.gov/api/v1/recareas?limit=${resultsPerPage}&state=${stateAbbreviation}&offset=${offset}`;
    } else {
      apiUrl = `https://ridb.recreation.gov/api/v1/organizations/${organizationId}/recareas?limit=${resultsPerPage}&state=${stateAbbreviation}&offset=${offset}`;
    }

    const recGovRes = await fetch(apiUrl, {
      method: "GET",
      headers: {
        apiKey: recreationGovAPIKey,
      },
    });
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

    res.json({ areaArray, totalCount });
  })
);

module.exports = router;
