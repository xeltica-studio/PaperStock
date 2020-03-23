import axios, { AxiosRequestConfig } from "axios";
import serverSetting from "@/server-setting";

const $ = axios.create({
	baseURL: serverSetting.apiServer,
	validateStatus: s => s < 500
});

export namespace API {
	export const $get = (path: string, config?: AxiosRequestConfig) => {
		return $.get(path, config);
	};

	export const $post = (path: string, data?: any, config?: AxiosRequestConfig) => {
		return $.post(path, data, config);
	};

	export const $put = (path: string, data?: any, config?: AxiosRequestConfig) => {
		return $.put(path, data, config);
	};

	export const $delete = (path: string, config?: AxiosRequestConfig) => {
		return $.delete(path, config);
	};
}
