import {storeaddress} from "./AsyncStorage";
const Translator=async(data)=>{
  const placest=[];
  for (let place of data){
    const requestOptions = {
        method: "POST",
        body:  JSON.stringify({data: place}),
      };
        await fetch(
          `https://api.mymemory.translated.net/get?q=${place}&langpair=en|hi`,
          requestOptions
        ).then(async (response) => {
          response.json().then(async (data2) => {
           console.log("data2",data2.responseData.translatedText);
             const x= data2.responseData.translatedText.split(" ");
             console.log(x[0]);
           placest.push(x[0]);
          });
        })
        .catch(err => console.error(err))
}
console.log("placest",placest);
storeaddress(placest);
}


export {Translator};