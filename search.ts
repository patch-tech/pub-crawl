import { RestaurantInsights } from "pub-crawl";

interface IBar {
    Latitude?: number,
    Longitude?: number,
    dist?: number,
}

type Bar = {
	name: string
	Latitude: number,
	Longitude: number,
	phoneNumber: string,
	streetAddress: string,
	medianSpend: number
}

function to_ratio(a: number, b: number, c: number){
    return (b - a) / (c - a);
}

function from_ratio(a: number, r: number, c: number){
    let d = c - a;
    return (d * r) + a;
}


async function query_by_latlon(lat0: number, lon0: number, lat1: number, lon1: number) {

    let min_lat = Math.min(lat0, lat1);
    let min_lon = Math.min(lon0, lon1);
    let max_lat = Math.max(lat0, lat1);
    let max_lon = Math.max(lon0, lon1);

    

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
	closedOn.as("Closed_On"),)
      .filter(categoryTags
	.like('%Bar or Pub%')
	.and(latitude.gte(min_lat))
	.and(latitude.lte(max_lat))
	.and(longitude.gte(min_lon))
	.and(longitude.lte(max_lon))
	.and(closedOn.isNull()))
      .limit(50);

    let bars = (await query.execute()).values();

    return bars;
}


async function main() {

    let xlat0 = 40.716110;
    let xlon0 = -74.010790;
    let xlat1 = 40.755760;
    let xlon1 = -73.968979;
    
    function calc_dist2 (lat0: number, lon0: number, lat1: number, lon1: number) {
	return function (x: IBar) {
	    let dy = Math.abs(((x.Latitude??0) - lat0) / (lat1 - lat0));
	    let dx = Math.abs(((x.Longitude??0) - lon0) / (lon1 - lon0));
	    x.dist = dx + dy;
	    return x;
	};
    }
    
    let lat =  xlat0;
    let lon =  xlon0;

    let n = 5;
    for (let i = 0; i < n; i++) {
	let r0 = i / n;
	let r1 = (i++) / n;

	let lat0 = from_ratio(lat, r0, xlat1);
	let lon0 = from_ratio(lat, r1, lon);
	
	let bars = (await query_by_latlon(lat0, lon0, xlat1, xlon1));
	let dfn = calc_dist2(lat0, lon0, xlat1, xlon1);
	let bars0 = [...bars].map(dfn);
	bars0.sort((a: IBar, b: IBar) => ((a.dist ?? 0) - (b.dist ?? 0)));
	console.log(bars0.length);
	let next_bar = bars0[0];
	console.log(next_bar);

	lat = next_bar.Latitude??0;
	lon = next_bar.Longitude??0;	
    }

    // let bars = (await query_by_latlon(lat0, lon0, lat, lon));
    // let dfn = calc_dist2(lat0, lon0, lat1, lon1);
    // let bars0 = [...bars].map(dfn); //.sort((x: IBar) => x.dist);
    // bars0.sort((a: IBar, b: IBar) => ((a.dist ?? 0) - (b.dist ?? 0)));
    
    // //bars0.forEach((x: IBar) => console.log(x));
    // console.log(bars0.length);
    // console.log(bars0[0]);
    // console.log(bars0[10]);

    

}

main().catch(console.error);




// 166 Chambers St, New York, NY 10007
// 40.716110
// -74.010790

// 230 E 51st St, New York, NY 10022
// 40.755760
// -73.968979


