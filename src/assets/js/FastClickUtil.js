import { getDateCha, getTimeFormFormat, DbTimeFormat } from "./DateUtil";

export class FastClick {
    constructor() {
        this.lastClickTime = new Date();
        this.lastClickTime.setFullYear(2000);
    }

    isFastClick(){
        let now=new Date();
        let cha=getDateCha(now,this.lastClickTime,"ms");
        console.log(`lastClickTime:${getTimeFormFormat(now,DbTimeFormat)}   ${getTimeFormFormat(this.lastClickTime,DbTimeFormat)}  ${cha}`);
        if(cha>=1000) {
            return false;
        } else {
            this.lastClickTime = now;
            return true;
        }
    }
    isFastClick2(clickTimeout){
        let now=new Date();
        let cha=getDateCha(now,this.lastClickTime,"ms");
        console.log(`lastClickTime:${getTimeFormFormat(now,DbTimeFormat)}   ${getTimeFormFormat(this.lastClickTime,DbTimeFormat)}  ${cha}`);
        
        if (cha >= clickTimeout) {
            return false;
        } else {
            this.lastClickTime=now;
            return true;
        }
    }
}