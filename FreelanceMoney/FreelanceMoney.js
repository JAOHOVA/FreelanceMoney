function CalculGain() {

    //Vérification de valeur d'entrer dans les inputs
    CheckInputs();
    //On récupère le formulaire dans le html
    let myForm = document.getElementById("formCalculGain");
    //On le transforme en objet FormData
    let formObj = new FormData(myForm);

    //On récupère les inputs de notre formulaire par leurs noms
    let tauxHoraire = formObj.get('TH');
    let tauxJournalier = formObj.get('TJM');
    let extras = formObj.get('Extras');

    let qtetauxHoraire = formObj.get('QteTH');
    let qtetauxJournalier = formObj.get('QteTJM');
    let qteextras = formObj.get('QteExtras');

    let charges = formObj.get('Charges');
    
    //On commence le calcul
    let gainHeure = tauxHoraire * qtetauxHoraire;
   
    let gainJour = tauxJournalier * qtetauxJournalier;

    let gainExtras = extras * qteextras;

    let totalBrut = gainHeure + gainJour + gainExtras;
   
    //totalBrut - charges%
    //chargeADeduire = (totalBrut * (charges/100))
    let chargeADeduire = (totalBrut * (charges/100));
    let totalNet = totalBrut - chargeADeduire;

    document.getElementById("resultatBrut").innerText = totalBrut.toFixed(2)+" €";
    document.getElementById("resultatDifference").innerText = chargeADeduire.toFixed(2)+" €";
    document.getElementById("resultatNet").innerText = totalNet.toFixed(2)+" €";

}

function CheckInputs() {
    let mesInputs = document.querySelectorAll('#formCalculGain input.form-control');

    mesInputs.forEach(monInput => {
        //Vérifier si il vaut 0 ou plus
        if(monInput.value < 0) {
            monInput.value = 0;
        }

        saveElementCookies(monInput);
    });
}

//Pour enregistrer les cookies 
function saveElementCookies(input) {
    document.cookie = input.name+'='+input.value;
}


//pour récupèrer les cookies
function getCookie(input) {
    let mesCookies = document.cookie;
    //TH=1; TJM=2; Extras=3; QteTH=4; QteTJM=5; QteExtras=6; Charges=7

    const name = input.name + '=';
    const tableauCookies = mesCookies.split(';');

    let valeurCookie = null;
    tableauCookies.forEach(cookie => {
        if(cookie.indexOf(name) === 0) {
            //on a chopé le bon cookie
             valeurCookie = cookie.substring(name.length);
             console.log(valeurCookie);
        }
    });
    return valeurCookie;
}

//On a enlevé sur le HTML du bouton onclick
let btn = document.getElementById("buttonValidation");
btn.addEventListener('click', CalculGain);

//Pour faire le calcul en temps reél en cliquant sur le bouton incrémentation ou decré
//Récupèrer tous les inputs
//ça renvoie un tableau
let mesInputs = document.querySelectorAll('#formCalculGain input.form-control');

//Parcourir le tableau avec forEach
mesInputs.forEach(monInput => {
    //Si il a une valeur en cookie, lui donner
    let cookie = getCookie(monInput);

    if(cookie != undefined && cookie != null) {
        monInput.value = cookie;
    }

    monInput.addEventListener('keyup', CalculGain);
    monInput.addEventListener('change', CalculGain);
});
CalculGain();