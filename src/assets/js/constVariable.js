import { CHN } from '@/lang/CHN'
/**
 * 常量定义
 * @type { {} }
 */

//分页
export const pageConfig = {
    //每页大小配置  暂时默认加载10，每10条递增
    pageSizeConfig: [1,5,10,15,20,50,100],
    //跳过的数据条数
    skipCount: 0,
    //返回的最大条数
    maxResultCount: 10,
};

// 多语言翻译map-用于重置数据
export const langMap = CHN;

export const mapKey = "7f34b743b6048a6f9d581945b7f8e9ed";
export const mapUrl = "https://webapi.amap.com/maps?v=1.4.15&key=7f34b743b6048a6f9d581945b7f8e9ed";




