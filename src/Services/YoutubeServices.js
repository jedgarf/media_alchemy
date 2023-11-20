import axios from 'axios';
import apiConfig from '../Config/api.config';

const url = apiConfig.base_url;
axios.defaults.headers.common = {'Authorization': `Bearer ${apiConfig.api_key}`};

const youtubeLinkInfo = async (link) => {

    const results = await axios.get(`${url}/media_info?videoURL=${link}`);
    return results;
};

const youtubeAudioDownload = async (link) => {

    const results = await axios.get(`${url}/mp3?videoURL=${link}`, { responseType: Blob });
    return results;
};

const youtubeVideoDownload = async (link) => {

    const results = await axios.get(`${url}/mp4?videoURL=${link}`, { responseType: Blob });
    return results;
};

export { youtubeLinkInfo, youtubeAudioDownload, youtubeVideoDownload };