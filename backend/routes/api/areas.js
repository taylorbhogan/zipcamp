const express = require('express')
const router = express.Router();
const fetch = require('node-fetch');
const { Area, State } = require('../../db/models')
const { recreationGovAPIKey } = require('../../config')

const asyncHandler = require('express-async-handler');


router.get('/', asyncHandler(async (req, res) => {
  const areas = await Area.findAll({include: State});
  res.json(areas);
}))

router.post('/search', asyncHandler(async function (req, res) {
  // when only one is selected, the other will come in undefined


  const designationId = req.body.organization;
  const stateId = req.body.location;
  console.log(req.body);

  // const designationId = designations[organizationId]

  let filteredAreas;
  if (designationId && !stateId){
    console.log('case a');
    filteredAreas = await Area.findAll({
      where: { designationId },
      include: State
    })
  }

  if (stateId && !designationId){
    console.log('case b');
    filteredAreas = await Area.findAll({
      where: { stateId },
      include: State
    })
  }

  if (stateId && designationId) {
    console.log('case c');
    filteredAreas = await Area.findAll({
      where: { stateId, designationId },
      include: State
    })
  }
  console.log('--------look here----------->',filteredAreas);
  res.json(filteredAreas)
}))

router.get('/from-rec-gov/organizations', asyncHandler(async (req, res) => {

  const recGovRes = await fetch('https://ridb.recreation.gov/api/v1/organizations?limit=50&offset=0', {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
      'apiKey': recreationGovAPIKey
    }
  })
    const recGovJson = await recGovRes.json();
    const recData = recGovJson['RECDATA']
    const orgArray = recData.map(org => (
      {
        'name': org['OrgName'],
        'id': org['OrgID']
      }
    )
      )

    // const orgCount = recGovJson['METADATA']['RESULTS']['CURRENT_COUNT']


    res.json(orgArray)

}))

router.post('/from-rec-gov/area-search', asyncHandler(async (req, res) => {
console.log('inside backend');
  const organizationId = req.body.organization;
  const stateAbbreviation = req.body.location;
  console.log(req.body);

  const recGovRes = await fetch(`https://ridb.recreation.gov/api/v1/recareas?limit=50&offset=0&state=${stateAbbreviation}`, {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
      'apiKey': recreationGovAPIKey
    }
  })
    const recGovJson = await recGovRes.json();
    const recData = recGovJson['RECDATA']


    let areaArray = recData.map(area => (
      {
        'name': area['RecAreaName'],
        'id': area['RecAreaID'],
        'orgID': area['ParentOrgID'],
        'description': area['RecAreaDescription'],
        'longitude': area['RecAreaLongitude'],
        'latitude': area['RecAreaLatitude'],
      }
    ))

    // NOT SURE IF THE BELOW WILL DO WHAT WE WANT
    if (organizationId){
      areaArray = areaArray.filter(area => area.orgID === organizationId)
    }

    // const orgCount = recGovJson['METADATA']['RESULTS']['CURRENT_COUNT']
    console.log(areaArray);
    res.json(areaArray)
}))

module.exports = router;
