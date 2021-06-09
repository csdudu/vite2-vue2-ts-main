import { isObjectNull, isStringNull } from "./EmptyUtil";

export function formatNullStr(str) {
    if (isObjectNull(str))
        return "";
    return str;
}

export function getFilenameFromPath(str) {

    if (isObjectNull(str))
        return "";
    let pos = str.lastIndexOf("\/");
    return str.substring(pos + 1);
}

/**
 * 获取0-code位置的str
 */
export function getStartStrWith(str, code) {
    if (isObjectNull(str))
        return "";
    let pos = str.lastIndexOf(code);
    if(pos<0)
        return str;
    return str.substring(0,pos);
}

export function getBase64StrFromImg(file)
{
    if (isObjectNull(file)||isStringNull(file.content))
        return "";
    let pos = file.content.indexOf(",");
    let str= file.content.substring(pos + 1);
    
    return str;
}