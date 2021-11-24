document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault()
    let input = document.querySelector('#searchInput').value
    if (input !== '') {
        clearInfo()
        showWarning('Carregando...')
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=a6d5c47b498c103547f41ecd59607053&units=metric&lang=pt_br`
        let results = await fetch(url)
        let resultJson = await results.json()
        if (resultJson.cod === 200) {
            showInfo({
                name: resultJson.name,
                country: resultJson.sys.country,
                temp: resultJson.main.temp,
                tempIcon: resultJson.weather[0].icon,
                windSpeed: resultJson.wind.speed,
                widAngle: resultJson.wind.deg
            })
        } else {
            clearInfo()
            showWarning('Não encontramos esta localização')
        }
    } else {
        clearInfo()
    }
})

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}

function showInfo(json) {
    showWarning('')
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.widAngle - 90}deg)`
    document.querySelector('.resultado').style.display = 'block'
}

function clearInfo() {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}