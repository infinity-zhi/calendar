module.exports = {
    pages: {
        index: {
            //入口
            entry: 'src/main.js',
            title: '在线日历定制，在线日历打印A4',
        },
    },
    transpileDependencies: [
        // 可以是字符串或正则表达式
        /lunar-javascript/,
        /very-axios/,
        /ant-design/,
    ],
};
