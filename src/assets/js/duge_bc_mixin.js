// 班次计算的几个公式
import moment from 'moment';

export default {
    data () {
        return {
        }
    },
    mounted () {
    },
    filters: {},
    methods: {
        //迟到早退判断式 入参：实际时间time，应打卡时间bcTime，flag=0为判断迟到，=1为判断早退
        flagBcLater(time,bcTime,flag=0) {
            let _mm = time
            if(flag==0){
                let _flag = _mm > bcTime
                return _flag ? '迟到' : ''
            }else{
                console.log('bb :>> ',_mm , bcTime);
                let _flag = _mm < bcTime
                return _flag ? '早退' : ''
            }
            
        },


        //签入签出异动判断式
        flagBcDiff(pocDeviation, pocDeviationAdd, bcCheckinDiff) {
            let flag=''
            if (bcCheckinDiff > (pocDeviation + pocDeviationAdd)) { flag = '定位偏差较大' }
            if (bcCheckinDiff > (pocDeviation + pocDeviationAdd) * 2) { flag = '定位偏差极大' }
            return flag
        },

    }
}