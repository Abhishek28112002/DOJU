import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import Geocoder from 'react-native-geocoding';
import { Alert} from 'react-native';
import { DetectLanguage, Translator } from "./Translator";
import {storeaddress} from "./AsyncStorage";
import axios from 'axios';
import { set } from "react-hook-form";
const FetchLocation= async()=>{
           let response= await Location.requestForegroundPermissionsAsync();
          console.log(response.granted)
          if(!response.granted)
          {
            Alert.alert("Allow Location to this app, Permisson Denied!");
            console.log("permisson Denied");
            return ;
          }
          let currentlocation=await Location.getCurrentPositionAsync()
          console.log("location",currentlocation.coords);
          let myLat= currentlocation.coords.latitude;
        let myLon= currentlocation.coords.longitude;
    let varlatlon=[{"lat":0.012,"lon":-0.053},{"lat":-0.022,"lon":-0.0221},{"lat":0.025,"lon":-0.05},{"lat":-0.105,"lon":-0.031},{"lat":-0.07315,"lon":-0.06405},{"lat":-0.04431,"lon":-0.032}];
    varlatlon.forEach(element => {
      element.lat=myLat+element.lat;
      element.lon=myLon+element.lon;
    });
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '90db724b6fmshcc3c744693c62e8p1ff254jsn133c1cc0800d',
		'X-RapidAPI-Host': 'geocoding-by-api-ninjas.p.rapidapi.com'
	}
};
let places=[];
for (const element of varlatlon){
 await fetch(`https://geocoding-by-api-ninjas.p.rapidapi.com/v1/reversegeocoding?lat=${element.lat}&lon=${element.lon}`, options)
	.then(response => response.json())
	.then(response => 
    {console.log("data",response[0].name)
    if(response[0].name)
     places.push(response[0].name)
    })
	.catch(err => console.error(err));
}
for (let i=0;i<places.length;i++)
{
  for(let j=i+1;j<places[i].length;j++)
  {
    if(places[i]==places[j])
    places.splice(j,j+1);
  }
}
 console.log("places",places);
Translator(places);
      //   await fetch(
        //     'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        //       41.89 +
        //       ',' +
        //       12.49 +
        //       '&key=' +
        //       'AIzaSyCdwMHCCExrqDRitksaxBP-eyz3EDaNcew'
        //   )
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //       console.log(
        //         'ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson)
        //       );
        //     })
        //     .catch((error) => console.log(error));
           // const translate=await Translator(text);
            //   console.log("text",translate);
//             //   text=translate;
//    Geocoder.init("AIzaSyCdwMHCCExrqDRitksaxBP-eyz3EDaNcew");

//  await Geocoder.from(myLat,myLon)
//         .then(async json => {
//           let formatted_address = json.results[0].formatted_address;
//           console.log("formate_address",formatted_address);
//           const address_t=await Translator(formatted_address);
//           address_t=JSON.parse(address_t);
//           console.log("address_t",address_t);
//           const address=JSON.stringify(address_t.data.TranslatedText);
//           console.log(address_t);
//           storeaddress(JSON.stringify(address));
//         })
//         .catch(error => console.warn(error));
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'ff5a7f9bd2msh71c0dc45e84df70p17ed03jsn5194e32bbe9e',
// 		'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
// 	}
// };
// fetch(`https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=${myLat}&lon=${myLon}&accept-language=hi&polygon_threshold=0.0`, options)
// 	.then(response => response.json())
// 	.then(async response =>{
//     console.log(response) 
    
//     let address;
//    if(response.address.city)
//     Translator(response.address.city)
//    else
//    Translator(response.address.state_district);
//   }
//     )
// 	.catch(err =>{ console.error(err);
//     Alert.alert("There is some error while fetching your location");
//   }
//     );
        } 
       
export default FetchLocation;