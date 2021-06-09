/**
 * 项目公用插件
 * Created by FF on 2020/11/24.
 */

import validator from '@/assets/js/validator';


let plugin = {};
plugin.install = function (Vue, options) {


	//注册全局指令 - 全局点击指令(点击绑定元素以外的其他区域操作)，使用方法v-clickoutside
	Vue.directive('clickoutside', {
	    bind (el, binding, vnode) {
	        function documentHandler (e) {
	            if (el.contains(e.target)) {
	                return false;
	            }
	            if (binding.expression) {
	                binding.value(e);
	            }
	        }
	        el.__vueClickOutside__ = documentHandler;
	        document.addEventListener('click', documentHandler);
	    },
	    update () {

	    },
	    unbind (el, binding) {
	        document.removeEventListener('click', el.__vueClickOutside__);
	        delete el.__vueClickOutside__;
	    }
	});

    // 注入全局变量
    Vue.mixin({
        components: {},
        filters: {
            // 时间格式化过滤器
            timeFormat(value, format = 'yyyy/MM/dd', emptyVal = '') {
                if (!value) {
                    return emptyVal;
                } else if (value instanceof Date) {
                    return value.format(format);
                } else if (validator.isNumber(value)) {
                    return new Date(Number(value)).format(format);
                } else if (typeof value === 'string') {
                    value = value.replace(/-/g,'/');
                    return value.toDate().format(format);
                } else {
                    return value
                }
            },
            //内容过滤器，如果内容为空或null，返回-
            contentFilter(content) {
                if (content === '' || content === null || content === undefined) {
                    return '-';
                } else {
                    return content;
                }
            },
            //货比格式化
            moneyFilter(content) {
                if (content === '' || content === null || content === undefined) {
                    return '-';
                } else {
                    return content === 0 ? '0.00' : Number(content).toCurrency();
                }
            }
        },
        created() {

        }
    })

};

export default plugin;
