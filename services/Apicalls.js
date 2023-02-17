let url="https://pxssd9y628.execute-api.ap-south-1.amazonaws.com/prod/";

 const Fetchpostapi=async(endurl,data)=>{
    const requestOptions = {
        method: "POST",
        body:  JSON.stringify(data),
      };
      try {
        const res = await fetch(url + `${endurl}`,requestOptions);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
    }
 const Fetchgetapi=async(endurl)=>{
     
          try {
              const res = await fetch(url + `${endurl}`);
              const data = await res.json();
              return data;
          } catch (err) {
              console.log(err);
          }
    }
export {Fetchgetapi,Fetchpostapi};