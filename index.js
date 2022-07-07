import {franc,francAll } from 'franc';
import langs from 'langs';
import colors from 'colors';
const input =process.argv[2];
const langcode =franc(input);
if(langcode==='und'){
    console.log("SORRY COULDNT FIGURE USE MORE WORDS".red);
}
else{
const language=langs.where("3",langcode)
console.log(`Our best guess is${language.name.green}`)
}