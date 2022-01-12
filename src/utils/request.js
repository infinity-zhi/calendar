import VeryAxios from 'very-axios';

let veryAxiosConfig = {
    tip: false,
    cancelDuplicated: true,
    getResData: (resData) => resData,
    // getResStatus: () => 1,
    validateStatus: () => true,
    // getResErrMsg: () => '...error...',
};
let axiosConfig = { timeout: 12000 };
const request = new VeryAxios(veryAxiosConfig, axiosConfig);

export default request;
