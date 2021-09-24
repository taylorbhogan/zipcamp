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
  const designationId = req.body.designation;
  const stateId = req.body.location;

  let filteredAreas;
  if (designationId && !stateId){
    filteredAreas = await Area.findAll({
      where: { designationId },
      include: State
    })
  }

  if (stateId && !designationId){
    filteredAreas = await Area.findAll({
      where: { stateId },
      include: State
    })
  }

  if (stateId && designationId) {
    filteredAreas = await Area.findAll({
      where: { stateId, designationId },
      include: State
    })
  }

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

module.exports = router;
