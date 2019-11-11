import en from './en';

let zh = {};
Object.keys(en).forEach(key=>{
    zh[key] = key;
});

const lang = {
    zh:zh,
    en: en
};
export default lang;