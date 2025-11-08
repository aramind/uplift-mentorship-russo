/* PASSPORT MANAGEMENT SYSTEM
     by: Russell Ferrero

check CHANGELOG.txt for changes
*/

//GLOBAL VARIABLES/OBJECTS
let passports = [];
const startYear = 1900, endYear = 2025; 
const months = { //object for validating months
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
  month30: 30,
  month31: 31,
  month28: 28,
  month29: 29
}
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//WRAPPER FUNCTION FOR VALIDATING INPUTS IF NUM 
const numberCheck = (num) => !Number.isNaN(Number(num));


//ASK WRAPPER FUNCTION FOR RL.QUESTION
const ask = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};


//-------------------- VALIDATION/INPUT FUNCTIONS --------------------
const inputName = async () => {
  let firstName, lastName;

    while(true){
      firstName = await ask('First Name: ');

      if(!firstName.trim() || numberCheck(firstName)){
        console.log('Invalid input, please try again!');
        continue;
      }
      
      break;
    };

    while(true){
      lastName = await ask('Last Name: ');

      if(!lastName.trim() || numberCheck(lastName)){
        console.log('Invalid input, please try again!');
        continue;
      }

      break;
    };

  return `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;
}

const validationAge = async () => {
  let age;

  while(true){
    const input = await ask('Age: ');
    const ageNum = parseInt(input);

    if(isNaN(ageNum) || ageNum <= 0){
      console.log('Invalid input, please try again!');
      continue;
    }


    age = ageNum;
    break;
  };

  return age;
}

const inputNationality = async () =>{
  let nationality;

  while(true){
    nationality = await ask('Nationality: ');

    if(!nationality.trim() || numberCheck(nationality)){
      console.log('Invalid input, please try again.');
      continue;
    }

    break;
  };

  return nationality.toUpperCase();
}

const validationGender = async () => {
  let gender; 
  while(true){
    const input = (await ask('Gender (M/F): ')).toLowerCase();
        
    if(input !== 'm' && input !== 'f'){
      console.log('Invalid input, please try again!');
      continue;
    }else{
      gender = input.toUpperCase();
    }
    
    break;
  };

  return gender;
}

const validationDate = async () => {
  let month, day, year;
  console.log('Enter the following input for your Date of Birth.');

  //year first, for leap year logic on februaries
  while(true){ 
    let y = parseInt(await ask('Year (1900-2025): '));

    if(y < startYear || y > endYear){
      console.log('Invalid input, please try again!');
      continue;
    }else{
      year = y;
    }

    break;
  };

  //months
  while(true){
    let m = parseInt(await ask('Month (1-12): '));

    if(m < months.jan || m > months.dec){
      console.log('Invalid input, please try again!');
      continue;
    }else{
      month = m;
    }

    break;
  };

  //days
  while(true){
    //31-day months
    if(month === months.jan || month === months.mar 
    || month === months.may || month === months.jul 
    || month === months.aug || month === months.oct 
    || month === months.dec){ 
      let d = parseInt(await ask('Day (1-31): '));

      if(d <= 0 || d > months.month31){
        console.log('Invalid input, please try again!');
        continue;
      }else{
        day = d;
      }

    //30-day months
    }else if(month === months.apr || month === months.jun 
    || month === months.sep || month === months.nov){ 
      let d = parseInt(await ask('Day (1-30): '));

      if(d <= 0 || d > months.month30){
        console.log('Invalid input, please try again!');
        continue;
      }else{
        day = d;
      }

    //februaries
    }else if(month === months.feb){  
      if((year % 400 === 0) || (year % 4 === 0 && year % 100 !==0)){ //leap year check
        let d = parseInt(await ask('Day (1-29): '));

        if(d <= 0 || d > months.month29){
          console.log('Invalid input, please try again!');
          continue;
        }else{
          day = d;
        }
      }else{
        let d = parseInt(await ask('Day (1-28): '));

        if(d <= 0 || d > months.month28){
          console.log('Invalid input, please try again!');
          continue;
        }else{
          day = d;
        }
      }
    }
    
    break;
  };

  return `${month}/${day}/${year}`;
}

const inputPlace = async () => {
  let city, country;
  console.log('Enter the following input for your Place of Birth.');

  while(true){
    city = (await ask('City: ')).toUpperCase();

    if(!city.trim() || numberCheck(city)){
      console.log('Invalid input, please try again.');
      continue;
    }

    break;
  };

  while(true){
    country = (await ask('Country: ')).toUpperCase();

    if(!country.trim() || numberCheck(country)){
      console.log('Invalid input, please try again.')
      continue;
    }

    break;
  };
    
  return `${city}, ${country}`;
}

const validationPassNum = async () => {
  let passNum;

  while(true){
    let input = (await ask('Enter a 6-digit number for your Passport No.: ')).trim();

    if(input.length !== 6){
      console.log('Invalid input, please try again!');
      continue;
    }else if(passports.find(ownPassports => ownPassports.pPassNum === input)){
      console.log('This passport number already exists! Try another.');
      continue;
    }else{
      passNum = input; 
    }

    return passNum;
  };

  
}

const searchPassport = async () => {
  let passNum, passport;

  while(true){
    const input = (await ask('Enter your 6-digit passport number: ')).trim();
    passport = passports.find(pass => pass.pPassNum === input);

    if(!passport){
      console.log(`Passport doesn't exist! Create one first. `);
      continue;
    }

    return passport;
  };
}



