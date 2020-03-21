import axios, { AxiosRequestConfig } from "axios";
import serverSetting from "@/server-setting";

export namespace API {
	export const $get = (path: string, config: AxiosRequestConfig) => {
		// todo vuex を設定し次第、トークンがあればセットするようにする
		const url = serverSetting.apiServer + path;
		return axios.get(url, config);
	};

	export const $post = (path: string, data?: any, config?: AxiosRequestConfig) => {
		// todo vuex を設定し次第、トークンがあればセットするようにする
		const url = serverSetting.apiServer + path;
		return axios.post(url, data, config);
	};

	export const $put = (path: string, data?: any, config?: AxiosRequestConfig) => {
		// todo vuex を設定し次第、トークンがあればセットするようにする
		const url = serverSetting.apiServer + path;
		return axios.put(url, data, config);
	};

	export const $delete = (path: string, config: AxiosRequestConfig) => {
		// todo vuex を設定し次第、トークンがあればセットするようにする
		const url = serverSetting.apiServer + path;
		return axios.delete(url, config);
	};
}
