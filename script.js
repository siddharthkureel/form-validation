window.addEventListener('DOMContentLoaded', () => { // variables remain in closure
    let tiger;
    let emailV,passwordV,colourV,tiger_typeV,animalV=[];
    function validate(element){
        let errorElement;
        let valid;
        //validating email
        if(element==='email'){ 
            errorElement = document.getElementsByTagName('p')[0].classList
            let email = document.getElementById('email').value
            emailV=email
            let regrex = /\S+@\S+\.\S+/;
            valid = regrex.test(email)
        //validating password
        }else if(element==='password'){
            errorElement = document.getElementsByTagName('p')[1].classList
            let password = document.getElementById('password').value
            if(password.length>8){
                passwordV = password
                valid = true
            }else{
                valid = false
            }
        //validating colour
        }else if(element === 'colour'){
            errorElement = document.getElementsByTagName('p')[2].classList
            let colour = document.getElementById('colour').value;
            let colourHTML = document.getElementById('colour').innerHTML;
            colourV=colour
            if((colour==='') || (!colour) || (colourHTML==='Choose colour') ){
                valid = false
            }else{
                valid = true
            }
        //validating animal
        }else if(element === 'animal'){
            errorElement = document.getElementsByTagName('p')[3].classList
            let array = document.querySelectorAll('input[type="checkbox"]') 
            let counter = 0;
            Array.prototype.slice.call(array).some(x => {//nodelist to array list, some is supported in all browser
                if(x.checked){
                    counter++
                    if(x.value==='tiger'){
                        tiger = true
                        validate('tiger') //on checked tiger is true
                    }
                }else if(!x.checked){
                    if(x.value==='tiger'){
                        tiger = false
                        validate('tiger') // on unchecked 
                    }
                }
            });
            if(counter>1){ // animals must more than one
                valid=true
            }else{
                valid = false
            }
        }else if(tiger){ // tiger is true setting tiger type
            errorElement = document.getElementsByTagName('p')[4].classList
            let tiger_type = document.getElementById('tiger_type').value;
            tiger_typeV=tiger_type
            if(tiger_type.length>=1){// tiger type required
                valid =true
            }else{
                valid=false
            }
        }else if(!tiger){
            errorElement = document.getElementsByTagName('p')[4].classList
            valid = true
        }
        if(valid){
            return errorElement.remove('error')
        }else{
            return errorElement.add('error')
        }
    }
    
    function formSubmit(){ //on form submission 
        let els = document.querySelectorAll('p')
        let array = Array.prototype.slice.call(els)
        let formValid = [],dataToSubmit={},animalV=[];
        let animals = Array.prototype.slice.call(document.getElementsByName('animal'))
        animals.forEach(element=>{ //getting animal values
            if(element.checked===true){
               animalV.push(element.value)
            }
        })
        if((!emailV)||(!passwordV)||(!colourV)||(!animalV.length>1)){//validating initial values
            return alert('fill the data in fields');
        }else{
            array.forEach(element => { //checking error class
                if(element.classList.value==='error'){
                    formValid.push(false)
                }else{
                    formValid.push(true)
                }
            });
        }
        if(formValid.every(a=>a===true)){ // form is valid, pushing the data
            dataToSubmit.email=emailV
            dataToSubmit.password=passwordV
            dataToSubmit.colour=colourV
            dataToSubmit.animalV=animalV
            dataToSubmit.tiger_type=tiger_typeV
            return alert(JSON.stringify(dataToSubmit))
        }else{
            return alert('please clear the errors')
        }
    }
    //binding functions with window object
    window.validate = validate.bind(window)
    window.formSubmit = formSubmit.bind(window)
});