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

let getComponent = (info,attr,data) =>{
	let component = obj[info.type](attr,data);
	component.info=info;
	return component;
}
export default getComponent