//-------------------- CORE PROGRAM --------------------

//MAIN MENU
const menu = async() => {
    
  while(true){
    console.log(`---PASSPORTS MANAGEMENT SYSTEM--- 
    1. Add new Passport 
    2. Update a Passport 
    3. Delete a Passport 
    4. View my Passport 
    5. View all Passports
    6. Exit\n`);

    let choice = await ask('Input choice: ');
    switch(choice){
      case '1':
        await addPass();
        break;
        
      case '2':
        await updatePass();
        break;
        
      case '3':
        await deletePass();
        break;
        
      case '4':
        await viewOwnPass();
        break;
        
      case '5':
        await viewPass();
        break;
        
      case '6':
        console.log('Thank you for using our services!');
        rl.close();
        return;
            
      default: 
        console.log('Invalid Input. Try again.');
    }

  };

}  


//ADD PASSPORT PROFILE
const addPass = async() => {

  //Properties
  let pName = await inputName();
  let pAge = await validationAge();
  let pNationality = await inputNationality();
  let pGender = await validationGender();
  let pDateOfBirth = await validationDate();
  let pPlaceOfBirth = await inputPlace();
  let pPassNum = await validationPassNum();

  //Object of a Passport Profile
  let ownPassports = {
    pName,
    pAge,
    pNationality,
    pGender,
    pDateOfBirth,
    pPlaceOfBirth,
    pPassNum   
  }

  passports.push(ownPassports);

  console.log('Your passport has been created!');
}


//UPDATE PASSPORT PROFILE
const updatePass = async() => {

  let passport = await searchPassport();
    

  let newName = await inputName();
  let newAge = await validationAge();
  let newNationality = await inputNationality();
  let newGender = await validationGender();
  let newDateOfBirth = await validationDate();
  let newPlaceOfBirth = await inputPlace();
  let newPassNum = await validationPassNum ();

 
  passport.pName = newName;
  passport.pAge = newAge;
  passport.pNationality = newNationality;
  passport.pGender = newGender;
  passport.pDateOfBirth = newDateOfBirth;
  passport.pPlaceOfBirth = newPlaceOfBirth;
  passport.pPassNum = newPassNum; 

  console.log('Your passport profile has been updated!');
}


//DELETE PASSPORT PROFILE
const deletePass = async() => {

  let passport = await searchPassport();

  let deleteChoice;
  do{
    deleteChoice = (await ask('Are you sure you want to delete your profile? (Y/N): ')).toLowerCase();

    if(deleteChoice === 'y'){
      passports = passports.filter(pass => pass !== passport);
      console.log('Your profile has been deleted. ');
      return;
    }else if(deleteChoice === 'n'){
      console.log('Deletion cancelled.');
      return;
    }else{
      console.log('Invalid input! Please try again.');
    }

  }while(deleteChoice !== 'y' && deleteChoice !== 'n');
}


//VIEW OWN PASSPORT
const viewOwnPass = async() => {
    
  let passport = await searchPassport();

  if(!passport){
    console.log(`Your name doesn't exist in our records. Create a passport first!`);
  }else{
    console.table(passport);
  }
}


//VIEW ALL PASSPORTS 
const viewPass = async() => {
  const adminPass = 'upliftcodecamp';
    
  let inputPass = await ask('Enter administrator password to access passport list: ');

  if(inputPass === adminPass){
    console.table(passports);
  }else{
    console.log('Incorrect password. Access denied!');
  }
}


//START OF APP
menu();



