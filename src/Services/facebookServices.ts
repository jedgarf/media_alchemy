import axios, { AxiosResponse, AxiosRequestConfig, AxiosProgressEvent } from 'axios';
import apiConfig from '../Config/api.config';

const url = apiConfig.base_url;
axios.defaults.headers.common = {'Authorization': `Bearer ${apiConfig.api_key}`};

interface DownloadProgressConfig extends AxiosRequestConfig {
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

const facebookLinkInfo = async (link: string) => {

    const results = await axios.get(`${url}/facebook_downloader/fb_info?videoURL=${link}`);
    return results;
};

const facebookDownloadLink = async (link: string, config: DownloadProgressConfig = {}): Promise<AxiosResponse> => {

    try {
        const results = await axios.get(`${apiConfig.override_cors}${link}`, 
            { 
                ...config,
                responseType: 'arraybuffer', 
                onDownloadProgress: config.onDownloadProgress,
            });
            
        return results;
    } catch (error) {
        throw error;
    }
};

export { facebookLinkInfo, facebookDownloadLink };