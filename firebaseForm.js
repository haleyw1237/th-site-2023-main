var firebaseConfig = {
    apiKey: "AIzaSyA6J1WW866MmojvZZruIzj3seBa7AQK5K0",
    authDomain: "tigerhacks-22.firebaseapp.com",
    projectId: "tigerhacks-22",
    storageBucket: "tigerhacks-22.appspot.com",
    messagingSenderId: "617289462878",
    appId: "1:617289462878:web:3dcc07af86fb6e6eb2b0cf"
};

// Initialize Firebase
const emailHost = "https://th-22-email.herokuapp.com/sendEmail"
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const collectionRef = db.collection("participants");
const storageref = firebase.storage().ref();

const inPerson = document.getElementById("contestantInPerson");
const diet = document.getElementById("contestantDiet");
const fName = document.getElementById("contestantFName");
const lName = document.getElementById("contestantLName");
const email = document.getElementById("contestantEmail");
const phone = document.getElementById("contestantPhone");
const school = document.getElementById("contestantSchool");
const currentStudyLevel = document.getElementById("contestantStudyLevel") ;
const gender = document.getElementById("contestantGender");
const shirtSize = document.getElementById("contestantShirtSize");  
const major = document.getElementById("contestantMajor");
const mailingAddress = document.getElementById("contestantAddress");  
const dateOfBirth = document.getElementById("contestantBirthDay");
const graduationDate = document.getElementById("contestantGradDate");
const resume = document.getElementById("contestantResume");
const discordCheck = document.getElementById("discord-check");
const termsCheck = document.getElementById("terms-check");
const shareCheck = document.getElementById("share-check");
const emailCheck = document.getElementById("email-check");

const setError = (element, message) => {
    element.classList.add('register-input-error');
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.register-error-message');
    errorDisplay.innerText = message;
}
const setSuccess = (element) => {
    element.classList.remove('register-input-error');
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.register-error-message');
    errorDisplay.innerText = "";
}

// helper functions for validation
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhoneNumber(input_str) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(input_str);
}

function isDateObject(testDate){
    return testDate instanceof Date && !isNaN(testDate);
}

// returns negative if in past positive if in the future
function datePastOrFuture(testDate){
    const currentDate = new Date();
    return testDate.getTime() - currentDate.getTime() ;
}

function birthDayValid(birthDate){
    if(isDateObject(new Date(birthDate))){
        if(datePastOrFuture(new Date(birthDate)) < 0){
            return true;
        }
    }
}
function gradDateValid(gradDate){
    if(isDateObject(new Date(gradDate))){
        if(datePastOrFuture(new Date(gradDate)) > 0){
            return true;
        }
    }
}
async function checkIfParticipantExists(docId){
    console.log("here is the id " + docId)
    if(docId == null || docId == ""){
        return true;
    }else{
        let docRef = collectionRef.doc(docId);
        const participant= await docRef.get();
        if(participant != null && participant.data() != null){
            return true
        }else{
            return false
        }
    }
}
function checkFileSize(fileSize){
    // first change to MB
    var fileInMB = ((fileSize/1024)/1024).toFixed(4);
    if(fileInMB > 5){
        return false
    }else{
        return true
    }
}
function acceptableFileType(typeOfFile){
    const acceptableTypes = ["application/pdf"]
    if(acceptableTypes.indexOf(typeOfFile) != -1){
        return true
    }else{
        return false
    }
}

