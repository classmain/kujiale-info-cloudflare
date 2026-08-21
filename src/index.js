const express = require('express');
const axios = require('axios');
const app = express();

app.use(require('morgan')('combined'));
app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 查询代理接口
app.get('/api/query', async (req, res) => {
  const id = req.query.id?.trim();
  if (!id) {
    return res.json({ code: -1, msg: "缺少方案ID" });
  }
  try {
    // 拼接第三方接口地址
    const apiUrl = `https://kjl-info.272636215.xyz/api/kujiale/${id}/summary`;
    const resp = await axios.get(apiUrl, { timeout: 15000 });
    return res.json({ code: 0, data: resp.data });
  } catch (e) {
    console.error("接口请求异常", e.message);
    return res.json({ code: -1, msg: "查询失败，ID无效或接口异常" });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index_h5.html");
});
app.get('/index_h5.html', (req, res) => {
  res.sendFile(__dirname + "/index_h5.html");
});
app.get('/detail.html', (req, res) => {
  res.sendFile(__dirname + "/detail.html");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`服务启动，端口 ${port}`);
});
