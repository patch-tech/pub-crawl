import { RestaurantInsights } from "pub-crawl";

interface IBar {
	    Latitude?: number,
	    Longitude?: number,
	    dist?: number,
	}

async function query_by_latlon(lat0: number, lon0: number, lat1: number, lon1: number) {

    console.log("-");
    console.log("query_by_latlon");
    console.log("lat0", lat0);
    console.log("lon0", lon0);
    console.log("lat1", lat1);
    console.log("lon1", lon1);        

    let { locationName,
    categoryTags,
    latitude,
    longitude,
    phoneNumber,
    streetAddress,
    medianSpendPerCustomer,
    openedOn,
    closedOn } = RestaurantInsights.fields;

    
    let query = RestaurantInsights.select(
      categoryTags.as("Category_Tags"),
      locationName.as("Location_Name"),
      latitude.as("Latitude"),
      longitude.as("Longitude"),
      phoneNumber.as("Phone_Number"),
      streetAddress.as("Street_Address"),
      medianSpendPerCustomer.as("Median_Spend"),
	openedOn.as("Opened_On"),
	closedOn.as("Closed_On"),
    )
	.filter(categoryTags
	.like('%Bar or Pub%')
	.and(latitude.gte(lat0))
	.and(latitude.lte(lat1))
	.and(longitude.gte(lon0))
	.and(longitude.lte(lon1)))
	.limit(50);

    let bars = (await query.execute()).values();

    return bars;
}


async function main() {
  let { locationName,
    categoryTags,
    latitude,
    longitude,
    phoneNumber,
    streetAddress,
    medianSpendPerCustomer,
    openedOn,
    closedOn } = RestaurantInsights.fields;

  // let query = RestaurantInsights.select(
  //     categoryTags.as("Category_Tags"),
  //     locationName.as("Location_Name"),
  //     latitude.as("Latitude"),
  //     longitude.as("Longitude"),
  //     phoneNumber.as("Phone_Number"),
  //     streetAddress.as("Street_Address"),
  //     medianSpendPerCustomer.as("Median_Spend"),
  //     openedOn.as("Opened_On"),
  //     closedOn.as("Closed_On"))
  //   .filter(categoryTags.like('%Bar or Pub%'))
  //   .limit(10);

  //   await query.execute().then((data) => console.log(data));

    let lat0 = 40.716110;
    let lon0 = -74.010790;
    let lat1 = 40.755760;
    let lon1 = -73.968979;

    
    function calc_dist(x: IBar) {
	console.log("=========");
	console.log(x.Latitude??0);
	console.log((x.Latitude??0) - lat0);
	console.log(lat1-lat0);

	let dy = Math.abs(((x.Latitude??0) - lat0) / (lat1 - lat0));
	console.log(dy);
	console.log("------");

	console.log(x.Longitude??0);
	console.log(((x.Longitude??0) - lon0));
	console.log(lon1-lon0);
	
	let dx = Math.abs(((x.Longitude??0) - lon0) / (lon1 - lon0));
	console.log(dx);
	
	x.dist = dx + dy;

		console.log("vvvvvv");

	console.log(x.dist);

	return x;
    }

    let lat =  lat0 + ((lat1 - lat0) / 10);
    let lon =  lon0 + ((lon1 - lon0) / 10);    

    //await query.execute().then((data) => console.log(data));
    // let bars =(await query.execute()).values();
    let bars = (await query_by_latlon(lat0, lon0, lat, lon));
    let bars0 = [...bars].map(calc_dist); //.sort((x: IBar) => x.dist);
    bars0.sort((a: IBar, b: IBar) => ((a.dist ?? 0) - (b.dist ?? 0)));
    //bars0.forEach((x: IBar) => console.log(x));
    console.log(bars0.length);
    console.log(bars0[0]);
    console.log(bars0[10]);

}

main().catch(console.error);




// 166 Chambers St, New York, NY 10007
// 40.716110
// -74.010790

// 230 E 51st St, New York, NY 10022
// 40.755760
// -73.968979


