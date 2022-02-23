import getAttrStr from '../utils/index.js'
let handle = (attr,dataStr) => {
	let attribute = [{
		key: 'width',
		name: '宽度',
		value: '300',
		type: 'input',
		placeholder: '请输入宽度'
	}, {
		key: 'height',
		name: '高度',
		value: '100',
		type: 'input',
		placeholder: '请输入高度'
	},]
	if(attr){
		attribute=attr;
	}
	
	let data = {
		txt: '我是按钮'
	};
	if(dataStr){
		data = JSON.parse(dataStr);
	}
	let template = `<btnComp ${getAttrStr(attribute)} data='${JSON.stringify(data)}'></btnComp>`;
	return {
		attribute,
		data,
		template
	}

}
export default handle
