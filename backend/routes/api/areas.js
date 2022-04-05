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

router.post(
  "/search",
  asyncHandler(async function (req, res) {
    const designationId = req.body.organization;
    const stateId = req.body.location;

    let filteredAreas;
    if (designationId && !stateId) {
      filteredAreas = await Area.findAll({
        where: { designationId },
        include: State,
      });
    }

    if (stateId && !designationId) {
      filteredAreas = await Area.findAll({
        where: { stateId },
        include: State,
      });
    }

    if (stateId && designationId) {
      filteredAreas = await Area.findAll({
        where: { stateId, designationId },
        include: State,
      });
    }
    res.json(filteredAreas);
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
  "/from-rec-gov/area-search",
  asyncHandler(async (req, res) => {
    const organizationId = req.body.organization;
    const stateAbbreviation = req.body.location;

    const recGovRes = await fetch(
      `https://ridb.recreation.gov/api/v1/recareas?limit=50&offset=0${stateAbbreviation !== undefined && `&state=${stateAbbreviation}`}`,
      {
        method: "GET",
        headers: {
          apiKey: recreationGovAPIKey,
        },
      }
    );
    const recGovJson = await recGovRes.json();
    const recData = recGovJson["RECDATA"];

    let areaArray = recData.map((area) => ({
      name: area["RecAreaName"],
      id: area["RecAreaID"],
      orgID: area["ParentOrgID"],
      description: area["RecAreaDescription"],
      longitude: area["RecAreaLongitude"],
      latitude: area["RecAreaLatitude"],
    }));

    if (organizationId) {
      areaArray = areaArray.filter((area) => area.orgID === organizationId);
    }

    res.json(areaArray);
  })
);

module.exports = router;
