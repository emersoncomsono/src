const main = require('./modules/main.js')
const admin = require("./modules/admin.js")
const { blaze } = require("./modules/blaze.js")

const { create_cookie_jar } = require("./utils/requests.js")

const info = require("./database/infos.js")

const terminalImage = require("terminal-image")
const got = require('got')
const express = require('express')

const app = express()

photo = (async () => {
  var body = await got("https://cdn.culturagenial.com/imagens/lm-alex-mil-cke.jpg").buffer()
  return await terminalImage.buffer(body, {width: 50, height: 50})
})

infos = new info.infos()

app.set('json spaces', 4)

app.post('/admin', async (request, response) => {
  if (Object.keys(request.query).length == 0) {
    var data = request.params
    } else { var data = request.query }

  var ip = request.ip.split("::ffff:")[1]

  return await admin.main(request, response, data = data, ip = ip, infos = infos)
})

app.get('/admin', async (request, response) => {
  try {
    if (!await infos.methods.includes(request.method)) {
      return await response.json({})
    }
  } catch { return await response.json({}) }

  var data = request.query
  var ip = request.ip.split("::ffff:")[1]

  return await admin.main(request, response, data = data, ip = ip, infos = infos)
})

app.post('/', async (request, response) => {
  if (Object.keys(request.query).length == 0) {
    var data = request.params
    } else { var data = request.query }

  var ip = request.ip.split("::ffff:")[1]

  return await main.main(request, response, data = data, ip = ip, infos = infos)
})

app.get('/', async (request, response) => {
  try {
    if (!await infos.methods.includes(request.method)) {
      return await response.json({})
    }
  } catch { return await response.json({}) }

  var data = request.query
  var ip = request.ip.split("::ffff:")[1]

  return await main.main(request, response, data = data, ip = ip, infos = infos)
})

app.listen(8080,
           async () => {
             await console.log(await photo(), "\n\n                     \033[48;5;214m[ ! ] - API ativada...\033[0m\n")
           }
)
