/**
 * @by dengs
 * 将常用复用的组件导出 全局注册
 * 直接使用 无需引入和注册
 */

// import GPagination from './Pagination/index'
// import GDialog from './Dialog/index'
// import GCascader from './Cascader/index'
// import GSelect from './Select/index'
// import Gbutton from './Button/index'
// import Ginput from './Input/index'
import aa from "@/components/aa"
import com_up_rect from "@/components/com_up_rect"
import Navbar from '@/components/Navbar'
// import nodata from "@components/nodata"
// import swipe_pic from "@components/swipe_pic"
// import com_list from "@views/com/com_list"
// import com_swiper_focus from "@views/com/com_swiper_focus"
// import com_swiper from "@views/com/com_swiper"
// import com_tag from "@views/com/com_tag"
// import com_top_header from "@views/com/com_top_header"
// import com_attention_btn from "@views/com/com_attention_btn"
// import com_btn_sign from "@views/com/com_btn_sign"
// import com_empty from "@views/com/com_empty"
// import SvgIcon from '@components/SvgIcon/index'

const comps = {
  aa,
  Navbar,
  com_up_rect

}

// 注册全局组件并暴露出去
function regComp(Vue) {
  if (regComp.installed) {
    return
  }
  Object.keys(comps).forEach(key => {
    Vue.component(key, comps[key])
  })
}

// 自动导入 svg 源码
/* const req = require.context('@/assets/svgs', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req) */

export default regComp
