const fs = require('fs')
const recAreas = require('../../db/seeders/RecAreas_API_v1.json')
const { RECDATA } = recAreas
const result = []

// console.log(Object.keys(RECDATA))
// console.log(RECDATA[0])

for (let area of RECDATA){
  const newArea = {
    name: area.RecAreaName,
    stateId: 1,
    designationId: 1,
    agencyId: area.ParentOrgID,
    departmentId: 1,
    acres: null,
    designationDate: null,
    mileage: null,
    description: area.RecAreaDescription
  }
  result.push(newArea)
}

fs.writeFile('./areaSeeds.js', JSON.stringify(result), err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})


// var stream = fs.createWriteStream("./areaSeeds.js");
// stream.once('open', function(fd) {
//   for (let area of RECDATA){
//     const newArea = {
//       name: area.RecAreaName,
//       stateId: 1,
//       designationId: 1,
//       agencyId: area.ParentOrgID,
//       departmentId: 1,
//       acres: null,
//       designationDate: null,
//       mileage: null,
//       description: area.RecAreaDescription
//     }
//     stream.write(newArea)
//   }
//   stream.end();
// });



// write result to file.
// use that file to generate new area seeds

// const obj = {
//   RecAreaID: '10',
//   OrgRecAreaID: '',
//   ParentOrgID: '126',
//   RecAreaName: 'White Mountains National Recreation Area',
//   RecAreaDescription: "Located just an hour's drive from Fairbanks, Alaska, the one-million-acre White Mountains National Recreation Area offers stunning scenery, peaceful solitude, and outstanding opportunities for year-round recreation. \r\n" +
//     '\r\n' +
//     "Summer visitors to the White Mountains pan for gold, fish, hike and camp under Alaska's 'midnight sun.' The Nome Creek Road provides access to two campgrounds, trails, a gold-panning area and a departure point for float trips on Beaver Creek National Wild River. In winter, visitors travel by ski, snowshoe, dog team and snowmobile to enjoy the 12 public-use cabins and 250 miles of groomed trails that make the White Mountains one of Interior Alaska's premier winter destinations.",
//   RecAreaFeeDescription: '',
//   RecAreaDirections: 'Begin your trip at the BLM office or the Alaska Public Lands Information Center (an interagency office) in Fairbanks, where you can obtain detailed directions, as well as the latest information on trail and weather conditions.  Most summer hiking occurs along the Summit Trail at mile 28, Elliott Highway.  Other hiking trails, along with campgrounds and gold-panning areas, may be found at Nome Creek, accessible from the U.S. Creek Rd., mile 57, Steese Highway. Winter access is at mile 28 and mile 57, Elliott Highway, and at McKay Creek, mile 42, Steese Highway. BLM has also developed a new winter access point at U.S. Creek, mile 57, Steese Highway.',
//   RecAreaPhone: '800-437-7021 or 907-474-2200',
//   RecAreaEmail: 'EasternInterior@blm.gov',
//   RecAreaReservationURL: ' https://www.recreation.gov/camping/white-mountains-national-recreation-area--alaska-cabins/r/campgroundDetails.do?contractCode=NRSO&parkId=146090',
//   RecAreaMapURL: 'https://www.blm.gov/maps',
//   GEOJSON: { TYPE: 'Point', COORDINATES: [ -147.214, 65.546 ] },
//   RecAreaLongitude: -147.214,
//   RecAreaLatitude: 65.546,
//   StayLimit: '10 days',
//   Keywords: 'White Mountains, ',
//   Reservable: false,
//   Enabled: true,
//   LastUpdatedDate: '2021-09-23'
// }
