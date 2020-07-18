const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1= document.querySelector('#message-1');
const message2= document.querySelector('#message-2');
const message3= document.querySelector('#message-3');
const message4= document.querySelector('#message-4');
const message5= document.querySelector('#message-5');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    message1.textContent = 'Loading...';
    message2.textContent = "";
    message3.textContent = "";
    message4.textContent = "";
    message5.textContent = "";
    document.getElementById("myImg").src = ""; 
    fetch('/weather?address='+ search.value)
        .then((response)=>{
            response.json().then(({error,data,location})=>{
                if(error){
                    return message1.textContent = error;
                }
                message1.textContent = location;
                message2.textContent = data.temperature;
                message3.textContent = data.feelslike;
                document.getElementById("myImg").src = data.icon; 
                message4.textContent = data.description;
                message5.textContent = data.date;
            });
        });
});

