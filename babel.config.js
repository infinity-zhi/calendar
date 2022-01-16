module.exports = {
    presets: [
        // [
        //     '@vue/app',
        //     {
        //         '@babel/preset-env': {
        //             useBuiltIns: 'usage',
        //             //1.usage自动监测是否需要plolyfill  会根据@vue/babel-presset-app，通过@babel/preset-env(node-modle下@vue)和browserslist（package.js）监测项目是否需要
        //             //2.entry强制转换语法es5
        //             //3.false不使用polyfills
        //             corejs: 3,
        //         },
        //     },
        // ],
        '@vue/cli-plugin-babel/preset', // 配置了 @vue/app 需要取消 @vue/cli-plugin-babel/preset
    ],
};
