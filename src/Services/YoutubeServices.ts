import axios, { AxiosResponse } from 'axios';
import apiConfig from '../Config/api.config';

const url = apiConfig.base_url;
axios.defaults.headers.common = {'Authorization': `Bearer ${apiConfig.api_key}`};

const youtubeLinkInfo = async (link: string) => {

    const results = await axios.get(`${url}/youtube_downloader/media_info?videoURL=${link}`);
    return results;
};

const youtubeAudioDownload = async (link: string) => {

    const results: AxiosResponse<ArrayBuffer> = await axios.get(`${url}/youtube_downloader/mp3?videoURL=${link}`, { responseType: 'arraybuffer', maxRedirects: 0 });
    return results;
};

const youtubeVideoDownload = async (link: string) => {

    const results: AxiosResponse<ArrayBuffer> = await axios.get(`${url}/youtube_downloader/mp4?videoURL=${link}`, { responseType: 'arraybuffer', maxRedirects: 0 });
    return results;
};

export { youtubeLinkInfo, youtubeAudioDownload, youtubeVideoDownload };