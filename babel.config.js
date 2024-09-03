module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['inline-dotenv', {
        path: '.env', // 指定 .env 文件的路径
      }],
    ],
  };
};
