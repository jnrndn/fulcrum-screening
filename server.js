const express = require('express')
const http = require('http');
const {readFile} = require('fs/promises')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use('/search', async (req, res) => {
  try {
    const {search} = req.body
    const file = await readFile(`${__dirname}/file.txt`, 'utf8')
    const found = file.includes(search) 

    if(found) {
      const index = file.indexOf(search)
      const data = file.substring(index, index + search.length)
      return res.status(200).json({
        success: true,
        data
      })
    }

    return res.status(404).json({
      success: false,
      data: null
    })

  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }
})

const server = http.createServer(app);

server.listen(3000);

server.on('listening', () => console.log(`Listening on port 3000`));
server.on('error', (error) => {
  console.error(error); process.exit(1);
});
