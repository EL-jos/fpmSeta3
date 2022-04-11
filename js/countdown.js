function createXMLHttpRequest(){
    var httpRequest  = false;
    if(window.XMLHttpRequest){
        httpRequest = new XMLHttpRequest();

        if(httpRequest.overrideMimeType){
            httpRequest.overrideMimeType('text/xml');
        }
    }else if(window.ActiveXObject){
        try {
            httpRequest = ActiveXObject('Msxml2.XMLHTTP');
        } catch (error) {
            try {
                httpRequest = new ActiveXObject('Microsoft.XMLHTTP')
            } catch (error) {}
        }
    }

    if(!httpRequest){
        alert('Impossible de créer une instance XMLHTTP');
        return false;
    }

    return httpRequest;
}


setInterval(() => {
    const http = createXMLHttpRequest();
    http.onreadystatechange = () => {
        if(http.readyState === 4){
            //let resultat = JSON.parse(http.responseText);
            
            countDown(String(http.responseText));
        }
    }
    http.open("GET","https://ministerelesamisduchrist.com/php/reponse.php", false);
    http.send();

}, 1000);



const jours = document.querySelector('#countDownEtNewletter div.el_box:nth-child(1) h4');
const heures = document.querySelector('#countDownEtNewletter div.el_box:nth-child(2) h4');
const minutes = document.querySelector('#countDownEtNewletter div.el_box:nth-child(3) h4');
const secondes = document.querySelector('#countDownEtNewletter div.el_box:nth-child(4) h4');


const countDown = (start_time) => {
    const countDate = new Date(start_time).getTime();
    const now = Date.now();
    const gap = countDate - now;
    
    if(gap < 0){
        return;
    }else{

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const textDay = Math.floor(gap / day);
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);
        const textSecond = Math.floor((gap % minute) / second);

        jours.textContent = `${textDay}`;
        heures.textContent = `${textHour}`;
        minutes.textContent = `${textMinute}`;
        secondes.textContent = `${textSecond}`;
        
    }
}