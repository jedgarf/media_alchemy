import axios, { AxiosResponse, AxiosRequestConfig, AxiosProgressEvent } from 'axios';
import apiConfig from '../Config/api.config';

const url = apiConfig.base_url;
axios.defaults.headers.common = {'Authorization': `Bearer ${apiConfig.api_key}`};

interface DownloadProgressConfig extends AxiosRequestConfig {
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

const youtubeLinkInfo = async (link: string) => {

    const results = await axios.get(`${url}/youtube_downloader/media_info?videoURL=${link}`);
    return results;
};

const youtubeDownloadLink = async (link: string, config: DownloadProgressConfig = {}): Promise<AxiosResponse> => {

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

const youtubeAudioDownload = async (link: string) => {

    const results: AxiosResponse<ArrayBuffer> = await axios.get(`${url}/youtube_downloader/mp3?videoURL=${link}`, { responseType: 'arraybuffer', maxRedirects: 0 });
    return results;
};

const youtubeVideoDownload = async (link: string) => {

    const results: AxiosResponse<ArrayBuffer> = await axios.get(`${url}/youtube_downloader/mp4?videoURL=${link}`, { responseType: 'arraybuffer', maxRedirects: 0 });
    return results;
};

export { youtubeLinkInfo, youtubeDownloadLink, youtubeAudioDownload, youtubeVideoDownload };