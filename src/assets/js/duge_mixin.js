import moment from 'moment';
import { getDateCha } from '@/assets/js/DateUtil'

export default {
    data () {
        return {
            myRole: this.$store.state.sysInfo.userInfo
        }
    },
    mounted () {
        console.log("🚀 ~ myRole", this.myRole)
    },
    filters: {
        
        
        // 为0、为空处理
        zero(num) {
            if (_.isNull(num))
            {return 0}
            else{
                if(num==0){
                    return _.round(num, 0)
                }else{
                    return num
                }
            }
        },
        
        // 小数位
        shortNum(num) {
            let short = _.round(num, 2)
            return short
        },
        
        // 短日期
        shortDate(str) {
            let short = moment(str).format('YYYY-MM-DD')
            return short
        },
        
        
        
        round(num,n=0) {
            return _.round(num,n)
        },
    },
    computed: {
        
    },
    methods: {
        // 时间点比较，入参strTime是一个string格式（20:08:08），与当前时间相比较，>0说明在当前时间点之后,结果是一个两个点之间相差的分钟数
        timeDiff(strTime){
            let m2 = moment(moment().format('YYYY-MM-DD') + " " + strTime)
            let val = getDateCha(moment(), m2, 'm')
            return val
        },
        // 长日期
        timeStamp() {
            let val = moment().format('YYYY-MM-DD HH:mm:ss')
            return val
        },
        // 文件上传完毕后会触发 after-read 回调函数
        afterRead(file) {
            const _self = this
            console.log(file)
            file.status = 'uploading'
            file.message = '上传中...'
            _self.$ajax.uploadImg(file).then((res) => {
                if (res.data) {
                    file.status = ''
                    file.message = ''
                    file.url = res.data
                } else {
                    file.status = 'failed'
                    file.message = '上传失败'
                }
            })
        },
        // 截取字符长度
        slice(str, num = 24) {
            return _.join(_.slice(str, 0, num), '')
        },
        isEmpty(obj){
            return _.isEmpty(obj)
        },
    }
}