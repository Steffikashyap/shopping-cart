export function getProductList() {
  let url = "https://api.myjson.com/bins/qzuzi";
  return (dispatch) => {
    fetch(url)
      .then(res => res.json()).then((response) => {
        dispatch({ type: "FETCH_ITEMS", payload: response });
        const payload = {
          actionName: "DATA_FETCHED",
          status: true
        };
        dispatch({ type: "DATA_FETCHED", payload: payload });

      }).catch((error) => {
        return error;
      });
  }
}
