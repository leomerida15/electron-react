const { app, ...remote } = window.require('@electron/remote');

const Upload = (func, data) => {
	if (data) return remote.require(`./Api/functions/Upload.js`)[func](data);
	else return remote.require(`./Api/functions/Upload.js`)[func]();
};

export default Upload;
