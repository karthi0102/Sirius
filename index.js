const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    const salt= await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw,salt);
    console.log(salt);
    console.log(hash);
}
const login = async (pw,hash) => {
    const result = await bcrypt.compare(pw,hash);
    if(result){
        console.log("Login successfully");
    }else{
        console.log("ERROR")
    }
}
login('monkey','$2b$12$M5rV2Oiy3Sf7DQlyA313c..EZcyOlaDWOrfT4E8JTJZRnSEGnZ2XC');