// 设置图片合并的最小间隔
fis.config.set('settings.spriter.csssprites.margin', 20);

fis.config.set('modules.postpackager', 'simple');
// 设置打包规则
fis.config.set('pack', {
    '/pkg/all.js': [
        'js/jquery.js',
        'js/index.js',
    ],
    // 设置CSS打包规则，CSS打包的同时会进行图片合并
    '/pkg/all.css': '**.css'
});

// 开启simple对零散资源的自动合并
fis.config.set('settings.postpackager.simple.autoCombine', true);