async function validateInputs(){
    // first check for null in required fields
    let valid = true;
    if(email.value.trim() == ""){
        setError(email,"Email is required");
        valid = false;
    }else if(!isValidEmail(email.value.trim())){
        setError(email,"Provide valid email address");
        valid = false;
    }else {
        const participantExists = await checkIfParticipantExists(email.value.trim());
        if(participantExists == true){
            console.log("participant exists valid should equal false")
            setError(email, "Email already exists");
            valid = false;
        }else{
            setSuccess(email);
        }
    }
    
    if(fName.value.trim() == "" || fName.value == null){
        setError(fName,"First name is required");
        valid = false;
    }else{
        setSuccess(fName)
    }

    if(lName.value.trim() == ""){
        setError(lName,"Last name is required");   
        valid = false;
    }else{
        setSuccess(lName)
    }

    if(phone.value.trim() == ""){
        setError(phone,"Phone number is required")
        valid = false;
    }else if(!validatePhoneNumber(phone.value.trim())){
        setError(phone,"Enter valid phone number")
        valid= false;
    }else{
        setSuccess(phone)
    }

    if(school.value.trim() == ""){
        setError(school,"School is required")
        valid = false;
    }else{
        setSuccess(school);
    }
    if(diet.value.trim() == ""){
        
        setError(diet, "Please Enter Dietary Restriction")
        valid = false;
    }else{
        setSuccess(diet);
    }

    if(inPerson.value.trim() == ""){
        setError(inPerson, "Please Select an Option")
        valid = false;
    }else{
        setSuccess(inPerson);
    }

    if(currentStudyLevel.value.trim() == ""){
        setError(currentStudyLevel,"Current Level of Study is required")
        valid = false;
    }else{
        setSuccess(currentStudyLevel);
    }

    if(major.value.trim() == ""){
        setError(major, "Major is required")
        valid = false;
    }else{
        setSuccess(major);
    }

    if(shirtSize.value.trim() == ""){
        setError(shirtSize, "Shirt size is required")
        valid = false;
    }else{
        setSuccess(shirtSize);
    }

    if(mailingAddress.value.trim() == ""){
        setError(mailingAddress, "Mailing Address is required")
        valid = false;
    }else{
        setSuccess(mailingAddress);
    }
    // check if birthday and grad date are valid
    if(dateOfBirth.value != "" && !birthDayValid(new Date(dateOfBirth.value))){
        setError(dateOfBirth, "Birthday cannot be in the future")
        valid = false;
    }else if(dateOfBirth.value == ""){
        setError(dateOfBirth, "Date of birth is required")
        valid = false;
    } else { 
      setSuccess(dateOfBirth)
    }

    if(graduationDate.value != "" && !gradDateValid(new Date(graduationDate.value))){
        setError(graduationDate, "Graduation Date cannot be in the past");
        valid = false;
    }else{
        setSuccess(graduationDate)
    }
    const mlhError = document.getElementById("mlh-error")
    if(!discordCheck.checked || !termsCheck.checked || !shareCheck.checked){
      valid = false;
      
      mlhError.innerHTML = "**Must confirm first three checkboxes**"
    } else {
    //   valid = true;
      mlhError.innerHTML = ""
    }
    if(resume.files == null || resume.files[0] == null){
        setSuccess(resume);      
    }else if(!acceptableFileType(resume.files[0].type)){
        setError(resume, "Please use PDF");
        valid = false;
    }else if(!checkFileSize(resume.files[0].size)){
        setError(resume, "Please upload a file less than 5MB");
        valid = false;
    }else{
        setSuccess(resume)
        // valid = true;
    }

    return valid;
}

async function addContestant(){
    var validInputs = false;
    validInputs = await validateInputs();
    if(validInputs == true){
        console.log("is valid")
        if(resume !== null && resume.files != null && resume.files[0] != null && resume.files[0].type != null ){
            let metadata = {
                contentType : resume.files.type
            }
            await storageref.child("images/" + email.value + ".pdf").put(resume.files[0], metadata).then((snapshot) => {
                console.log("uploaded")
            })
        }
        await collectionRef.doc(email.value).set({
            fName: fName.value,
            lName: lName.value,
            email: email.value,
            phone: phone.value,
            school: school.value,
            currentStudyLevel: currentStudyLevel.value,
            gender: gender.value,
            shirtSize: shirtSize.value,
            major : major.value,
            dietRestrictions: diet.value,
            mailingAddress: mailingAddress.value,
            dateOfBirth: dateOfBirth.value,
            graduationDate: graduationDate.value,
            inPerson: inPerson.value,
        }).then((docRef) => {
            const successContainer = document.getElementById("success-container");
            const inputContainer = document.getElementById("register-form");
            inputContainer.style.display = "none"
            successContainer.style.display = "flex";
            console.log("success");
        }).catch((error) => {
            alert("Oh No! Error submitting information. Please email us at muengrtigerhacks@missouri.edu!")
        })
        $.post(emailHost,{"email": email.value}, function(data){
            console.log(data)
        })
    }
}
async function getParticipants(){
    await collectionRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        });
    })
}
$(document).ready(function (){
    $.getJSON("schools.json", function(data) {
        var schools = data.schools // this will show the info it in firebug console
        for(var i = 0; i < schools.length; i ++){
            const node = document.createElement("option");
            node.value = schools[i].school;
            //document.getElementById("schools").appendChild(node)
        }
    });
    // $.getCSV("collegeMajors.csv", function(csvFile){
    $.ajax({
        url: "collegeMajors.csv",
        async: false,
        success: function (csvd) {
            let data = $.csv.toArrays(csvd);
            let majorsArray = []
            for(let j =0; j < data.length; j ++){
                const major = document.createElement("option");
                major.value = data[j][1];
                //document.getElementById("majorsList").appendChild(major)
            }
        },
        dataType: "text",
        complete: function () {

            // call a function on complete 
        }
    });
    // })
})


function isPlaying(audelem) { return !audelem.paused; }

function playThemeSong(){
    var myAudio = document.getElementById("myAudio");
    if(isPlaying(myAudio)){
        myAudio.pause()
    }else{
        myAudio.play()
    }
}