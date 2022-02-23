import textComp from "./textComp"
import picComp from "./picComp"
import tabList from "./tabList"
import btnComp from "./btnComp"

let obj = {
	textComp,
	picComp,
	tabList,
	btnComp
}

function install(Vue) {
	Object.keys(obj).forEach(key => {
		Vue.component(key,obj[key])
	})
}
let API = {
	version: '1.0',
	install
}
export default API
