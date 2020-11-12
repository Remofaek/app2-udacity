// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// personal API for openweathermap 
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
let apiKey = '&appid=25588e18eb1af8618d452157631880fc';
//  event listener to add function to existing html dom element
document.getElementById('generate').addEventListener('click',e=>{
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeath(baseURL,newZip,apiKey)
    .then(function(data){console.log(data);
        postData('/add',{temperature:data.list[0].main.temperature,date:d,content:feelings})
        updateUI();
    })
});
// function to get API data
const getWeath = async (baseURL,zip,key)=>{
    const res = await fetch(baseURL+zip+key)
    try {
        const data = await res.json();
        return data;
    }catch(error){
        console.log('error',error);
    }
}
// function to post data
const postData = async (url='',data={})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type':'application/json',
        },
        body: JSON.stringify(data)
    });
    try{
        const newDate = await response.json();
        console.log(newDate);
        return newDate;
    }catch(error) {
        console.log('error',error);
    }
}
//  function to get projectData
const updateUI = async ()=> {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('temperature').innerHTML = 'Temperature : ${allData[0].temperature}';
        document.getElementById('date').innerHTML = 'Date : ${allData[0].date}';
        document.getElementById('content').innerHTML = 'I feel : ${allData[0].content}';
    }catch(error){
        console.log('error',error);
    }
}
