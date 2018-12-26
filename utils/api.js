const apiURL = 'http://api.breadtrip.com';
const apiURL2 = 'http://www.sgmacwx.top';

const wxRequest = (params, url) => {
  wx.request({
    url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    success(res) {
      if (params.success) {
        params.success(res);
      }
    },
    fail(res) {
      if (params.fail) {
        params.fail(res);
      }
    },
    complete(res) {
      if (params.complete) {
        params.complete(res);
      }
    },
  });
};

const getHotTripList = (params) => {
  wxRequest(params, `${apiURL}/v2/index/`);
};
// const getTripInfoByID = (params) => {
//   wxRequest(params, `${apiURL}/trips/${params.query.tripId}/waypoints/`);
// };
const getTripInfoByID = (params) => {
  wxRequest(params, `${apiURL2}/cwx/api.php`); 
};
// const getExplorePlaceList = (params) => {
//   wxRequest(params, `${apiURL}/destination/v3/`);
// };
// const getPlaceInfoByID = (params) => {
//   wxRequest(params, `${apiURL}/destination/place/${params.query.type}/${params.query.id}/`);
// };
// const getPlacePOIByID = (params) => {
//   wxRequest(params, `${apiURL}/destination/place/${params.query.type}/${params.query.id}/pois/${params.query.poiType}/`);
// };

// const getPlaceTripByID = (params) => {
//   wxRequest(params, `${apiURL}/destination/place/${params.query.type}/${params.query.id}/trips/`);
// };
// const getUserInfoByID = (params) => {
//   wxRequest(params, `${apiURL}/users/${params.query.userId}/v2`);
// };
// const getWaypointInfoByID = (params) => {
//   wxRequest(params, `${apiURL}/trips/${params.query.tripId}/waypoints/${params.query.waypointId}/`);
// };
// const getWaypointReplyByID = (params) => {
//   wxRequest(params, `${apiURL}/trips/${params.query.tripId}/waypoints/${params.query.waypointId}/replies/`);
// };

module.exports = {
  getHotTripList,
  getTripInfoByID
  // getExplorePlaceList,
  // getPlaceInfoByID,
  // getPlacePOIByID,
  // getTripInfoByID,
  // getPlaceTripByID,
  // getUserInfoByID,
  // getWaypointInfoByID,
  // getWaypointReplyByID,
};
