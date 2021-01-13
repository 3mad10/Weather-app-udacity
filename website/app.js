/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip="
const apiKey = "&appid=6b9d75bf53ef0e894e66bb619083d92b"
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate)

document.getElementById('generate').addEventListener('click',performAction);

function performAction(){
    zipCode = document.getElementById('zip').value;
    feelings = document.getElementById('feelings').value;
    getWeather(baseUrl,zipCode,apiKey)
    .then(function(weather){
        postData('/addData',{temp : weather.main.temp,
            date: newDate,
            content: feelings})
        }).then(
            updateUI
        )
}


const getWeather = async (baseUrl,city,apiKey)=>{
    const request = await fetch(baseUrl+city+apiKey+"&units=metric");
    try{
        const weather = await request.json();
        return weather;
    }catch(error){
        console.log(error)
    }
}


const postData = async (url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
    })
    try {
        const newData = await response.json();
        console.log(newData);
        return newData
    }catch(error) {
        console.log('error',error);
    }

}



const updateUI = async () => {
    const elemntUpdate = await fetch ('/all')
    try{
        const allData = await elemntUpdate.json()
        console.log('updating')
        document.getElementById('date').innerHTML = `<p><p>Current time ${allData.date}</p>`
        document.getElementById('temp').innerHTML = `<p>Temperature is ${allData.temp}</p>`
        document.getElementById('content').innerHTML = `<p>Temperature is ${allData.feelings}</p>`
    }catch(error){
        console.log("error",error)
    }
}
