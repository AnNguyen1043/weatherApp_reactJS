import React, {useState,useEffect} from 'react'

const api={
    key:"85bf3e3bcbe44ab6ecb2e0a1f344a853",
    base:"https://api.openweathermap.org/data/2.5/"

};

function App() {
  const [searchInput, setSearchInput]=useState("");
  const [searchCity, setSearchCity]=useState("");
  const [weatherInfo, setWeatherInfo]=useState("");
  const [loading, setLoading]=useState(false);
  const [errorMessage, setErrorMessage]=useState("");

  useEffect(()=>{
    const fetchWeatherData= async ()=>{
      if (!searchCity) return;
      setLoading(true);
      try{
        const url= `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response=await fetch(url);
        const data= await response.json();

        if(response.ok){
          setWeatherInfo(
            `${data.name}, ${data.sys.country} ${data.weather[0].description}, ${data.main.temp} `
          );
          setErrorMessage("");
        }
        else{
          setErrorMessage(data.message);
        }
        
      }
      catch(error){
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();

  },[searchCity]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    setSearchCity(searchInput);
  }


  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="City" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
      <button>Search</button>
    </form>
    {loading ? (<div>loading...</div>) :(
      <>
      {errorMessage ? (<div style={{color:"red"}}>{errorMessage}</div>) : (<div>{weatherInfo}</div>)}
      </>
    )}
    
    </>
  )
}

export default App
