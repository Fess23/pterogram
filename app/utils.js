import fs from 'fs'
import path from 'path';

export function convertToHms(ms){
    const days = Math.floor(ms / (24*60*60*1000));
    const daysms = ms % (24*60*60*1000);
    const hours = Math.floor(daysms / (60*60*1000));
    const hoursms = ms % (60*60*1000);
    const minutes = Math.floor(hoursms / (60*1000));
    const minutesms = ms % (60*1000);
    const sec = Math.floor(minutesms / 1000);
    return days + ":" + hours + ":" + minutes + ":" + sec;
}

export function convertToMb(bytes){
    return ((bytes / (1024*1024)).toFixed(2));
}

export function slicePerChunkArray(array, perChunk){
    const slicedArray = [];
    for (let i = 0; i < array.length; i += perChunk) {
        slicedArray.push(array.slice(i, i + perChunk))
    }
    return(slicedArray)
}

export async function getFiles(dir, array){
    fs.readdirSync(dir).map(f => {
        const absl = (path.join(dir, f))
        if(fs.statSync(absl).isDirectory()) return getFiles(absl, array)
        else return array.push(absl);
    })
}


export function toStringObject(name, id){
    var obj = {
        name: name,
        id: id
    }       
    return(JSON.stringify(obj));

}